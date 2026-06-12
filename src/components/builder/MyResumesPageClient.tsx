"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { resumeStorageService } from "@/services/storage/resume-storage.service";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import type { ResumeData } from "@/types/resume";

export function MyResumesPageClient() {
  const router = useRouter();
  const loadResume = useResumeBuilderStore((state) => state.loadResume);
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  function refresh() {
    setResumes(resumeStorageService.list());
  }

  useEffect(() => {
    refresh();
  }, []);

  function openResume(resume: ResumeData) {
    resumeStorageService.saveCurrent(resume);
    loadResume(resume);
    router.push("/builder");
  }

  function deleteResume(id: string) {
    resumeStorageService.delete(id);
    refresh();
  }

  function duplicateResume(id: string) {
    resumeStorageService.duplicate(id);
    refresh();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">My Resumes</h1>
          <p className="mt-2 text-slate-600">Resume disimpan sementara di localStorage browser.</p>
        </div>
        <Link href="/builder">
          <Button>Create New CV</Button>
        </Link>
      </div>
      {!resumes.length ? (
        <EmptyState
          title="Belum ada resume tersimpan"
          description="Mulai isi CV di builder, lalu klik Save CV."
          action={
            <Link href="/builder">
              <Button>Create My CV</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {resumes.map((resume) => (
            <div key={resume.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{resume.selectedTemplate}</p>
              <h2 className="mt-2 text-lg font-semibold">{resume.personalInfo.fullName || resume.title || "Untitled Resume"}</h2>
              <p className="mt-1 text-sm text-slate-600">{resume.personalInfo.jobTitle || "No target role yet"}</p>
              <p className="mt-3 text-xs text-slate-500">Updated {new Date(resume.updatedAt).toLocaleString()}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" onClick={() => openResume(resume)}>
                  Edit
                </Button>
                <Button type="button" variant="secondary" onClick={() => duplicateResume(resume.id)}>
                  Duplicate
                </Button>
                <Button type="button" variant="danger" onClick={() => deleteResume(resume.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
