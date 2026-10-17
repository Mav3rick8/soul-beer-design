import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Один шрифт на весь сайт: круглые буквы Manrope перекликаются с пластинкой, и в нём есть кириллица.
const manrope = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Soul Beer Bar",
  description: "Soul Beer на Кастанаевской: пиво и гитара на втором этаже, бронь столов, самовывоз и предзаказ к столу",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Класс js ставится до отрисовки: анимации появления включаются только при работающем JS
    <html lang="ru" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
