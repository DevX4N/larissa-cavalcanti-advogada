(function () {
  "use strict";

  var WHATSAPP_NUMBER = window.WHATSAPP_NUMBER || "5581983249979";
  var DEFAULT_MSG = "Ol%C3%A1%2C%20Larissa!%20Gostaria%20de%20agendar%20uma%20consulta.";

  /* Troca o número nos links do WhatsApp (fonte única: WHATSAPP_NUMBER) */
  document.querySelectorAll('a[href*="wa.me/"]').forEach(function (link) {
    link.href = link.href.replace(/wa\.me\/\d+/, "wa.me/" + WHATSAPP_NUMBER);
    if (link.href.indexOf("text=") === -1) {
      link.href = link.href + (link.href.indexOf("?") === -1 ? "?" : "&") + "text=" + DEFAULT_MSG;
    }
  });

  var header = document.getElementById("header");
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  function onScroll() {
    if (window.scrollY > 10) { header.classList.add("scrolled"); }
    else { header.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function toggleNav(force) {
    var open = typeof force === "boolean" ? force : !mainNav.classList.contains("open");
    mainNav.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  var navClose = document.getElementById("navClose");
  navToggle.addEventListener("click", function () { toggleNav(); });
  if (navClose) { navClose.addEventListener("click", function () { toggleNav(false); }); }
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { toggleNav(false); });
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { toggleNav(false); }
  });

  /* Animações de entrada ao rolar */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Ano no rodapé */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
