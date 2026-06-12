"use client";

import { useEffect } from "react";
import { Card } from "@/components/shared/Card";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { ATSCheckerPanel } from "./ATSCheckerPanel";
import { DownloadButtons } from "./DownloadButtons";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { useResumeBuilderStore } from "@/store/resume-builder.store";

export function ResumeBuilderPage() {
  const loadCurrentResume = useResumeBuilderStore((state) => state.loadCurrentResume);

  useEffect(() => {
    loadCurrentResume();
  }, [loadCurrentResume]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(480px,0.9fr)]">
        <div className="space-y-6">
          <ResumeForm />
          <Card className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Download</h2>
            <DownloadButtons />
          </Card>
          <Card className="p-4">
            <h2 className="mb-4 text-lg font-semibold">ATS Checker</h2>
            <ATSCheckerPanel />
          </Card>
          <Card className="p-4">
            <h2 className="mb-4 text-lg font-semibold">AI Assistant</h2>
            <AIAssistantPanel />
          </Card>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ResumePreview />
          </div>
        </aside>
      </div>
    </main>
  );
}
