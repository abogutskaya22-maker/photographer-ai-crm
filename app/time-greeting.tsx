"use client";

import { useEffect } from "react";

function greetingForHour(hour: number) {
  if (hour >= 5 && hour < 12) return "Доброго ранку, Олю 👋";
  if (hour >= 12 && hour < 18) return "Доброго дня, Олю 👋";
  if (hour >= 18 && hour < 23) return "Доброго вечора, Олю 👋";
  return "Доброї ночі, Олю 👋";
}

export default function TimeGreeting() {
  useEffect(() => {
    const updateGreeting = () => {
      const stats = document.querySelector(".stats-grid");
      const heading = stats?.previousElementSibling?.querySelector("h1");
      if (heading) heading.textContent = greetingForHour(new Date().getHours());
    };

    updateGreeting();
    const observer = new MutationObserver(updateGreeting);
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setInterval(updateGreeting, 60_000);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
