"use client";

import { useEffect } from "react";

export default function PhotographerName() {
  useEffect(() => {
    const replaceWorkspaceText = () => {
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
          .replaceAll("Настя", "Оля")
          .replaceAll("AI-помічник", "Муркетолог 🐾")
          .replaceAll("AI Content Manager", "Муркетолог 🐾")
          .replaceAll("AI-висновок", "Муркетолог радить")
          .replaceAll("AI радить", "Муркетолог радить")
          .replaceAll("AI може", "Муркетолог може");
      });

      document.querySelectorAll(".profile-avatar").forEach((avatar) => {
        if (avatar.textContent?.trim() === "Н") avatar.textContent = "О";
      });
    };

    replaceWorkspaceText();
    const observer = new MutationObserver(replaceWorkspaceText);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
