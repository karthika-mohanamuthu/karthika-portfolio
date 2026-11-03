import { Backdrop, Nav, ScrollProgress } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { About, Contact, Delivery, Experience, Footer, Projects, TechStrip, Skills } from "@/components/sections";
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
