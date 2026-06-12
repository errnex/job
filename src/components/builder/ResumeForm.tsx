"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Modal } from "@/components/shared/Modal";
import { getResumeWarnings, resumeSchema } from "@/utils/resume-validation";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { ResumePreview } from "./ResumePreview";
import { TemplateSelector } from "./TemplateSelector";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { ProjectForm } from "./ProjectForm";
import { SkillForm } from "./SkillForm";
import { CertificationForm } from "./CertificationForm";
import { LanguageForm } from "./LanguageForm";
import { AchievementForm } from "./AchievementForm";

const steps = [
  "Personal",
  "Summary",
  "Experience",
  "Education",
  "Projects",
  "Skills",
  "More",
  "Template"
];

export function ResumeForm() {
  const resume = useResumeBuilderStore((state) => state.resumeData);
  const saveResume = useResumeBuilderStore((state) => state.saveResume);
  const resetResume = useResumeBuilderStore((state) => state.resetResume);
  const [activeStep, setActiveStep] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const warnings = useMemo(() => getResumeWarnings(resume), [resume]);
  const form = useForm({
    resolver: zodResolver(resumeSchema),
    mode: "onChange"
  });

  useEffect(() => {
    form.reset(resume);
    void form.trigger();
  }, [form, resume]);

  const desktopSections = (
    <>
      <TemplateSelector />
      <PersonalInfoForm />
      <SummaryForm />
      <ExperienceForm />
      <EducationForm />
      <ProjectForm />
      <SkillForm />
      <CertificationForm />
      <LanguageForm />
      <AchievementForm />
    </>
  );

  const mobileSections = [
    <PersonalInfoForm key="personal" />,
    <SummaryForm key="summary" />,
    <ExperienceForm key="experience" />,
    <EducationForm key="education" />,
    <ProjectForm key="projects" />,
    <SkillForm key="skills" />,
    <div key="more" className="space-y-4">
      <CertificationForm />
      <LanguageForm />
      <AchievementForm />
    </div>,
    <TemplateSelector key="template" />
  ];

  return (
    <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Current resume</p>
          <h1 className="text-xl font-semibold text-slate-950">{resume.personalInfo.fullName || "Untitled Resume"}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" className="lg:hidden" onClick={() => setIsPreviewOpen(true)}>
            <Eye size={16} />
            Preview
          </Button>
          <Button type="button" onClick={() => saveResume()}>
            Save CV
          </Button>
          <Button type="button" variant="ghost" onClick={() => resetResume()}>
            Reset
          </Button>
        </div>
      </div>
      {warnings.length ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {warnings[0]}
        </div>
      ) : null}
      <div className="hidden space-y-5 md:block">{desktopSections}</div>
      <div className="space-y-4 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step}
              onClick={() => setActiveStep(index)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm ${
                activeStep === index ? "bg-slate-950 text-white" : "bg-white text-slate-700"
              }`}
            >
              {step}
            </button>
          ))}
        </div>
        {mobileSections[activeStep]}
      </div>
      <Modal title="Resume Preview" isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <ResumePreview />
      </Modal>
    </form>
  );
}
