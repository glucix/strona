// Pobieranie elementów DOM
const spinButton = document.getElementById('spinButton');
const placeBetButton = document.getElementById('placeBet');
const resultText = document.getElementById('result');
const wheel = document.getElementById('rouletteWheel');
const betNumberInput = document.getElementById('betNumber');
const historyList = document.getElementById('history');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');

let lastBet = null; // Przechowujemy ostatnią stawkę
let isSpinning = false; // Flaga, aby zablokować wielokrotne klikanie

// Liczba slotów i szerokość pojedynczego slotu
const totalSlots = 20;
const slotWidth = 60; // Szerokość jednego slotu w px
const totalWidth = slotWidth * totalSlots;

// Funkcja do losowania liczby w określonym zakresie
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funkcja do losowania stopni obrotu w poziomie (w pikselach)
function getRandomTranslateX() {
    const fullSpins = getRandomInt(3, 6); // Ilość pełnych obrotów
    const extraSlots = getRandomInt(0, totalSlots - 1); // Dodatkowe sloty
    return fullSpins * totalWidth + extraSlots * slotWidth;
}

// Funkcja do obliczenia wygranego numeru na podstawie przesunięcia
function calculateWinningNumber(translateX) {
    // Całkowity przesunięty poziom
    const totalShift = translateX % totalWidth;
    // Obliczamy, który slot jest wyświetlany na początku kontenera
    const winningSlotIndex = Math.floor(totalShift / slotWidth);
    // Sloty są indeksowane od 0 do 19, a numery od 1 do 20
    // Dodajemy 1, ponieważ indeksowanie zaczyna się od 0
    return winningSlotIndex + 1;
}

// Zakręć kołem
spinButton.addEventListener('click', () => {
    if (isSpinning) return; // Jeśli już trwa kręcenie, nic nie rób
    if (lastBet === null) {
        alert('Najpierw postaw zakład!');
        return;
    }

    isSpinning = true; // Ustaw flagę, aby zablokować wielokrotne kręcenie
    const randomTranslateX = getRandomTranslateX(); // Losowe przesunięcie
    const randomSpeed = getRandomInt(3, 5); // Losowa prędkość obrotu w sekundach

    // Ustawienie czasu trwania animacji
    wheel.style.transition = `transform ${randomSpeed}s ease-out`;
    // Obrót koła w poziomie
    wheel.style.transform = `translateX(-${randomTranslateX}px)`;
    spinSound.play();

    // Po zakończeniu animacji
    setTimeout(() => {
        const winningNumber = calculateWinningNumber(randomTranslateX);

        // Wyświetlenie wyniku
        resultText.innerText = `Wynik: ${winningNumber}`;
        historyList.innerHTML += `<li>${winningNumber}</li>`; // Dodaj wynik do historii

        // Sprawdzenie, czy gracz wygrał
        if (parseInt(winningNumber) === lastBet) {
            resultText.innerText += ' - Wygrałeś!';
            winSound.play();
        } else {
            resultText.innerText += ' - Spróbuj ponownie!';
        }

        // Resetowanie stanu gry
        lastBet = null;
        isSpinning = false;

        // Resetowanie pozycji koła, aby uniknąć bardzo dużych wartości translateX
        wheel.style.transition = 'none';
        wheel.style.transform = `translateX(-${randomTranslateX % totalWidth}px)`;
    }, randomSpeed * 1000); // Czekaj na zakończenie animacji
});

// Postaw zakład
placeBetButton.addEventListener('click', () => {
    const betNumber = parseInt(betNumberInput.value);
    if (betNumber >= 1 && betNumber <= 20) {
        lastBet = betNumber;
        resultText.innerText = `Obstawiono numer: ${lastBet}`;
    } else {
        alert('Proszę wpisać numer od 1 do 20.');
    }
});

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