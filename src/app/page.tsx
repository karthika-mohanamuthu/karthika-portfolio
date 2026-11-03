import { Aurora, CursorGlow, Nav, ScrollProgress } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { About, Contact, Delivery, Experience, Footer, Marquee, Projects, Skills } from "@/components/sections";
import { MotionProvider } from "@/components/motion-provider";

export default function Home() {
  return (
    <MotionProvider>
      <Aurora />
      <CursorGlow />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Delivery />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
