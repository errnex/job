"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { useResumeBuilderStore } from "@/store/resume-builder.store";
import { FormShell } from "./FormShell";

export function CertificationForm() {
  const certifications = useResumeBuilderStore((state) => state.resumeData.certifications);
  const addCertification = useResumeBuilderStore((state) => state.addCertification);
  const updateCertification = useResumeBuilderStore((state) => state.updateCertification);
  const removeCertification = useResumeBuilderStore((state) => state.removeCertification);

  return (
    <FormShell title="Certifications">
      <div className="space-y-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Link sertifikasi bersifat opsional dan boleh dikosongkan.
        </p>
        {certifications.map((item) => (
          <div key={item.id} className="grid gap-3 rounded-md border border-slate-200 p-3 sm:grid-cols-2">
            <Input label="Certification Name" value={item.name} onChange={(event) => updateCertification(item.id, { name: event.target.value })} />
            <Input label="Issuer" value={item.issuer} onChange={(event) => updateCertification(item.id, { issuer: event.target.value })} />
            <Input label="Year" value={item.year} onChange={(event) => updateCertification(item.id, { year: event.target.value })} />
            <Input label="Link optional" value={item.link} onChange={(event) => updateCertification(item.id, { link: event.target.value })} />
            <Button type="button" variant="ghost" onClick={() => removeCertification(item.id)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addCertification}>
          Add Certification
        </Button>
      </div>
    </FormShell>
  );
}
