"use client";

import { Textarea } from "@/components/shared/Textarea";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function SummaryForm() {
  const summary = useResumeBuilderStore((state) => state.resumeData.summary);
  const updateSummary = useResumeBuilderStore((state) => state.updateSummary);

  return (
    <FormShell title="Professional Summary">
      <Textarea
        value={summary}
        onChange={(event) => updateSummary(event.target.value)}
        placeholder="Contoh: Fullstack developer dengan pengalaman membangun aplikasi SaaS, integrasi API, dan produk Web3..."
      />
    </FormShell>
  );
}
