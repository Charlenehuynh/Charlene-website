document.addEventListener("DOMContentLoaded", function () {
  // ----- headline word roulette -------------------------------------------
  // "I turn [admin > backlogs > chaos] into systems."
  // Runs once, on load. The final word is already in the HTML, so if this
  // never runs the headline simply reads "I turn chaos into systems."
  (function () {
    var slot = document.querySelector(".roulette");
    if (!slot || !slot.dataset.words) return;

    var words = slot.dataset.words.split(",");
    var last = words[words.length - 1];

    // The three numbers worth tuning:
    var FIRST = 1100;  // ms the first word is held — it lands while the page is
                       // still arriving, so it needs longer than the rest
    var HOLD  = 700;   // ms each later word is held
    var FADE  = 190;   // ms of movement in each half of a swap (match style.css)

    // when word i should appear
    function showAt(i) { return FIRST + (i - 1) * HOLD; }

    slot.setAttribute("aria-label", last);
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    slot.textContent = words[0];
    for (var i = 1; i < words.length; i++) {
      (function (i) {
        // 1. current word rises and fades out
        setTimeout(function () { slot.classList.add("swap-out"); }, showAt(i) - FADE);
        // 2. swap the text and let the new word travel up from below
        setTimeout(function () {
          slot.textContent = words[i];
          slot.classList.remove("swap-out");
          slot.classList.add("swap-in");
          setTimeout(function () { slot.classList.remove("swap-in"); }, FADE + 60);
        }, showAt(i));
      })(i);
    }
    // whatever the timers do, the headline ends up as plain, visible text
    setTimeout(function () {
      slot.textContent = last;
      slot.classList.remove("swap-out");
      slot.classList.remove("swap-in");
    }, showAt(words.length - 1) + 400);
  })();

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
    var href = link.getAttribute("href");
    return href.charAt(0) === "#" ? document.querySelector(href) : null;
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

  // ----- case study screenshot lightbox -----------------------------------
  (function () {
    var lightbox = document.getElementById("lightbox");
    var screenshots = document.querySelectorAll(".case-screenshot");
    if (!lightbox || !screenshots.length) return;

    var img = lightbox.querySelector(".lightbox-img");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    function open(src, alt) {
      img.src = src;
      img.alt = alt;
      lightbox.hidden = false;
    }
    function close() {
      lightbox.hidden = true;
      img.src = "";
    }

    screenshots.forEach(function (shot) {
      shot.setAttribute("title", "Click to enlarge");
      shot.addEventListener("click", function () { open(shot.src, shot.alt); });
    });
    lightbox.addEventListener("click", close);
    closeBtn.addEventListener("click", function (e) { e.stopPropagation(); close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) close();
    });
  })();
});
