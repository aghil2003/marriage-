const weddingDate = new Date("2026-05-03T10:30:00+05:30").getTime();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function format(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = format(days);
  hoursEl.textContent = format(hours);
  minutesEl.textContent = format(minutes);
  secondsEl.textContent = format(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

if (!reduceMotion) {
  document.body.classList.add("enhanced");

  const revealElements = document.querySelectorAll("[data-animate]");
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}
