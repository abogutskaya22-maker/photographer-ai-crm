import type { Metadata } from "next";
import "./globals.css";
import "./olya-theme.css";
import "./olya-brand.css";
import "./murketolog-widget.css";
import "./live-crm.css";
import "./client-booking-history.css";

export const metadata: Metadata = {
  title: "Oyaka Workspace — CRM фотографа Олі",
  description: "Робоче середовище фотографа Олі: клієнти, зйомки, контент, фінанси та Муркетолог 🐾",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
