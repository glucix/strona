// Update the live clock

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const speed = 50; // Adjust speed of counting

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
  // Znajdź elementy HTML: ikonę menu, ikonę zamknięcia i pasek boczny
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const sidebar = document.getElementById("sidebar");
  
  // Funkcja do przełączania widoczności paska bocznego
  function toggleSidebar(show) {
      sidebar.style.left = show ? "0" : "-320px"; // Przesuń pasek boczny
      menuIcon.style.display = show ? "none" : "block"; // Przełącz widoczność ikon
      closeIcon.style.display = show ? "block" : "none";
  }
  
  // Dodaj event listener do ikon
  menuIcon.addEventListener("click", () => toggleSidebar(true));
  closeIcon.addEventListener("click", () => toggleSidebar(false));
  
  // Funkcja uniwersalna do obsługi sekcji z kategoriami
  function setupToggle(buttonId, categoriesId, arrowId) {
      const toggleButton = document.getElementById(buttonId);
      const categories = document.getElementById(categoriesId);
      const arrow = document.getElementById(arrowId);
  
      toggleButton.addEventListener("click", () => {
          const isHidden = categories.style.display === "none" || categories.style.display === "";
          categories.style.display = isHidden ? "block" : "none"; // Przełącz widoczność kategorii
          arrow.classList.toggle("rotate", isHidden); // Obróć strzałkę jeśli rozwinięto
      });
  }
  
  // Skonfiguruj sekcje: Gry, Kasyno, Social Media
  setupToggle("toggleButtonGry", "categoriesGry", "arrowGry");
  setupToggle("toggleButtonKasyno", "categoriesKasyno", "arrowKasyno");
  setupToggle("toggleButtonsocial", "categoriessocial", "arrowsocial");