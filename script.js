document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const pageContents = document.querySelectorAll(".page-content");

  const highlightActiveLink = (pageId) => {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${pageId}`) {
        link.classList.add("text-green-700", "font-bold", "underline");
      } else {
        link.classList.remove("text-green-700", "font-bold", "underline");
      }
    });
  };

  const showPage = (pageId) => {
    pageContents.forEach((page) => page.classList.add("hidden"));
    const page = document.querySelector(`#${pageId}`);
    if (page) page.classList.remove("hidden");
    highlightActiveLink(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("href").substring(1);
      showPage(pageId);
    });
  });

  showPage("home");
});
