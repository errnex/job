"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { exportResumeToDocx } from "@/services/export/docx-export.service";
import { exportResumeToPdf } from "@/services/export/pdf-export.service";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { getResumeWarnings } from "@/utils/resume-validation";
import { ErrorState } from "@/components/shared/ErrorState";

export function DownloadButtons() {
  const resume = useResumeBuilderStore((state) => state.resumeData);
  const [error, setError] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const warnings = getResumeWarnings(resume);
  const canDownload = warnings.length === 0;

  async function handlePdf() {
    setError("");
    const element = document.querySelector("#resume-preview-export .resume-page") as HTMLElement | null;
    if (!element) {
      setError("Preview belum tersedia untuk diexport.");
      return;
    }

    try {
      setIsExporting(true);
      await exportResumeToPdf(resume, element);
    } catch {
      setError("PDF export failed. Coba gunakan browser print atau refresh halaman.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleDocx() {
    setError("");
    try {
      setIsExporting(true);
      await exportResumeToDocx(resume);
    } catch {
      setError("DOCX export failed. Periksa data CV lalu coba lagi.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="space-y-3">
      {warnings.length ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <p className="font-medium">Lengkapi data sebelum download:</p>
          <ul className="mt-1 list-disc pl-5">
            {warnings.slice(0, 4).map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {error ? <ErrorState message={error} /> : null}
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={handlePdf} disabled={!canDownload || isExporting}>
          <Download size={16} />
          Download PDF
        </Button>
        <Button type="button" variant="secondary" onClick={handleDocx} disabled={!canDownload || isExporting}>
          <FileText size={16} />
          Download DOCX
        </Button>
      </div>
    </div>
  );
}
