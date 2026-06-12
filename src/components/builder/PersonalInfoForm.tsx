"use client";

import { Input } from "@/components/shared/Input";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function PersonalInfoForm() {
  const personalInfo = useResumeBuilderStore((state) => state.resumeData.personalInfo);
  const updatePersonalInfo = useResumeBuilderStore((state) => state.updatePersonalInfo);

  function handlePhoto(file?: File) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updatePersonalInfo({ photo: String(reader.result || "") });
    reader.readAsDataURL(file);
  }

  return (
    <FormShell title="Personal Information">
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
        LinkedIn, GitHub, portfolio, dan foto bersifat opsional.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Full Name" value={personalInfo.fullName} onChange={(event) => updatePersonalInfo({ fullName: event.target.value })} />
        <Input label="Job Title" value={personalInfo.jobTitle} onChange={(event) => updatePersonalInfo({ jobTitle: event.target.value })} />
        <Input label="Email" type="email" value={personalInfo.email} onChange={(event) => updatePersonalInfo({ email: event.target.value })} />
        <Input label="Phone" value={personalInfo.phone} onChange={(event) => updatePersonalInfo({ phone: event.target.value })} />
        <Input label="Location" value={personalInfo.location} onChange={(event) => updatePersonalInfo({ location: event.target.value })} />
        <Input label="LinkedIn optional" value={personalInfo.linkedin} onChange={(event) => updatePersonalInfo({ linkedin: event.target.value })} />
        <Input label="GitHub optional" value={personalInfo.github} onChange={(event) => updatePersonalInfo({ github: event.target.value })} />
        <Input label="Portfolio Website optional" value={personalInfo.portfolio} onChange={(event) => updatePersonalInfo({ portfolio: event.target.value })} />
        <Input label="Photo upload optional" type="file" accept="image/*" onChange={(event) => handlePhoto(event.target.files?.[0])} />
      </div>
    </FormShell>
  );
}
