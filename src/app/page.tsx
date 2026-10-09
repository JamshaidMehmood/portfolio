import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Work } from "@/components/Work";
import { DashboardDemo } from "@/components/DashboardDemo";
import { Projects } from "@/components/Projects";
import { Automation } from "@/components/Automation";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Identity } from "@/components/Identity";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Metrics />
        <Work />
        <DashboardDemo />
        <Automation />
        <Projects />
        <Experience />
        <Skills />
        <Identity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
