import type { ResumeTemplate } from "@/types/template";

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "ats-classic",
    name: "ATS Classic",
    type: "ats",
    description: "Single column, heading jelas, tanpa elemen dekoratif.",
    bestFor: "Corporate, job portal, HR system"
  },
  {
    id: "ats-clean",
    name: "ATS Clean",
    type: "ats",
    description: "Spacing lega dan struktur sederhana untuk scanning ATS.",
    bestFor: "Fresh graduate, analyst, admin, general role"
  },
  {
    id: "ats-professional",
    name: "ATS Professional",
    type: "ats",
    description: "Tampilan formal dengan section compact untuk kandidat senior.",
    bestFor: "Manager, consultant, finance, enterprise role"
  },
  {
    id: "ats-compact",
    name: "ATS Compact",
    type: "ats",
    description: "Layout padat satu kolom untuk kandidat dengan pengalaman panjang.",
    bestFor: "Senior IC, operations, project manager"
  },
  {
    id: "ats-executive",
    name: "ATS Executive",
    type: "ats",
    description: "Header kiri yang tegas, section bernomor, dan hirarki formal.",
    bestFor: "Lead, head of department, director"
  },
  {
    id: "ats-minimal",
    name: "ATS Minimal",
    type: "ats",
    description: "Sangat bersih dengan whitespace luas dan teks mudah dipindai ATS.",
    bestFor: "Internship, fresh graduate, analyst"
  },
  {
    id: "modern-gray",
    name: "Modern Gray",
    type: "combination",
    description: "Layout modern dua kolom dengan aksen slate yang tetap kalem.",
    bestFor: "Startup, product, growth, marketing"
  },
  {
    id: "developer-resume",
    name: "Developer Resume",
    type: "combination",
    description: "Menonjolkan project, tech stack, GitHub, dan skill teknis.",
    bestFor: "Software engineer, Web3 developer, data engineer"
  },
  {
    id: "creative-minimal",
    name: "Creative Minimal",
    type: "combination",
    description: "Visual ringan untuk role kreatif tanpa mengorbankan keterbacaan.",
    bestFor: "Designer, content creator, community, creative tech"
  },
  {
    id: "startup-profile",
    name: "Startup Profile",
    type: "combination",
    description: "Profile card besar di atas, cocok untuk personal branding profesional.",
    bestFor: "Founder, product manager, growth, startup operator"
  },
  {
    id: "portfolio-showcase",
    name: "Portfolio Showcase",
    type: "combination",
    description: "Mengedepankan project dan achievement dalam layout showcase dua area.",
    bestFor: "Designer, developer, creator, consultant"
  },
  {
    id: "web3-profile",
    name: "Web3 Profile",
    type: "combination",
    description: "Layout split untuk developer Web3, security, smart contract, dan community role.",
    bestFor: "Web3 developer, protocol engineer, developer relations"
  }
];

export const getTemplateById = (id: string) =>
  resumeTemplates.find((template) => template.id === id) ?? resumeTemplates[0];
