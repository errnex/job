import type { ResumeData } from "@/types/resume";
import { BaseResumeTemplate, type TemplateVariant } from "./BaseResumeTemplate";

const variantByTemplateId: Record<ResumeData["selectedTemplate"], TemplateVariant> = {
  "ats-classic": "classic",
  "ats-clean": "clean",
  "ats-professional": "professional",
  "ats-compact": "compact",
  "ats-executive": "executive",
  "ats-minimal": "minimal",
  "modern-gray": "modern",
  "developer-resume": "developer",
  "creative-minimal": "creative",
  "startup-profile": "startup",
  "portfolio-showcase": "portfolio",
  "web3-profile": "web3"
};

export function renderResumeTemplate(resume: ResumeData) {
  return <BaseResumeTemplate resume={resume} variant={variantByTemplateId[resume.selectedTemplate]} />;
}
