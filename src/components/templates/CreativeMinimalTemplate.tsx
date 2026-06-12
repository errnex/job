import type { ResumeData } from "@/types/resume";
import { BaseResumeTemplate } from "./BaseResumeTemplate";

export function CreativeMinimalTemplate({ resume }: { resume: ResumeData }) {
  return <BaseResumeTemplate resume={resume} variant="creative" />;
}
