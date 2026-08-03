document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  navToggle.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  var navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var activeIndex = 0;

    sections.forEach(function (section, i) {
      if (section && section.offsetTop <= scrollPos) {
        activeIndex = i;
      }
    });

    navLinks.forEach(function (link, i) {
      link.classList.toggle("active", i === activeIndex);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
});
