export type ResumeType = "ats" | "combination";

export type TemplateId =
  | "ats-classic"
  | "ats-clean"
  | "ats-professional"
  | "ats-compact"
  | "ats-executive"
  | "ats-minimal"
  | "modern-gray"
  | "developer-resume"
  | "creative-minimal"
  | "startup-profile"
  | "portfolio-showcase"
  | "web3-profile";

export type ResumeTemplate = {
  id: TemplateId;
  name: string;
  type: ResumeType;
  description: string;
  bestFor: string;
};
