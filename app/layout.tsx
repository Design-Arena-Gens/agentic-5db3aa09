import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Память — Узнаешь меня?",
  description:
    "Интерактивная история о памяти, идентичности и главном вопросе: узнаешь ли ты меня?",
  openGraph: {
    title: "Память — Узнаешь меня?",
    description:
      "Живой интерфейс, который пытается угадать, кем вы были для него когда-то.",
    url: "https://agentic-5db3aa09.vercel.app",
    siteName: "Узнаешь меня?",
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Память — Узнаешь меня?",
    description:
      "Живой интерфейс, который пытается угадать, кем вы были для него когда-то."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
