import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { CodeCard } from "@/components/sections/CodeCard";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { NowCard } from "@/components/sections/NowCard";
import { Projects } from "@/components/sections/Projects";
import { StackMarquee } from "@/components/sections/StackMarquee";

/** Server component: only composes the sections. */
export default function Home() {
  return (
    <div
      id="top"
      className="mx-auto flex max-w-[1000px] flex-col gap-3 px-4 pb-12 sm:px-5"
    >
      <Header />
      <main className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          <div className="min-w-0 flex-[2_1_460px]">
            <Hero />
          </div>
          <div className="min-w-0 flex-[1_1_260px]">
            <NowCard />
          </div>
        </div>

        <div id="over" className="flex flex-wrap gap-3">
          <div className="min-w-0 flex-[1_1_380px]">
            <CodeCard />
          </div>
          <div className="min-w-0 flex-[1_1_340px]">
            <About />
          </div>
        </div>

        <StackMarquee />
        <Projects />
        <Career />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
