// import { Geist, Geist_Mono, Syne } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const syne = Syne({
//   variable: "--font-syne",
//   subsets: ["latin"],
//   weight: ["500", "600", "700", "800"],
// });

// export const metadata = {
//   title: "Aryan Makhija — Full Stack Developer",
//   description: "Portfolio of Aryan Makhija — full stack products, APIs, and AI-powered apps.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
//     >
//       <body className="min-h-full bg-bg font-sans text-fg flex flex-col">{children}</body>
//     </html>
//   );
// }

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
