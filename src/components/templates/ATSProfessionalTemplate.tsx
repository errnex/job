import type { ResumeData } from "@/types/resume";
import { BaseResumeTemplate } from "./BaseResumeTemplate";

export function ATSProfessionalTemplate({ resume }: { resume: ResumeData }) {
  return <BaseResumeTemplate resume={resume} variant="professional" />;
}
