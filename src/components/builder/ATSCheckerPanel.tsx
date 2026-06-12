"use client";

import { useMemo, useState } from "react";
import { calculateATSScore } from "@/utils/ats-score";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { Textarea } from "@/components/shared/Textarea";

export function ATSCheckerPanel() {
  const resume = useResumeBuilderStore((state) => state.resumeData);
  const [jobDescription, setJobDescription] = useState("");
  const result = useMemo(() => calculateATSScore(resume, jobDescription), [resume, jobDescription]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">ATS Score</p>
          <p className="text-4xl font-bold text-slate-950">{result.score}</p>
        </div>
        <div className="h-3 flex-1 rounded-full bg-slate-100">
          <div className="h-3 rounded-full bg-emerald-600" style={{ width: `${result.score}%` }} />
        </div>
      </div>
      <Textarea
        label="Optional job description"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste job description untuk cek keyword match."
      />
      <div className="space-y-2">
        {result.sections.map((section) => (
          <div key={section.label} className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{section.label}</span>
              <span>
                {section.score}/{section.maxScore}
              </span>
            </div>
            {section.status !== "good" ? <p className="mt-1 text-xs text-slate-500">{section.recommendation}</p> : null}
          </div>
        ))}
      </div>
      {jobDescription ? (
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-md bg-emerald-50 p-3 text-emerald-800">
            <p className="font-medium">Matched keywords</p>
            <p className="mt-1">{result.matchedKeywords.join(", ") || "Belum ada keyword cocok."}</p>
          </div>
          <div className="rounded-md bg-amber-50 p-3 text-amber-800">
            <p className="font-medium">Missing keywords</p>
            <p className="mt-1">{result.missingKeywords.join(", ") || "Tidak ada missing keyword utama."}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
