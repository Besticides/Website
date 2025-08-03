document.addEventListener("DOMContentLoaded", () => {
  // Select all links that have a data-target attribute, including navigation and footer links
  const navLinks = document.querySelectorAll(
    ".nav-link, .mobile-nav-link, a[data-target]"
  );
  const pageContents = document.querySelectorAll(".page-content");
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Function to show a specific page and hide others
  const showPage = (targetId) => {
    pageContents.forEach((section) => {
      section.classList.remove("active");
    });
    const activeSection = document.getElementById(targetId);
    if (activeSection) {
      activeSection.classList.add("active");
      // Scroll to the section after showing it, with an offset for the fixed header
      window.scrollTo({
        top: activeSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Set initial active link and page based on URL hash
  const hash = window.location.hash || "#home";
  const initialTarget = hash.substring(1); // Remove the '#'
  showPage(initialTarget);

  navLinks.forEach((link) => {
    if (link.dataset.target === initialTarget) {
      link.classList.add("active");
    }
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;

      // Update URL hash without page reload
      history.pushState(null, "", `#${targetId}`);

      // Remove active class from all links and add to clicked one
      navLinks.forEach((nav) => nav.classList.remove("active"));
      // Check if it's a mobile link or desktop link to add the class
      const correspondingLink = document.querySelector(
        `.nav-link[data-target="${targetId}"]`
      );
      const correspondingMobileLink = document.querySelector(
        `.mobile-nav-link[data-target="${targetId}"]`
      );
      if (correspondingLink) correspondingLink.classList.add("active");
      if (correspondingMobileLink)
        correspondingMobileLink.classList.add("active");

      // Show the corresponding page
      showPage(targetId);

      // Close the mobile menu if it's open
      mobileMenu.style.display = "none";
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Handle the back/forward browser buttons
  window.addEventListener("popstate", () => {
    const newHash = window.location.hash || "#home";
    const newTarget = newHash.substring(1);
    showPage(newTarget);
    navLinks.forEach((nav) => nav.classList.remove("active"));
    const correspondingLink = document.querySelector(
      `.nav-link[data-target="${newTarget}"]`
    );
    const correspondingMobileLink = document.querySelector(
      `.mobile-nav-link[data-target="${newTarget}"]`
    );
    if (correspondingLink) correspondingLink.classList.add("active");
    if (correspondingMobileLink)
      correspondingMobileLink.classList.add("active");
  });

  // Toggle mobile menu visibility
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.style.display = isExpanded ? "none" : "block";
  });

  // Initial setup: activate the home link and page if no hash is present
  if (!window.location.hash) {
    document
      .querySelector('.nav-link[data-target="home"]')
      .classList.add("active");
    document
      .querySelector('.mobile-nav-link[data-target="home"]')
      .classList.add("active");
  }
});
