"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function ProjectForm() {
  const projects = useResumeBuilderStore((state) => state.resumeData.projects);
  const addProject = useResumeBuilderStore((state) => state.addProject);
  const updateProject = useResumeBuilderStore((state) => state.updateProject);
  const removeProject = useResumeBuilderStore((state) => state.removeProject);

  return (
    <FormShell title="Projects">
      <div className="space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Link project bersifat opsional. Kamu bisa mengosongkannya jika project belum punya URL publik.
        </p>
        {projects.map((item, index) => (
          <div key={item.id} className="rounded-md border border-slate-200 p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Project {index + 1}</p>
              <Button type="button" variant="ghost" onClick={() => removeProject(item.id)}>
                Remove
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Project Name" value={item.projectName} onChange={(event) => updateProject(item.id, { projectName: event.target.value })} />
              <Input label="Role" value={item.role} onChange={(event) => updateProject(item.id, { role: event.target.value })} />
              <Input label="Tech Stack" value={item.techStack} onChange={(event) => updateProject(item.id, { techStack: event.target.value })} />
              <Input label="Link optional" value={item.link} onChange={(event) => updateProject(item.id, { link: event.target.value })} />
            </div>
            <Textarea
              className="mt-3"
              label="Description / Bullet Points"
              value={item.description}
              onChange={(event) => updateProject(item.id, { description: event.target.value })}
            />
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addProject}>
          Add Project
        </Button>
      </div>
    </FormShell>
  );
}
