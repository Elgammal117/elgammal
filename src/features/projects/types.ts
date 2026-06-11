import type { Project } from "../../types/cv";

export type ProjectCardProps = Project & {
  span: string;
  classification: string;
  version: string;
};
