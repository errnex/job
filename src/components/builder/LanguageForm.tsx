"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function LanguageForm() {
  const languages = useResumeBuilderStore((state) => state.resumeData.languages);
  const addLanguage = useResumeBuilderStore((state) => state.addLanguage);
  const updateLanguage = useResumeBuilderStore((state) => state.updateLanguage);
  const removeLanguage = useResumeBuilderStore((state) => state.removeLanguage);

  return (
    <FormShell title="Languages">
      <div className="space-y-3">
        {languages.map((item) => (
          <div key={item.id} className="grid gap-3 rounded-md border border-slate-200 p-3 sm:grid-cols-[1fr_1fr_auto]">
            <Input label="Language" value={item.language} onChange={(event) => updateLanguage(item.id, { language: event.target.value })} />
            <Input label="Proficiency" value={item.proficiency} onChange={(event) => updateLanguage(item.id, { proficiency: event.target.value })} />
            <Button type="button" variant="ghost" className="self-end" onClick={() => removeLanguage(item.id)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addLanguage}>
          Add Language
        </Button>
      </div>
    </FormShell>
  );
}
