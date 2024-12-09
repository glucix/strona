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