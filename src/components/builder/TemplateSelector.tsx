"use client";

import { resumeTemplates } from "@/data/templates";
import { cn } from "@/lib/cn";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import type { ResumeType } from "@/types/template";
import { Select } from "@/components/shared/Select";

export function TemplateSelector() {
  const resume = useResumeBuilderStore((state) => state.resumeData);
  const updateTemplate = useResumeBuilderStore((state) => state.updateTemplate);
  const updateType = useResumeBuilderStore((state) => state.updateType);
  const updateSettings = useResumeBuilderStore((state) => state.updateSettings);

  const filteredTemplates = resumeTemplates.filter((template) => template.type === resume.selectedType);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          label="CV Type"
          value={resume.selectedType}
          onChange={(event) => updateType(event.target.value as ResumeType)}
          options={[
            { value: "ats", label: "ATS Friendly CV" },
            { value: "combination", label: "Combination CV" }
          ]}
        />
        <Select
          label="Template"
          value={resume.selectedTemplate}
          onChange={(event) => updateTemplate(event.target.value as typeof resume.selectedTemplate)}
          options={filteredTemplates.map((template) => ({ value: template.id, label: template.name }))}
        />
        <Select
          label="Font Size"
          value={resume.settings.fontSize}
          onChange={(event) => updateSettings({ fontSize: event.target.value as typeof resume.settings.fontSize })}
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" }
          ]}
        />
        <Select
          label="Page Margin"
          value={resume.settings.pageMargin}
          onChange={(event) => updateSettings({ pageMargin: event.target.value as typeof resume.settings.pageMargin })}
          options={[
            { value: "compact", label: "Compact" },
            { value: "normal", label: "Normal" },
            { value: "wide", label: "Wide" }
          ]}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={resume.settings.showPhoto}
          onChange={(event) => updateSettings({ showPhoto: event.target.checked })}
        />
        Show photo in resume
      </label>
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Show / hide sections</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(resume.settings.visibleSections).map(([key, value]) => (
            <label
              key={key}
              className={cn(
                "flex items-center justify-between rounded-md border px-3 py-2 text-sm",
                value ? "border-slate-300 bg-white" : "border-slate-200 bg-slate-50 text-slate-400"
              )}
            >
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={(event) =>
                  updateSettings({
                    visibleSections: {
                      [key]: event.target.checked
                    } as Partial<typeof resume.settings.visibleSections>
                  })
                }
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
