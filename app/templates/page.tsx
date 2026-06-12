import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { resumeTemplates } from "@/data/templates";
import { sampleResume } from "@/data/sample-resume";
import { renderResumeTemplate } from "@/components/templates/render-template";

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">Template Gallery</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Pilih template CV</h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
            Semua kartu di bawah menampilkan contoh resume asli dengan lorem ipsum/sample data, bukan skeleton. Pilih template dari
            halaman builder untuk memakai layout yang sama pada data CV kamu.
          </p>
        </div>
        <Link href="/builder">
          <Button>Create with this app</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {resumeTemplates.map((template) => {
          const previewResume = {
            ...sampleResume,
            selectedTemplate: template.id,
            selectedType: template.type
          };

          return (
            <div key={template.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 h-[520px] overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
                <div className="origin-top-left scale-[0.235]">
                  {renderResumeTemplate(previewResume)}
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {template.type === "ats" ? "ATS Friendly CV" : "Combination CV"}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{template.name}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{template.description}</p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Best for: {template.bestFor}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
