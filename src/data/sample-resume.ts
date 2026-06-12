import type { ResumeData } from "@/types/resume";

export const sampleResume: ResumeData = {
  id: "sample-resume",
  title: "Sample Resume",
  personalInfo: {
    fullName: "Nadia Pratama",
    jobTitle: "Senior Fullstack Developer",
    email: "nadia@email.com",
    phone: "+62 812 0000 0000",
    location: "Jakarta, Indonesia",
    linkedin: "linkedin.com/in/nadiapratama",
    github: "github.com/nadiapratama",
    portfolio: "nadiapratama.dev",
    photo: ""
  },
  summary:
    "Fullstack developer dengan pengalaman membangun aplikasi SaaS, dashboard data, dan integrasi API. Terbiasa bekerja dengan product team, memperbaiki performa, dan menulis dokumentasi teknis yang mudah dipahami.",
  experiences: [
    {
      id: "sample-exp-1",
      companyName: "Lentera Digital",
      position: "Senior Fullstack Developer",
      location: "Jakarta",
      startDate: "2022-02",
      endDate: "",
      currentlyWorking: true,
      description:
        "- Membangun platform internal berbasis Next.js dan TypeScript\n- Mengurangi waktu load dashboard dari 4.2s menjadi 1.6s\n- Memimpin review arsitektur API untuk modul billing"
    },
    {
      id: "sample-exp-2",
      companyName: "Awan Studio",
      position: "Frontend Engineer",
      location: "Bandung",
      startDate: "2020-01",
      endDate: "2022-01",
      currentlyWorking: false,
      description:
        "- Membuat design system reusable untuk 8 produk web\n- Berkolaborasi dengan UI/UX designer untuk meningkatkan completion rate form\n- Menulis test dasar untuk komponen kritikal"
    }
  ],
  education: [
    {
      id: "sample-edu-1",
      institution: "Universitas Indonesia",
      degree: "Bachelor",
      major: "Computer Science",
      startYear: "2016",
      endYear: "2020",
      gpa: "3.72",
      description: "Aktif di komunitas programming dan lomba produk digital."
    }
  ],
  projects: [
    {
      id: "sample-project-1",
      projectName: "Resume Intelligence Dashboard",
      role: "Lead Developer",
      techStack: "Next.js, PostgreSQL, OpenAI API",
      link: "resume-dashboard.dev",
      description:
        "- Membuat scoring ATS deterministic dan AI feedback\n- Mendesain export PDF/DOCX untuk kebutuhan kandidat"
    },
    {
      id: "sample-project-2",
      projectName: "Web3 Grant Tracker",
      role: "Fullstack Developer",
      techStack: "React, Solidity, Ethers",
      link: "github.com/nadia/grant-tracker",
      description:
        "- Membuat tracker proposal grant dan milestone\n- Menghubungkan wallet user dengan data on-chain"
    }
  ],
  skills: [
    { id: "skill-1", name: "TypeScript", category: "Technical Skills" },
    { id: "skill-2", name: "Next.js", category: "Technical Skills" },
    { id: "skill-3", name: "Node.js", category: "Technical Skills" },
    { id: "skill-4", name: "PostgreSQL", category: "Technical Skills" },
    { id: "skill-5", name: "Solidity", category: "Web3 Skills" },
    { id: "skill-6", name: "Figma", category: "Tools" },
    { id: "skill-7", name: "Product Thinking", category: "Soft Skills" },
    { id: "skill-8", name: "English", category: "Languages" }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Cloud Developer Associate",
      issuer: "Example Cloud",
      year: "2024",
      link: "example.com/cert/nadia"
    }
  ],
  languages: [
    { id: "lang-1", language: "Bahasa Indonesia", proficiency: "Native" },
    { id: "lang-2", language: "English", proficiency: "Professional" }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Top 10 Product Hackathon",
      description: "- Membangun prototype hiring automation dalam 48 jam",
      year: "2023"
    }
  ],
  selectedTemplate: "ats-classic",
  selectedType: "ats",
  settings: {
    fontSize: "small",
    pageMargin: "compact",
    showPhoto: true,
    visibleSections: {
      summary: true,
      experience: true,
      education: true,
      projects: true,
      skills: true,
      certifications: true,
      languages: true,
      achievements: true
    }
  },
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};
