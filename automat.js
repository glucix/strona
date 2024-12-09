
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const result = document.getElementById("result");
const spinButton = document.getElementById("spinButton");
const allInButton = document.getElementById("allInButton"); // Dodano przycisk All In

const balanceDisplay = document.getElementById("balance");
const betAmountInput = document.getElementById("betAmount");

let balance = 250; // Początkowy stan konta gracza
const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉"];
let spinningInterval;
let winChance = 0.50; // Ustalmy, że gracz ma 45% szans na wygraną

spinButton.addEventListener("click", function() {
    const spinCost = parseInt(betAmountInput.value);

    if (isNaN(spinCost) || spinCost <= 0) {
        result.textContent = "Proszę wpisać poprawną kwotę!";
        return;
    }

    if (balance < spinCost) {
        result.textContent = "Nie masz wystarczajsąco pieniędzy, aby zakręcić!";
        return;
    }

    spinButton.disabled = true;

    balance -= spinCost;
    updateBalance();

    startSpinning();

    setTimeout(() => {
        let spin1, spin2, spin3;

        if (Math.random() < winChance) {
            const winningSymbol = getRandomSymbol();
            spin1 = winningSymbol;
            spin2 = winningSymbol;
            spin3 = winningSymbol;
        } else {
            spin1 = getRandomSymbol();
            spin2 = getRandomSymbol();
            spin3 = getRandomSymbol();
        }

        stopSpinning();

        slot1.textContent = spin1;
        slot2.textContent = spin2;
        slot3.textContent = spin3;

        if (spin1 === spin2 && spin2 === spin3) {
            const winAmount = calculateWin(spinCost);
            balance += winAmount;
            updateBalance();
            result.textContent = `Gratulacje! Wygrałeś ${winAmount} zł!`;
        } else {
            result.textContent = "Spróbuj ponownie!";
        }

        spinButton.disabled = false;
    }, 2000);
});

allInButton.addEventListener("click", function() {
    const allInAmount = balance;

    if (balance <= 0) {
        result.textContent = "Nie masz wystarczająco pieniędzy, aby zakręcić!";
        return;
    }

    spinButton.disabled = true;
    allInButton.disabled = true;

    balance = 0;
    updateBalance();

    startSpinning();

    setTimeout(() => {
        let spin1, spin2, spin3;

        if (Math.random() < winChance) {
            const winningSymbol = getRandomSymbol();
            spin1 = winningSymbol;
            spin2 = winningSymbol;
            spin3 = winningSymbol;
        } else {
            spin1 = getRandomSymbol();
            spin2 = getRandomSymbol();
            spin3 = getRandomSymbol();
        }

        stopSpinning();

        slot1.textContent = spin1;
        slot2.textContent = spin2;
        slot3.textContent = spin3;

        if (spin1 === spin2 && spin2 === spin3) {
            const winAmount = calculateWin(allInAmount);
            balance += winAmount;
            updateBalance();
            result.textContent = `Gratulacje! Wygrałeś ${winAmount} zł!`;
        } else {
            result.textContent = "Spróbuj ponownie!";
        }

        spinButton.disabled = false;
        allInButton.disabled = false;
    }, 2000);
});

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateBalance() {
    balanceDisplay.textContent = balance;
}

function calculateWin(spinCost) {
    return Math.floor(Math.random() * 51) + spinCost * 3;
}

function startSpinning() {
    spinningInterval = setInterval(() => {
        slot1.textContent = getRandomSymbol();
        slot2.textContent = getRandomSymbol();
        slot3.textContent = getRandomSymbol();
    }, 100);
}

function stopSpinning() {
    clearInterval(spinningInterval);
}
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
