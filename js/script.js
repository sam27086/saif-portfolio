// ===== SMOOTH SCROLL =====
document.getElementById("scroll-btn").onclick = () =>
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;
  cursor.style.left = posX + "px";
  cursor.style.top = posY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== PROJECT HOVER IMAGE =====
const cards = document.querySelectorAll(".project-card");
const img = document.getElementById("project-image");
const brain = document.getElementById("brain-projects");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    img.src = card.dataset.image;

    // Fade out brain
    brain.style.opacity = "0";

    // Show project image
    img.style.opacity = "1";
    img.style.transform = "translate(-50%, -50%) scale(1)";
  });

  card.addEventListener("mouseleave", () => {
    // Hide project image
    img.style.opacity = "0";
    img.style.transform = "translate(-50%, -50%) scale(0.8)";

    // Fade brain back in
    brain.style.opacity = "1";
  });
});

// ===== NAV TITLE FONT ROTATION =====
const navTitle = document.getElementById("nav-title");
const navFonts = [
  "'Orbitron', sans-serif",
  "'Rajdhani', sans-serif",
  "'Audiowide', cursive",
  "'Exo 2', sans-serif",
  "'Saira', sans-serif"
];


const fontLinks = [
  "https://fonts.googleapis.com/css2?family=Orbitron&display=swap",
  "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap",
  "https://fonts.googleapis.com/css2?family=Audiowide&display=swap",
  "https://fonts.googleapis.com/css2?family=Exo+2&display=swap",
  "https://fonts.googleapis.com/css2?family=Saira&display=swap"
];


fontLinks.forEach(link => {
  const l = document.createElement("link");
  l.href = link;
  l.rel = "stylesheet";
  document.head.appendChild(l);
});

let fontIndex = 0;
setInterval(() => {
  navTitle.style.fontFamily = navFonts[fontIndex];
  fontIndex = (fontIndex + 1) % navFonts.length;
}, 3000);


// ===== SMOOTH NAV SCROLL (OVERRIDES JUMP) =====
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  });
});
