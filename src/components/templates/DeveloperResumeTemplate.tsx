import type { ResumeData } from "@/types/resume";
import { BaseResumeTemplate } from "./BaseResumeTemplate";

export function DeveloperResumeTemplate({ resume }: { resume: ResumeData }) {
  return <BaseResumeTemplate resume={resume} variant="developer" />;
}
