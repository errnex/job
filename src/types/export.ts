import type { ResumeData } from "./resume";

export type ExportResult = {
  success: boolean;
  fileName?: string;
  error?: string;
};

export type ExportOptions = {
  resume: ResumeData;
  fileName?: string;
};
