import { Backdrop, Nav, ScrollProgress } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { About, Contact, Experience, Footer, Skills, TechStrip, Work } from "@/components/sections";
import { MotionProvider } from "@/components/motion-provider";

export default function Home() {
  return (
    <MotionProvider>
      <Backdrop />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <TechStrip />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
