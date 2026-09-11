"use client";

import { useEffect } from "react";

export default function PhotographerName() {
  useEffect(() => {
    const replaceName = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        nodes.push(node as Text);
        node = walker.nextNode();
      }

      nodes.forEach((textNode) => {
        if (!textNode.nodeValue) return;
        textNode.nodeValue = textNode.nodeValue
          .replaceAll("Настю", "Олю")
          .replaceAll("Настя", "Оля");
      });

      document.querySelectorAll(".profile-avatar").forEach((avatar) => {
        if (avatar.textContent?.trim() === "Н") avatar.textContent = "О";
      });
    };

    replaceName();
    const observer = new MutationObserver(replaceName);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
