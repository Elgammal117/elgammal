import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatusBar from "./components/StatusBar";
import Sidebar from "./components/Sidebar";
import Preloader from "./components/Preloader";
import DevConsole from "./components/DevConsole";
import ShipBadge from "./components/ShipBadge";
import Hero from "./features/hero";

const About = lazy(() => import("./features/about"));
const Skills = lazy(() => import("./features/skills"));
const Experience = lazy(() => import("./features/experience"));
const Projects = lazy(() => import("./features/projects"));
const Contact = lazy(() => import("./features/contact"));

gsap.registerPlugin(ScrollTrigger);

function useLenis(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, [active]);
}

function SectionFallback() {
  return (
    <div
      className="py-24 md:py-32 border-t hairline container-page"
      aria-hidden
    >
      <div className="h-32" />
    </div>
  );
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderDone = useCallback(() => setPreloaderDone(true), []);

  useLenis(preloaderDone);

  return (
    <>
      {!preloaderDone && <Preloader onDone={handlePreloaderDone} />}
      <StatusBar />
      <Sidebar />
      <DevConsole />
      <ShipBadge />
      <main>
        <Hero preloaderDone={preloaderDone} />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
}
