/**
 * DM SOFTWARE TECH — ADVANCED ANIMATIONS MODULE
 * Canvas Particle Network, Typing Text Engine & Stat Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. HERO NETWORK PARTICLE CANVAS ---
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 130})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // --- 2. HERO TYPING ROTATING TEXT EFFECT ---
  const typingEl = document.getElementById('typingElement');
  if (typingEl) {
    const words = [
      "Sistemas de Gestión A Medida.",
      "Tiendas Online & Catálogos E-Commerce.",
      "Apps Móviles PWA Instalables.",
      "Automatizaciones de Stock & WhatsApp.",
      "Dashboards Financials & KPIs."
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 70;
    const backSpeed = 40;
    const pauseDelay = 2000;

    function typeEffect() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
      }

      let timeout = isDeleting ? backSpeed : typeSpeed;

      if (!isDeleting && charIdx === currentWord.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        timeout = 400;
      }

      setTimeout(typeEffect, timeout);
    }

    typeEffect();
  }

  // --- 3. ANIMATED STAT COUNTERS ---
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = Math.round(target) + suffix;
            clearInterval(timer);
          } else {
            el.textContent = (target % 1 !== 0 ? current.toFixed(1) : Math.round(current)) + suffix;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  };

  const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
  statNumbers.forEach(num => counterObserver.observe(num));
});
