document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");
  const toTop = document.getElementById("toTop");
  const sections = document.querySelectorAll("section[id]");

  /* ---------- Mobile menu ---------- */
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  links.forEach((link) =>
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  /* ---------- Navbar style, back-to-top, active link ---------- */
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 50);
    toTop.classList.toggle("show", y > 500);

    let current = "home";
    sections.forEach((sec) => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current)
    );
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---------- Typing effect ---------- */
  const words = ["Web Developer", "Front-End Developer", "UI Designer", "Problem Solver"];
  const typedEl = document.getElementById("typed");
  let w = 0, c = 0, deleting = false;

  function type() {
    const word = words[w];
    typedEl.textContent = word.substring(0, c);
    let delay = deleting ? 50 : 110;

    if (!deleting && c === word.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && c === 0) {
      deleting = false;
      w = (w + 1) % words.length;
      delay = 400;
    }
    c += deleting ? -1 : 1;
    setTimeout(type, delay);
  }
  type();

  /* ---------- Reveal on scroll + skill bars + counters ---------- */
  function animateCount(el) {
    const target = +el.dataset.count;
    const duration = 1500;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");

        el.querySelectorAll(".fill").forEach((f) => (f.style.width = f.dataset.width + "%"));
        el.querySelectorAll("[data-count]").forEach(animateCount);

        observer.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* ---------- Contact form (front-end validation) ---------- */
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    msg.className = "form-msg";
    if (!name || !email || !message) {
      msg.textContent = "Please fill in all fields.";
      msg.classList.add("error");
    } else if (!emailOk) {
      msg.textContent = "Please enter a valid email address.";
      msg.classList.add("error");
    } else {
      // Opens the visitor's mail app. To receive messages directly,
      // connect this form to Formspree / Netlify Forms instead.
      const subject = encodeURIComponent("Portfolio message from " + name);
      const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
      window.location.href = "mailto:hayatiqra277@gmail.com?subject=" + subject + "&body=" + body;
      msg.textContent = "Thanks, " + name + "! Your message is ready to send.";
      msg.classList.add("success");
      form.reset();
    }
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
