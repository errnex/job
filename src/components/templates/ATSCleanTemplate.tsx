import type { ResumeData } from "@/types/resume";
import { BaseResumeTemplate } from "./BaseResumeTemplate";

export function ATSCleanTemplate({ resume }: { resume: ResumeData }) {
  return <BaseResumeTemplate resume={resume} variant="clean" />;
}
