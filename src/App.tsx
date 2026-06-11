import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar from "./components/Sidebar";
import { DevConsole, ShipBadge, HotReloadBadge, DebugOverlay, CrashScreen } from "./features/easter-eggs";
import Hero from "./features/hero";

const About = lazy(() => import("./features/about"));
const Skills = lazy(() => import("./features/skills"));
const Experience = lazy(() => import("./features/experience"));
const Projects = lazy(() => import("./features/projects"));
const Contact = lazy(() => import("./features/contact"));

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
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
  }, []);
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
  useLenis();

  return (
    <>
      <Sidebar />
      <DevConsole />
      <ShipBadge />
      <HotReloadBadge />
      <DebugOverlay />
      <CrashScreen />
      <main>
        <Hero />
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
