import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  TextRun
} from "docx";
import type { ResumeData } from "@/types/resume";
import { slugifyFileName, splitLines } from "@/utils/text";
import { downloadBlob } from "./download";

const heading = (text: string) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 80 },
    border: {
      bottom: {
        color: "CBD5E1",
        size: 4,
        style: BorderStyle.SINGLE
      }
    }
  });

const body = (text: string) =>
  new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { after: 90 }
  });

const bullet = (text: string) =>
  new Paragraph({
    children: [new TextRun({ text, size: 21 })],
    bullet: { level: 0 },
    spacing: { after: 60 }
  });

function addBullets(value: string) {
  return splitLines(value).map((line) => bullet(line.replace(/^[-*]\s*/, "")));
}

function dataUrlToImage(dataUrl: string) {
  const match = dataUrl.match(/^data:image\/(png|jpe?g|gif|bmp);base64,(.+)$/i);
  if (!match) return null;

  const imageType = match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return {
    data: bytes,
    type: imageType as "jpg" | "png" | "gif" | "bmp"
  };
}

function createPhotoParagraph(resume: ResumeData) {
  if (!resume.settings.showPhoto || !resume.personalInfo.photo) return null;

  const image = dataUrlToImage(resume.personalInfo.photo);
  if (!image) return null;

  return new Paragraph({
    children: [
      new ImageRun({
        data: image.data,
        type: image.type,
        transformation: {
          width: 96,
          height: 96
        },
        altText: {
          title: "Profile photo",
          description: "Resume profile photo",
          name: "Profile photo"
        }
      })
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 }
  });
}

export async function exportResumeToDocx(resume: ResumeData) {
  const fullName = resume.personalInfo.fullName || "Resume";
  const contact = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.linkedin,
    resume.personalInfo.github,
    resume.personalInfo.portfolio
  ]
    .filter(Boolean)
    .join(" | ");

  const photoParagraph = createPhotoParagraph(resume);
  const sections: Paragraph[] = [
    ...(photoParagraph ? [photoParagraph] : []),
    new Paragraph({
      children: [new TextRun({ text: fullName, bold: true, size: 36 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: resume.personalInfo.jobTitle, size: 24 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: contact, size: 20 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 }
    })
  ];

  if (resume.summary) {
    sections.push(heading("Professional Summary"), body(resume.summary));
  }

  if (resume.experiences.length) {
    sections.push(heading("Work Experience"));
    resume.experiences.forEach((item) => {
      sections.push(
        body(
          `${item.position || "Position"} - ${item.companyName || "Company"}${
            item.location ? `, ${item.location}` : ""
          } (${item.startDate || "Start"} - ${item.currentlyWorking ? "Present" : item.endDate || "End"})`
        ),
        ...addBullets(item.description)
      );
    });
  }

  if (resume.education.length) {
    sections.push(heading("Education"));
    resume.education.forEach((item) => {
      sections.push(
        body(
          `${item.degree || "Degree"} ${item.major ? `in ${item.major}` : ""} - ${
            item.institution || "Institution"
          } (${item.startYear || "Start"} - ${item.endYear || "End"})`
        )
      );
      if (item.gpa) sections.push(body(`GPA: ${item.gpa}`));
      if (item.description) sections.push(...addBullets(item.description));
    });
  }

  if (resume.projects.length) {
    sections.push(heading("Projects"));
    resume.projects.forEach((item) => {
      sections.push(body(`${item.projectName || "Project"}${item.techStack ? ` | ${item.techStack}` : ""}`));
      if (item.role) sections.push(body(`Role: ${item.role}`));
      if (item.link) sections.push(body(item.link));
      sections.push(...addBullets(item.description));
    });
  }

  if (resume.skills.length) {
    sections.push(heading("Skills"));
    const grouped = resume.skills.reduce<Record<string, string[]>>((acc, skill) => {
      const key = skill.category || "Skills";
      acc[key] = [...(acc[key] ?? []), skill.name].filter(Boolean);
      return acc;
    }, {});
    Object.entries(grouped).forEach(([category, skills]) => {
      sections.push(body(`${category}: ${skills.join(", ")}`));
    });
  }

  if (resume.certifications.length) {
    sections.push(heading("Certifications"));
    resume.certifications.forEach((item) => {
      sections.push(body(`${item.name || "Certification"} - ${item.issuer || "Issuer"} ${item.year ? `(${item.year})` : ""}`));
      if (item.link) sections.push(body(item.link));
    });
  }

  if (resume.languages.length) {
    sections.push(heading("Languages"));
    resume.languages.forEach((item) => sections.push(body(`${item.language}: ${item.proficiency}`)));
  }

  if (resume.achievements.length) {
    sections.push(heading("Achievements"));
    resume.achievements.forEach((item) => {
      sections.push(body(`${item.title}${item.year ? ` (${item.year})` : ""}`));
      if (item.description) sections.push(...addBullets(item.description));
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `cv-${slugifyFileName(fullName)}.docx`;
  downloadBlob(blob, fileName);
  return { success: true, fileName };
}
