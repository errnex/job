import { slugifyFileName } from "@/utils/text";
import type { ResumeData } from "@/types/resume";

export async function exportResumeToPdf(resume: ResumeData, element: HTMLElement) {
  const html2pdf = (await import("html2pdf.js")).default;
  const fileName = `cv-${slugifyFileName(resume.personalInfo.fullName)}.pdf`;

  await html2pdf()
    .set({
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"]
      }
    })
    .from(element)
    .save();

  return { success: true, fileName };
}
