import { useSectionReveal } from "../../hooks/useSectionReveal";
import { cv } from "../../../data/cv";
import RoleSection from "./RoleSection";
import EducationSection from "./EducationSection";
import CertificationList from "./CertificationList";

export default function Experience() {
  const ref = useSectionReveal();
  const role = cv.experience[0];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className="py-24 md:py-32 border-t hairline"
      aria-label="Experience"
    >
      <div className="container-page">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3">
              <span className="text-ink">§ 03</span>
              <span className="mx-2 text-ink-muted/60">/</span>
              Experience
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-0.02em]">
              The work, where it counts.
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted max-w-md">
            {cv.experience.length} role · {cv.experience.reduce((n, r) => n + r.highlights.length, 0)} operational notes
          </p>
        </div>

        {role && <RoleSection role={role} />}

        <EducationSection educations={cv.education} location={cv.person.location} />

        <CertificationList certifications={cv.certifications} />
      </div>
    </section>
  );
}
