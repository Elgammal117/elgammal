import type { Experience as ExperienceType, Education } from "../../types/cv";

export type RoleSectionProps = {
  role: ExperienceType;
};

export type EducationSectionProps = {
  educations: readonly Education[];
  location: string;
};

export type CertificationListProps = {
  certifications: readonly string[];
};
