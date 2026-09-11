import type { Metadata } from "next";
import "./globals.css";
import "./olya-theme.css";

export const metadata: Metadata = {
  title: "Oyaka Workspace — CRM фотографа Олі",
  description: "Робоче середовище фотографа Олі: клієнти, зйомки, контент, фінанси та AI-помічник",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
