import type { ResumeData } from "@/types/resume";

const STORAGE_KEY = "cv-builder-resumes";
const CURRENT_KEY = "cv-builder-current-resume";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readAll(): ResumeData[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ResumeData[]) : [];
  } catch {
    return [];
  }
}

function writeAll(resumes: ResumeData[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

export const resumeStorageService = {
  list(): ResumeData[] {
    return readAll().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },

  get(id: string): ResumeData | null {
    return readAll().find((resume) => resume.id === id) ?? null;
  },

  getCurrent(): ResumeData | null {
    if (!canUseStorage()) return null;

    try {
      const raw = window.localStorage.getItem(CURRENT_KEY);
      return raw ? (JSON.parse(raw) as ResumeData) : null;
    } catch {
      return null;
    }
  },

  save(resume: ResumeData): ResumeData {
    const nextResume = { ...resume, updatedAt: new Date().toISOString() };
    const existing = readAll();
    const next = [nextResume, ...existing.filter((item) => item.id !== resume.id)];
    writeAll(next);

    if (canUseStorage()) {
      window.localStorage.setItem(CURRENT_KEY, JSON.stringify(nextResume));
    }

    return nextResume;
  },

  saveCurrent(resume: ResumeData) {
    if (!canUseStorage()) return;
    window.localStorage.setItem(CURRENT_KEY, JSON.stringify(resume));
  },

  delete(id: string) {
    writeAll(readAll().filter((resume) => resume.id !== id));
  },

  duplicate(id: string): ResumeData | null {
    const resume = this.get(id);
    if (!resume) return null;

    const now = new Date().toISOString();
    const duplicate = {
      ...resume,
      id: crypto.randomUUID(),
      title: `${resume.title || resume.personalInfo.fullName || "Resume"} Copy`,
      createdAt: now,
      updatedAt: now
    };

    this.save(duplicate);
    return duplicate;
  }
};
