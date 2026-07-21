/**
 * DM SOFTWARE - CUSTOM AGENCY INTERACTIVE LOGIC
 * High-End Human-Crafted Interactive Showcase, FAQ Accordion & WhatsApp Builder
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- WhatsApp Configuration ---
  const WHATSAPP_NUMBER = "5491112345678"; 
  const DEFAULT_MESSAGE = "Hola Franco, quiero consultar por un sistema/página web para mi negocio.";

  const updateWhatsAppLinks = () => {
    const defaultEncodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    
    document.querySelectorAll('.wa-link').forEach(link => {
      const customMsg = link.getAttribute('data-wa-msg');
      if (customMsg) {
        link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg)}`;
      } else {
        link.href = defaultEncodedUrl;
      }
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  };

  updateWhatsAppLinks();

  // --- Interactive Showcase Tabs (Hero Preview) ---
  const tabBtns = document.querySelectorAll('.showcase-tab-btn');
  const showcaseImgs = document.querySelectorAll('.showcase-img');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      showcaseImgs.forEach(img => img.classList.add('hidden'));

      btn.classList.add('active');
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });

  // --- FAQ Accordion Logic ---
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // --- Theme Switcher (Dark / Light Mode) ---
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const savedTheme = localStorage.getItem('dm_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.innerHTML = savedTheme === 'light' ? moonIcon : sunIcon;

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dm_theme', newTheme);
    themeIcon.innerHTML = newTheme === 'light' ? moonIcon : sunIcon;
  });

  // --- Mobile Navigation Drawer ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // --- Scroll Reveal Observer ---
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
