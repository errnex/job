"use client";

import { create } from "zustand";
import { createEmptyResume, createId } from "@/data/default-resume";
import { calculateATSScore } from "@/utils/ats-score";
import { resumeStorageService } from "@/services/storage/resume-storage.service";
import type {
  Achievement,
  Certification,
  Education,
  Experience,
  Language,
  PersonalInfo,
  Project,
  ResumeData,
  ResumeSettings,
  Skill
} from "@/types/resume";
import type { ATSScoreResult } from "@/types/ats";
import type { ResumeTemplate, ResumeType, TemplateId } from "@/types/template";
import { resumeTemplates } from "@/data/templates";

type ResumeSettingsUpdate = Partial<Omit<ResumeSettings, "visibleSections">> & {
  visibleSections?: Partial<ResumeSettings["visibleSections"]>;
};

type BuilderState = {
  resumeData: ResumeData;
  selectedTemplate: TemplateId;
  selectedType: ResumeType;
  previewMode: "desktop" | "mobile";
  atsScore: ATSScoreResult;
  isSaving: boolean;
  isExporting: boolean;
  updatePersonalInfo: (value: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  updateSettings: (settings: ResumeSettingsUpdate) => void;
  updateTemplate: (template: TemplateId) => void;
  updateType: (type: ResumeType) => void;
  addExperience: () => void;
  updateExperience: (id: string, value: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, value: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, value: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, value: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, value: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, value: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addAchievement: () => void;
  updateAchievement: (id: string, value: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  saveResume: () => ResumeData;
  loadResume: (resume: ResumeData) => void;
  loadCurrentResume: () => void;
  resetResume: () => void;
};

const empty = createEmptyResume();

function touch(resume: ResumeData): ResumeData {
  const next = { ...resume, updatedAt: new Date().toISOString() };
  resumeStorageService.saveCurrent(next);
  return next;
}

function withScore(resume: ResumeData) {
  return {
    resumeData: resume,
    selectedTemplate: resume.selectedTemplate,
    selectedType: resume.selectedType,
    atsScore: calculateATSScore(resume)
  };
}

function resolveTemplateForType(type: ResumeType): ResumeTemplate {
  return resumeTemplates.find((template) => template.type === type) ?? resumeTemplates[0];
}

export const useResumeBuilderStore = create<BuilderState>((set, get) => ({
  resumeData: empty,
  selectedTemplate: empty.selectedTemplate,
  selectedType: empty.selectedType,
  previewMode: "desktop",
  atsScore: calculateATSScore(empty),
  isSaving: false,
  isExporting: false,

  updatePersonalInfo: (value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        title: value.fullName || state.resumeData.title,
        personalInfo: { ...state.resumeData.personalInfo, ...value }
      });
      return withScore(resume);
    }),

  updateSummary: (summary) =>
    set((state) => {
      const resume = touch({ ...state.resumeData, summary });
      return withScore(resume);
    }),

  updateSettings: (settings) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        settings: {
          ...state.resumeData.settings,
          ...settings,
          visibleSections: {
            ...state.resumeData.settings.visibleSections,
            ...settings.visibleSections
          }
        }
      });
      return withScore(resume);
    }),

  updateTemplate: (template) =>
    set((state) => {
      const resume = touch({ ...state.resumeData, selectedTemplate: template });
      return withScore(resume);
    }),

  updateType: (type) =>
    set((state) => {
      const nextTemplate = resolveTemplateForType(type).id;
      const resume = touch({ ...state.resumeData, selectedType: type, selectedTemplate: nextTemplate });
      return withScore(resume);
    }),

  addExperience: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        experiences: [
          ...state.resumeData.experiences,
          {
            id: createId(),
            companyName: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            description: ""
          }
        ]
      });
      return withScore(resume);
    }),

  updateExperience: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        experiences: state.resumeData.experiences.map((item) =>
          item.id === id ? { ...item, ...value } : item
        )
      });
      return withScore(resume);
    }),

  removeExperience: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        experiences: state.resumeData.experiences.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  addEducation: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          {
            id: createId(),
            institution: "",
            degree: "",
            major: "",
            startYear: "",
            endYear: "",
            gpa: "",
            description: ""
          }
        ]
      });
      return withScore(resume);
    }),

  updateEducation: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        education: state.resumeData.education.map((item) => (item.id === id ? { ...item, ...value } : item))
      });
      return withScore(resume);
    }),

  removeEducation: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        education: state.resumeData.education.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  addProject: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        projects: [
          ...state.resumeData.projects,
          { id: createId(), projectName: "", role: "", techStack: "", link: "", description: "" }
        ]
      });
      return withScore(resume);
    }),

  updateProject: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        projects: state.resumeData.projects.map((item) => (item.id === id ? { ...item, ...value } : item))
      });
      return withScore(resume);
    }),

  removeProject: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        projects: state.resumeData.projects.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  addSkill: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        skills: [...state.resumeData.skills, { id: createId(), name: "", category: "Technical Skills" }]
      });
      return withScore(resume);
    }),

  updateSkill: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        skills: state.resumeData.skills.map((item) => (item.id === id ? { ...item, ...value } : item))
      });
      return withScore(resume);
    }),

  removeSkill: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        skills: state.resumeData.skills.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  addCertification: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        certifications: [
          ...state.resumeData.certifications,
          { id: createId(), name: "", issuer: "", year: "", link: "" }
        ]
      });
      return withScore(resume);
    }),

  updateCertification: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        certifications: state.resumeData.certifications.map((item) =>
          item.id === id ? { ...item, ...value } : item
        )
      });
      return withScore(resume);
    }),

  removeCertification: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        certifications: state.resumeData.certifications.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  addLanguage: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        languages: [...state.resumeData.languages, { id: createId(), language: "", proficiency: "" }]
      });
      return withScore(resume);
    }),

  updateLanguage: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        languages: state.resumeData.languages.map((item) => (item.id === id ? { ...item, ...value } : item))
      });
      return withScore(resume);
    }),

  removeLanguage: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        languages: state.resumeData.languages.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  addAchievement: () =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        achievements: [...state.resumeData.achievements, { id: createId(), title: "", description: "", year: "" }]
      });
      return withScore(resume);
    }),

  updateAchievement: (id, value) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        achievements: state.resumeData.achievements.map((item) =>
          item.id === id ? { ...item, ...value } : item
        )
      });
      return withScore(resume);
    }),

  removeAchievement: (id) =>
    set((state) => {
      const resume = touch({
        ...state.resumeData,
        achievements: state.resumeData.achievements.filter((item) => item.id !== id)
      });
      return withScore(resume);
    }),

  saveResume: () => {
    set({ isSaving: true });
    const saved = resumeStorageService.save(get().resumeData);
    set({ ...withScore(saved), isSaving: false });
    return saved;
  },

  loadResume: (resume) => set(withScore(resume)),

  loadCurrentResume: () => {
    const resume = resumeStorageService.getCurrent();
    if (resume) set(withScore(resume));
  },

  resetResume: () => {
    const resume = createEmptyResume();
    resumeStorageService.saveCurrent(resume);
    set(withScore(resume));
  }
}));
