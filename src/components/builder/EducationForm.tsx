"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function EducationForm() {
  const education = useResumeBuilderStore((state) => state.resumeData.education);
  const addEducation = useResumeBuilderStore((state) => state.addEducation);
  const updateEducation = useResumeBuilderStore((state) => state.updateEducation);
  const removeEducation = useResumeBuilderStore((state) => state.removeEducation);

  return (
    <FormShell title="Education">
      <div className="space-y-4">
        {education.map((item, index) => (
          <div key={item.id} className="rounded-md border border-slate-200 p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Education {index + 1}</p>
              <Button type="button" variant="ghost" onClick={() => removeEducation(item.id)}>
                Remove
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Institution" value={item.institution} onChange={(event) => updateEducation(item.id, { institution: event.target.value })} />
              <Input label="Degree" value={item.degree} onChange={(event) => updateEducation(item.id, { degree: event.target.value })} />
              <Input label="Major" value={item.major} onChange={(event) => updateEducation(item.id, { major: event.target.value })} />
              <Input label="Start Year" value={item.startYear} onChange={(event) => updateEducation(item.id, { startYear: event.target.value })} />
              <Input label="End Year" value={item.endYear} onChange={(event) => updateEducation(item.id, { endYear: event.target.value })} />
              <Input label="GPA optional" value={item.gpa} onChange={(event) => updateEducation(item.id, { gpa: event.target.value })} />
            </div>
            <Textarea
              className="mt-3"
              label="Description optional"
              value={item.description}
              onChange={(event) => updateEducation(item.id, { description: event.target.value })}
            />
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addEducation}>
          Add Education
        </Button>
      </div>
    </FormShell>
  );
}
