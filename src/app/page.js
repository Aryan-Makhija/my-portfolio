"use client";
import { useState } from "react";
import WelcomeModal from "@/components/WelcomeModal";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Engineering from "@/components/Engineering";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";

export default function Page() {
  const [intro, setIntro] = useState(true);

  return (
    <main className="relative min-h-screen bg-bg">
      <WelcomeModal open={intro} onClose={() => setIntro(false)} />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Stack />
      <Engineering />
      <Stats />
      <Contact />
      <ChatWidget />
    </main>
  );
}