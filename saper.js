const board = document.getElementById('board');
const difficultySelect = document.getElementById('difficulty');
const statusDiv = document.getElementById('status');
const flagCountDiv = document.getElementById('flag-count');
const MAX_FLAGS =40; // Maksymalna liczba flag
const INITIAL_BOARD_SIZE = 10; // Rozmiar planszy na poziomie łatwym
const DIFFICULTY_SETTINGS = {
    easy: { size: INITIAL_BOARD_SIZE, mines: 10 },
    medium: { size: INITIAL_BOARD_SIZE + 4, mines: 20 }, // Rozmiar planszy 12x12
    hard: { size: INITIAL_BOARD_SIZE + 8, mines: 30 }, // Rozmiar planszy 16x16
    fabian: { size: INITIAL_BOARD_SIZE + 12, mines: 50 } // Rozmiar planszy 16x16
};
let boardSize = DIFFICULTY_SETTINGS.easy.size;
let minesCount = DIFFICULTY_SETTINGS.easy.mines;
let minePositions = [];
let cells = [];
let flags = 0;
let gameOver = false;
const INITIAL_REVEAL_COUNT = 5; // Liczba odkrywanych komórek na początku

// Inicjalizacja planszy
function createBoard() {
    board.innerHTML = ''; // Czyść planszę przed ponownym utworzeniem
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-id', i);
        cell.addEventListener('click', handleClick);
        cell.addEventListener('contextmenu', handleRightClick);
        board.appendChild(cell);
        cells.push(cell);
    }
    placeMines();
    calculateNumbers();
}

// Rozmieszczanie min losowo na planszy
function placeMines() {
    while (minePositions.length < minesCount) {
        const randomPosition = Math.floor(Math.random() * boardSize * boardSize);
        if (!minePositions.includes(randomPosition)) {
            minePositions.push(randomPosition);
            cells[randomPosition].classList.add('mine');
        }
    }
}

// Obliczanie liczby sąsiadujących min dla każdej komórki
function calculateNumbers() {
    cells.forEach((cell, index) => {
        if (!cell.classList.contains('mine')) {
            const mines = getNeighborIndices(index).filter(i => minePositions.includes(i)).length;
            if (mines > 0) {
                cell.setAttribute('data-count', mines);
            }
        }
    });
}

// Pobieranie indeksów sąsiadujących komórek
function getNeighborIndices(index) {
    const neighbors = [];
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                neighbors.push(newRow * boardSize + newCol);
            }
        }
    }
    return neighbors;
}

// Funkcja do aktualizacji statusu gry
function updateStatus(message, color) {
    statusDiv.textContent = message;
    statusDiv.style.color = color;
}

// Funkcja do aktualizacji licznika flag
function updateFlagCount() {
    flagCountDiv.textContent = `Flagi: ${flags} / ${MAX_FLAGS}`;
}

// Obsługa lewego kliknięcia
function handleClick(e) {
    if (gameOver) return;

    const cell = e.target;
    const cellId = parseInt(cell.getAttribute('data-id'));

    if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;

    if (minePositions.includes(cellId)) {
        revealMines();
        cell.classList.add('revealed', 'mine');
        updateStatus('Koniec gry! Trafiłeś na minę.', '#e74c3c');
        gameOver = true;
    } else {
        revealCells(cellId, INITIAL_REVEAL_COUNT);
        checkWin();
    }
}

// Obsługa prawego kliknięcia (ustawianie flag)
function handleRightClick(e) {
    e.preventDefault();
    if (gameOver) return;

    const cell = e.target;
    const cellId = parseInt(cell.getAttribute('data-id'));

    if (cell.classList.contains('revealed')) return;

    if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
        flags--;
    } else if (flags < MAX_FLAGS) {
        cell.classList.add('flag');
        flags++;
    }
    updateFlagCount();
}

// Funkcja do odkrywania komórek
function revealCells(cellId, count) {
    const cell = cells[cellId];
    if (cell.classList.contains('revealed') || cell.classList.contains('flag') || count <= 0) return;

    cell.classList.add('revealed');

    const countValue = parseInt(cell.getAttribute('data-count'));
    if (countValue > 0) {
        cell.textContent = countValue;
    } else {
        const neighbors = getNeighborIndices(cellId);
        neighbors.forEach(neighborId => {
            if (!cells[neighborId].classList.contains('revealed')) {
                revealCells(neighborId, count - 1);
            }
        });
    }
}

function revealMines() {
    minePositions.forEach(id => {
        cells[id].classList.add('revealed', 'mine');
    });
}

function checkWin() {
    const revealedCells = cells.filter(cell => cell.classList.contains('revealed')).length;
    if (revealedCells === boardSize * boardSize - minesCount) {
        updateStatus('Gratulacje! Wygrałeś grę!', '#2ecc71');
        revealMines();
        gameOver = true;
    }
}

// Funkcja do restartowania gry
function restartGame() {
    minePositions = [];
    cells = [];
    flags = 0;
    gameOver = false;
    board.innerHTML = '';
    updateFlagCount();
    updateStatus('', '#ecf0f1');
    createBoard();
}

// Zmiana poziomu trudności
function setDifficulty(level) {
    switch (level) {
        case 'easy':
            boardSize = DIFFICULTY_SETTINGS.easy.size;
            minesCount = DIFFICULTY_SETTINGS.easy.mines;
            break;
        case 'medium':
            boardSize = DIFFICULTY_SETTINGS.medium.size;
            minesCount = DIFFICULTY_SETTINGS.medium.mines;
            break;
        case 'hard':
            boardSize = DIFFICULTY_SETTINGS.hard.size;
            minesCount = DIFFICULTY_SETTINGS.hard.mines;
            break;
            case 'fabian':
            boardSize = DIFFICULTY_SETTINGS.fabian.size;
            minesCount = DIFFICULTY_SETTINGS.fabian.mines;
            break;
        default:
            boardSize = DIFFICULTY_SETTINGS.easy.size;
            minesCount = DIFFICULTY_SETTINGS.easy.mines;
            break;
    }
    restartGame();
}

// Obsługa zmiany poziomu trudności
difficultySelect.addEventListener('change', (e) => {
    setDifficulty(e.target.value);
});

function getNumberColor(number) {
    const colors = {
        1: 'blue',
        2: 'green',
        3: 'red',
        4: 'darkblue',
        5: 'brown',
        6: 'cyan',
        7: 'black',
        8: 'gray'
    };
    return colors[number] || 'black';
}

// Start gry
createBoard();
// Znajdź elementy HTML: ikonę menu, ikonę zamknięcia i pasek boczny
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
const sidebar = document.getElementById("sidebar");

// Dodaj event listener do ikony menu, aby pokazać pasek boczny
menuIcon.addEventListener("click", () => {
    sidebar.style.left = "0";  // Animacja paska bocznego (wchodzi z lewej strony)
    menuIcon.style.display = "none";  // Ukryj ikonę menu
    closeIcon.style.display = "block";  // Pokaż ikonę zamykania w sidebarze
});

// Dodaj event listener do ikony zamknięcia, aby ukryć pasek boczny
closeIcon.addEventListener("click", () => {
    sidebar.style.left = "-300px";  // Animacja paska bocznego (schodzi z lewej strony)
    menuIcon.style.display = "block";  // Pokaż ikonę menu
    closeIcon.style.display = "none";  // Ukryj ikonę zamykania
});

// gry
const toggleButtonGry = document.getElementById("toggleButtonGry");
const categoriesGry = document.getElementById("categoriesGry");
const arrowGry = document.getElementById("arrowGry");

toggleButtonGry.addEventListener("click", () => {
    if (categoriesGry.style.display === "none" || categoriesGry.style.display === "") {
        categoriesGry.style.display = "block";  // Pokaż kategorie
        arrowGry.classList.add("rotate");      // Obróć strzałkę
    } else {
        categoriesGry.style.display = "none";  // Ukryj kategorie
        arrowGry.classList.remove("rotate");   // Przywróć strzałkę
    }
});

// kasyno
const toggleButtonKasyno = document.getElementById("toggleButtonKasyno");
const categoriesKasyno = document.getElementById("categoriesKasyno");
const arrowKasyno = document.getElementById("arrowKasyno");

toggleButtonKasyno.addEventListener("click", () => {
    if (categoriesKasyno.style.display === "none" || categoriesKasyno.style.display === "") {
        categoriesKasyno.style.display = "block";  // Pokaż kategorie
        arrowKasyno.classList.add("rotate");       // Obróć strzałkę
    } else {
        categoriesKasyno.style.display = "none";   // Ukryj kategorie
        arrowKasyno.classList.remove("rotate");    // Przywróć strzałkę
    }
});
// social media
const toggleButtonsocial = document.getElementById("toggleButtonsocial");
const categoriessocial = document.getElementById("categoriessocial");
const arrowsocial = document.getElementById("arrowsocial");

toggleButtonsocial.addEventListener("click", () => {
    if (categoriessocial.style.display === "none" || categoriessocial.style.display === "") {
        categoriessocial.style.display = "block";  // Pokaż kategorie
        arrowsocial.classList.add("rotate");       // Obróć strzałkę
    } else {
        categoriessocial.style.display = "none";   // Ukryj kategorie
        arrowsocial.classList.remove("rotate");    // Przywróć strzałkę
    }
});





document.getElementById("scrollToTop").addEventListener("click", function() {
    window.scrollTo({ top: 20, behavior: 'smooth' });
});

document.getElementById("scrollToMid").addEventListener("click", function() {
    window.scrollTo({ top: 400, behavior: 'smooth' });
});