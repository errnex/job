import type { ResumeData } from "@/types/resume";
import { BaseResumeTemplate } from "./BaseResumeTemplate";

export function ModernGrayTemplate({ resume }: { resume: ResumeData }) {
  return <BaseResumeTemplate resume={resume} variant="modern" />;
}
