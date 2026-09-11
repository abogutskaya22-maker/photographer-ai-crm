import type { Metadata } from "next";
import "./globals.css";
import "./olya-theme.css";
import "./olya-brand.css";
import "./murketolog-widget.css";
import PhotographerName from "./photographer-name";
import MurketologWidget from "./murketolog-widget";

export const metadata: Metadata = {
  title: "Oyaka Workspace — CRM фотографа Олі",
  description: "Робоче середовище фотографа Олі: клієнти, зйомки, контент, фінанси та Муркетолог 🐾",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        {children}
        <PhotographerName />
        <MurketologWidget />
      </body>
    </html>
  );
}
