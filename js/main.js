/* ═══════════════════════════════════════════
   main.js — Hafid Fathurrohman Portfolio
   ═══════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── STATE ── */
  let currentLang = localStorage.getItem("lang") || "en";
  let currentTheme = localStorage.getItem("theme") || "light";

  /* ── APPLY THEME ── */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    currentTheme = theme;
  }

  /* ── APPLY LANGUAGE ── */
  function applyLang(lang) {
    const t = window.TRANSLATIONS[lang];
    if (!t) return;
    currentLang = lang;
    localStorage.setItem("lang", lang);

    /* swap every [data-i18n] element */
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) {
        /* preserve inner HTML for elements that have child tags */
        if (el.hasAttribute("data-i18n-html")) {
          el.innerHTML = t[key].replace(/\n/g, "<br/>");
        } else {
          el.textContent = t[key];
        }
      }
    });

    /* update lang buttons */
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active-lang", btn.dataset.lang === lang);
    });

    /* update html lang attr */
    document.documentElement.lang = lang;
  }

  /* ── INIT DARK TOGGLE ── */
  function initDarkToggle() {
    const btn = document.getElementById("darkToggle");
    if (!btn) return;
    applyTheme(currentTheme);
    btn.addEventListener("click", () => {
      applyTheme(currentTheme === "light" ? "dark" : "light");
    });
  }

  /* ── INIT LANG BUTTONS ── */
  function initLang() {
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => applyLang(btn.dataset.lang));
    });
    applyLang(currentLang);
  }

  /* ── HAMBURGER ── */
  function initHamburger() {
    const btn = document.getElementById("hamburger");
    const menu = document.getElementById("navLinks");
    if (!btn || !menu) return;
    btn.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  /* ── ACTIVE NAV ON SCROLL ── */
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const links    = document.querySelectorAll(".nav-links a[href^='#']");
    const update = () => {
      let current = "";
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      links.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ── FADE IN ON SCROLL ── */
  function initFadeIn() {
    const els = document.querySelectorAll(".fade-in");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
  }

  /* ── BOOT ── */
  document.addEventListener("DOMContentLoaded", () => {
    initDarkToggle();
    initLang();
    initHamburger();
    initActiveNav();
    initFadeIn();
  });

})();
