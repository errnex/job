import type { ResumeData } from "@/types/resume";

export const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function createEmptyResume(): ResumeData {
  const now = new Date().toISOString();

  return {
    id: createId(),
    title: "Untitled Resume",
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      photo: ""
    },
    summary: "",
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    achievements: [],
    selectedTemplate: "ats-classic",
    selectedType: "ats",
    settings: {
      fontSize: "medium",
      pageMargin: "normal",
      showPhoto: false,
      visibleSections: {
        summary: true,
        experience: true,
        education: true,
        projects: true,
        skills: true,
        certifications: true,
        languages: true,
        achievements: true
      }
    },
    createdAt: now,
    updatedAt: now
  };
}
