"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function ExperienceForm() {
  const experiences = useResumeBuilderStore((state) => state.resumeData.experiences);
  const addExperience = useResumeBuilderStore((state) => state.addExperience);
  const updateExperience = useResumeBuilderStore((state) => state.updateExperience);
  const removeExperience = useResumeBuilderStore((state) => state.removeExperience);

  return (
    <FormShell title="Work Experience">
      <div className="space-y-4">
        {experiences.map((item, index) => (
          <div key={item.id} className="rounded-md border border-slate-200 p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Experience {index + 1}</p>
              <Button type="button" variant="ghost" onClick={() => removeExperience(item.id)}>
                Remove
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Company Name" value={item.companyName} onChange={(event) => updateExperience(item.id, { companyName: event.target.value })} />
              <Input label="Position" value={item.position} onChange={(event) => updateExperience(item.id, { position: event.target.value })} />
              <Input label="Location" value={item.location} onChange={(event) => updateExperience(item.id, { location: event.target.value })} />
              <Input label="Start Date" type="month" value={item.startDate} onChange={(event) => updateExperience(item.id, { startDate: event.target.value })} />
              <Input
                label="End Date"
                type="month"
                value={item.endDate}
                disabled={item.currentlyWorking}
                onChange={(event) => updateExperience(item.id, { endDate: event.target.value })}
              />
              <label className="flex items-center gap-2 pt-7 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={item.currentlyWorking}
                  onChange={(event) => updateExperience(item.id, { currentlyWorking: event.target.checked })}
                />
                Currently Working
              </label>
            </div>
            <Textarea
              className="mt-3"
              label="Description / Bullet Points"
              value={item.description}
              onChange={(event) => updateExperience(item.id, { description: event.target.value })}
              placeholder="- Improved conversion by 20%\n- Built internal dashboard with Next.js"
            />
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addExperience}>
          Add Experience
        </Button>
      </div>
    </FormShell>
  );
}
