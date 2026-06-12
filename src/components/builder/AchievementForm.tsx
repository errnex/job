"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function AchievementForm() {
  const achievements = useResumeBuilderStore((state) => state.resumeData.achievements);
  const addAchievement = useResumeBuilderStore((state) => state.addAchievement);
  const updateAchievement = useResumeBuilderStore((state) => state.updateAchievement);
  const removeAchievement = useResumeBuilderStore((state) => state.removeAchievement);

  return (
    <FormShell title="Achievements">
      <div className="space-y-4">
        {achievements.map((item, index) => (
          <div key={item.id} className="rounded-md border border-slate-200 p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Achievement {index + 1}</p>
              <Button type="button" variant="ghost" onClick={() => removeAchievement(item.id)}>
                Remove
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Achievement title" value={item.title} onChange={(event) => updateAchievement(item.id, { title: event.target.value })} />
              <Input label="Year optional" value={item.year} onChange={(event) => updateAchievement(item.id, { year: event.target.value })} />
            </div>
            <Textarea
              className="mt-3"
              label="Description"
              value={item.description}
              onChange={(event) => updateAchievement(item.id, { description: event.target.value })}
            />
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addAchievement}>
          Add Achievement
        </Button>
      </div>
    </FormShell>
  );
}
