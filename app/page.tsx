import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { resumeTemplates } from "@/data/templates";

const features = [
  "Live preview dari data form",
  "Download PDF dan DOCX",
  "ATS checker sederhana",
  "LocalStorage autosave",
  "AI assistant optional multi-provider",
  "12 template ATS dan modern"
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_480px] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">ATS & Modern Resume Generator</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Buat CV ATS-Friendly dan Modern dalam Hitungan Menit
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Isi data diri, pilih template, preview hasilnya, lalu download dalam format PDF atau DOCX. Cocok untuk fresh graduate,
              developer, profesional, dan kandidat Web3.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/builder">
                <Button>
                  Create My CV
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="secondary">View Templates</Button>
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mx-auto aspect-[210/297] max-w-sm rounded-md bg-white p-8 shadow-soft">
              <div className="h-5 w-44 rounded bg-slate-950" />
              <div className="mt-2 h-3 w-32 rounded bg-blue-600" />
              <div className="mt-5 space-y-2">
                <div className="h-2 rounded bg-slate-200" />
                <div className="h-2 rounded bg-slate-200" />
                <div className="h-2 w-3/4 rounded bg-slate-200" />
              </div>
              {["Professional Summary", "Work Experience", "Projects", "Skills"].map((item) => (
                <div key={item} className="mt-6">
                  <div className="mb-3 h-3 w-36 rounded bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-2 rounded bg-slate-200" />
                    <div className="h-2 rounded bg-slate-200" />
                    <div className="h-2 w-5/6 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5">
              <CheckCircle2 className="mb-3 text-emerald-600" size={22} />
              <p className="font-medium text-slate-950 dark:text-white">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Template CV</h2>
              <p className="mt-2 text-slate-600">Pilih ATS Friendly atau Combination CV sesuai target lamaran.</p>
            </div>
            <Link href="/templates" className="text-sm font-medium text-blue-700">
              See all templates
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {resumeTemplates.slice(0, 3).map((template) => (
              <div key={template.id} className="rounded-lg border border-slate-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{template.type}</p>
                <h3 className="mt-2 text-lg font-semibold">{template.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <FileText className="mb-4 text-blue-700" />
          <h2 className="text-xl font-semibold">Kenapa ATS penting?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Banyak perusahaan memakai sistem ATS untuk membaca struktur CV. Layout satu kolom, heading jelas, dan keyword relevan
            membantu CV lebih mudah diproses.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <Download className="mb-4 text-emerald-700" />
          <h2 className="text-xl font-semibold">Export siap kirim</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Download PDF untuk apply cepat dan DOCX untuk edit manual lebih lanjut.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <Sparkles className="mb-4 text-slate-900" />
          <h2 className="text-xl font-semibold">AI optional</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Jika API key tersedia, AI dapat memperbaiki summary, bullet, translate, match job description, dan fallback antar provider.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
        CV Builder ATS & Modern Resume Generator. Built for Vercel.
      </footer>
    </main>
  );
}
