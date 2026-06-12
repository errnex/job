"use client";

import { renderResumeTemplate } from "@/components/templates/render-template";
import { useResumeBuilderStore } from "@/store/resume-builder.store";

export function ResumePreview() {
  const resume = useResumeBuilderStore((state) => state.resumeData);

  return (
    <div className="overflow-auto rounded-lg border border-slate-200 bg-slate-100 p-4">
      <div id="resume-preview-export" className="origin-top-left scale-[0.48] sm:scale-[0.58] lg:scale-[0.62] xl:scale-[0.68]">
        {renderResumeTemplate(resume)}
      </div>
    </div>
  );
}
