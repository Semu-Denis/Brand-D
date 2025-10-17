document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const yearSpan = document.getElementById('year');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target.closest('a')) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 10) header?.classList.add('scrolled');
        else header?.classList.remove('scrolled');
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('reveal-visible'));
  }

  // Simple form handling (demo)
  document.querySelectorAll('form.simple-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn?.textContent;
      if (btn) btn.textContent = 'Thanks! We will reach out soon.';
      form.reset();
      setTimeout(() => { if (btn && original) btn.textContent = original; }, 2400);
    });
  });
});
