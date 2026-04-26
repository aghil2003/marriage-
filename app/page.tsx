"use client";

import { useEffect, useMemo, useState } from "react";

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const weddingDateMs = new Date("2026-05-03T10:30:00+05:30").getTime();

function getCountdown(): Countdown {
  const now = Date.now();
  const distance = weddingDateMs - now;

  if (distance <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0")
  };
}

export default function HomePage() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    setCountdown(getCountdown());

    const interval = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    document.body.classList.add("enhanced");
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"));
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

    return () => {
      observer.disconnect();
      document.body.classList.remove("enhanced");
    };
  }, []);

  const calendarDays = useMemo(
    () => [
      "", "", "", "", "", "1", "2",
      "3", "4", "5", "6", "7", "8", "9",
      "10", "11", "12", "13", "14", "15", "16",
      "17", "18", "19", "20", "21", "22", "23",
      "24", "25", "26", "27", "28", "29", "30",
      "31", "", "", "", "", "", ""
    ],
    []
  );

  return (
    <main className="page">
      <section className="intro-card card reveal" data-animate>
        <figure className="top-banner reveal" data-animate>
          <img src="/img/happy-valentine-s-day-banner-in-paper-art-style-vector.jpg" alt="Romantic paper-art banner" />
        </figure>

        <section className="quote-card reveal" data-animate>
          <p className="script-line">This is the beginning of something beautiful...</p>
        </section>

        <section className="hero reveal" data-animate>
          <p className="eyebrow">Together with their families</p>
          <h1>
            Anagha <span>&amp;</span> Vishnu
          </h1>
          <p className="title">are getting married</p>

          <figure className="couple-art-wrap">
            <img className="couple-art" src="/img/25343b5be48390648c64be9b5dd90f16.png" alt="Bride and groom illustration" />
          </figure>

          <div className="date-pill" aria-label="Wedding date">
            Sunday, 03 May 2026
          </div>

          <p className="venue">Guruvayur Temple</p>
          <p className="invite-note">Save the date and celebrate love with us.</p>
        </section>
      </section>

      <section className="countdown card reveal" data-animate aria-labelledby="countdown-heading">
        <h2 id="countdown-heading">Countdown to our day</h2>
        <div className="timer" role="timer" aria-live="polite">
          <div>
            <span>{countdown.days}</span>
            <small>Days</small>
          </div>
          <div>
            <span>{countdown.hours}</span>
            <small>Hours</small>
          </div>
          <div>
            <span>{countdown.minutes}</span>
            <small>Minutes</small>
          </div>
          <div>
            <span>{countdown.seconds}</span>
            <small>Seconds</small>
          </div>
        </div>
      </section>

      <section className="details card reveal" data-animate aria-labelledby="details-heading">
        <h2 id="details-heading">Muhurtham</h2>
        <p className="month-pill">May 03 2026</p>

        <div className="calendar" role="table" aria-label="Wedding calendar">
          <div className="weekdays" role="row">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
          <div className="dates" role="rowgroup">
            {calendarDays.map((day, index) => (
              <span key={`${day}-${index}`} className={day === "3" ? "active" : undefined}>
                {day}
              </span>
            ))}
          </div>
        </div>

        <figure className="muhurtham-footer-image">
          <img src="/img/images.jpg" alt="Temple sketch illustration" />
        </figure>
        <p className="location-line">
          <span className="pin">📍</span> Kunnamkulam
        </p>
        <p className="detail-note">Wedding Ceremony: 10:30 AM | Lunch: 12:00 PM</p>
        <a
          className="btn"
          href="https://www.google.com/maps/search/?api=1&query=Ittiachen+Memorial+Kalyana+Mandapam"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open location map"
        >
          View Location
        </a>
      </section>
    </main>
  );
}
