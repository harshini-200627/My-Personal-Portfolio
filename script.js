/* ==========================================================
   POOSAPATI HARSHINI — PORTFOLIO
   Shared script (navbar, reveal-on-scroll, skills, forms)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initReveal();
  initSkillBars();
  initContactForm();
  wireResumeButtons();
});

/* ---------- Navbar: scroll blur + mobile menu + active link ---------- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      const icon = burger.querySelector("svg");
      burger.setAttribute(
        "aria-label",
        mobileMenu.classList.contains("open") ? "Close menu" : "Open menu"
      );
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("open"))
    );
  }

  // Mark the active nav link based on current page
  const current = document.body.dataset.page;
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    if (a.dataset.page === current) a.classList.add("active");
  });
}

/* ---------- Reveal-on-scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

/* ---------- Animated skill progress bars ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  if (bars.length === 0) return;
  if (!("IntersectionObserver" in window)) {
    bars.forEach((b) => (b.style.width = b.dataset.value + "%"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          requestAnimationFrame(() => {
            bar.style.width = bar.dataset.value + "%";
          });
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => observer.observe(b));
}

/* ---------- Contact form (frontend-only, no backend) ---------- */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  const successMsg = form.querySelector(".form-success");
  const submitBtn = form.querySelector(".submit-btn");
  const submitLabel = submitBtn ? submitBtn.querySelector(".label") : null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitLabel) submitLabel.textContent = "Message Sent";
    if (submitBtn) submitBtn.classList.add("sent");
    if (successMsg) successMsg.style.display = "block";
    form.reset();
    setTimeout(() => {
      if (submitLabel) submitLabel.textContent = "Send Message";
      if (submitBtn) submitBtn.classList.remove("sent");
      if (successMsg) successMsg.style.display = "none";
    }, 4000);
  });
}

/* ---------- Download Resume (generates a text summary client-side) ---------- */
function wireResumeButtons() {
  document.querySelectorAll("[data-download-resume]").forEach((btn) => {
    btn.addEventListener("click", downloadResume);
  });
}

function downloadResume() {
  const content = `POOSAPATI HARSHINI
UI/UX Designer | Frontend Developer | Computer Science Engineering Student

Location: Vijayawada, Andhra Pradesh
Email: poosapatiharshini27@gmail.com
Phone: +91 8919031239
LinkedIn: linkedin.com/in/poosapati-harshini-833750374

EDUCATION
B.Tech, Computer Science Engineering — PSCMR College of Engineering and Technology (2024–2028), CGPA 8.2
Intermediate — Sri Chaitanya Junior College (2022–2024), 87%
SSC — Sri Chaitanya High School (2022), 87%

CAREER OBJECTIVE
Creative and detail-oriented Computer Science Engineering student passionate about
UI/UX design and frontend development. I enjoy creating user-centered interfaces
that are visually appealing, responsive, and easy to use. My goal is to design
meaningful digital experiences while continuously improving my technical and
creative skills.

SKILLS
Programming: Java
Frontend: HTML, CSS, JavaScript
UI/UX: Figma, Canva
Web Tools: WordPress

PROJECTS
1. Quantum Looms — Quantum-Enabled Handloom E-Commerce Platform
2. RescueTrack — Accident Alert Dashboard
3. Food Delivery Login UI — Figma product design
4. Event Website — Responsive WordPress event site
5. Logo Design — Branding & logo design in Canva

CERTIFICATIONS
CODE SPARK INDIA 2025 Hackathon; Internal Smart India Hackathon 2025; MIND SPRINT 2K25 Hackathon;
UI/UX Design Workshop (Figma); WordPress Website Development Workshop; RTIH Startup Boot Camp

STRENGTHS
Problem Solving, Quick Learner, Self-Motivated, Team Player, Good Communication,
Adaptable to New Technologies, Creative Thinking, Attention to Detail
`;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Poosapati_Harshini_Resume.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        emailjs.sendForm(
            "service_mvyhdxn",
            "template_jc0sitj",
            this
        ).then(function(){

            alert("Message sent successfully!");

            form.reset();

        }).catch(function(error){

            alert("Failed to send message.");

            console.log(error);

        });

    });

}
