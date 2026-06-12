"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

const categoryOptions = [
  { value: "Technical Skills", label: "Technical Skills" },
  { value: "Soft Skills", label: "Soft Skills" },
  { value: "Tools", label: "Tools" },
  { value: "Languages", label: "Languages" },
  { value: "Web3 Skills", label: "Web3 Skills" }
];

export function SkillForm() {
  const skills = useResumeBuilderStore((state) => state.resumeData.skills);
  const addSkill = useResumeBuilderStore((state) => state.addSkill);
  const updateSkill = useResumeBuilderStore((state) => state.updateSkill);
  const removeSkill = useResumeBuilderStore((state) => state.removeSkill);

  return (
    <FormShell title="Skills">
      <div className="space-y-3">
        {skills.map((item) => (
          <div key={item.id} className="grid gap-3 rounded-md border border-slate-200 p-3 sm:grid-cols-[1fr_180px_auto]">
            <Input label="Skill name" value={item.name} onChange={(event) => updateSkill(item.id, { name: event.target.value })} />
            <Select label="Category" value={item.category} options={categoryOptions} onChange={(event) => updateSkill(item.id, { category: event.target.value })} />
            <Button type="button" variant="ghost" className="self-end" onClick={() => removeSkill(item.id)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addSkill}>
          Add Skill
        </Button>
      </div>
    </FormShell>
  );
}
