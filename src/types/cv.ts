export type Person = {
  name: string;
  preferredName: string;
  role: string;
  location: string;
  timezone: string;
};

export type ContactInfo = {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  gpa?: string;
};

export type Expertise = {
  label: string;
  description: string;
  icon: string;
};

export type SkillGroup = {
  category: string;
  icon: string;
  skills: readonly string[];
};

export type Project = {
  id: string;
  title: string;
  role: string;
  stack: string;
  description: string;
  impact: string;
  link: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: readonly string[];
};

export type Language = {
  name: string;
  level: string;
};
