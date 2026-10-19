
import "./globals.css";
import { Orbitron, Manrope, JetBrains_Mono } from "next/font/google";

const display = Orbitron({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Aryan Makhija — Full Stack Developer",
  description: "Full Stack Developer building scalable web apps, intelligent products and reliable backends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
