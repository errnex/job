"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { DownloadButtons } from "./DownloadButtons";
import { ResumePreview } from "./ResumePreview";
import { useResumeBuilderStore } from "@/store/resume-builder.store";

export function PreviewPageClient() {
  const loadCurrentResume = useResumeBuilderStore((state) => state.loadCurrentResume);

  useEffect(() => {
    loadCurrentResume();
  }, [loadCurrentResume]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Full CV Preview</h1>
          <p className="text-sm text-slate-600">Preview memakai template yang sedang dipilih di builder.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/builder">
            <Button variant="secondary">Back to Builder</Button>
          </Link>
        </div>
      </div>
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
        <DownloadButtons />
      </div>
      <ResumePreview />
    </main>
  );
}
