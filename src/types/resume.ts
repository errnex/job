import type { ResumeType, TemplateId } from "./template";

export type PersonalInfo = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photo: string;
};

export type Experience = {
  id: string;
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  major: string;
  startYear: string;
  endYear: string;
  gpa: string;
  description: string;
};

export type Project = {
  id: string;
  projectName: string;
  role: string;
  techStack: string;
  link: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link: string;
};

export type Language = {
  id: string;
  language: string;
  proficiency: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  year: string;
};

export type ResumeSettings = {
  fontSize: "small" | "medium" | "large";
  pageMargin: "compact" | "normal" | "wide";
  showPhoto: boolean;
  visibleSections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    certifications: boolean;
    languages: boolean;
    achievements: boolean;
  };
};

export type ResumeData = {
  id: string;
  title: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  selectedTemplate: TemplateId;
  selectedType: ResumeType;
  settings: ResumeSettings;
  createdAt: string;
  updatedAt: string;
};
