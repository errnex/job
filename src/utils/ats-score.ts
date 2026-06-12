import type { ATSScoreResult, ATSSectionScore } from "@/types/ats";
import type { ResumeData } from "@/types/resume";
import { wordsFromText } from "./text";

const importantWords = new Set([
  "react",
  "next",
  "typescript",
  "javascript",
  "node",
  "api",
  "frontend",
  "backend",
  "fullstack",
  "web3",
  "solidity",
  "evm",
  "smart",
  "contract",
  "product",
  "design",
  "data",
  "cloud",
  "aws",
  "vercel",
  "leadership",
  "growth",
  "analytics",
  "testing"
]);

function section(
  label: string,
  score: number,
  maxScore: number,
  recommendation: string
): ATSSectionScore {
  return {
    label,
    score,
    maxScore,
    status: score === maxScore ? "good" : score === 0 ? "missing" : "warning",
    recommendation
  };
}

export function calculateATSScore(resume: ResumeData, jobDescription = ""): ATSScoreResult {
  const sections: ATSSectionScore[] = [];
  const contactComplete = [
    resume.personalInfo.fullName,
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location
  ].filter(Boolean).length;
  const contactScore = contactComplete >= 4 ? 15 : contactComplete >= 2 ? 8 : 0;
  sections.push(section("Contact info", contactScore, 15, "Lengkapi nama, email, phone, dan lokasi."));

  const summaryScore = resume.summary.trim().length > 80 ? 10 : resume.summary.trim() ? 5 : 0;
  sections.push(section("Professional summary", summaryScore, 10, "Tulis ringkasan 3-4 kalimat yang spesifik."));

  const experienceScore =
    resume.experiences.length > 0
      ? resume.experiences.some((item) => item.description.includes("\n"))
        ? 20
        : 14
      : 0;
  sections.push(section("Work experience", experienceScore, 20, "Gunakan bullet achievement berbasis impact."));

  const educationScore = resume.education.length > 0 ? 10 : 0;
  sections.push(section("Education", educationScore, 10, "Tambahkan pendidikan terakhir yang relevan."));

  const skillsScore = resume.skills.length >= 8 ? 15 : resume.skills.length >= 4 ? 10 : resume.skills.length ? 5 : 0;
  sections.push(section("Skills", skillsScore, 15, "Tambahkan hard skills yang sesuai target role."));

  const proofScore = resume.projects.length || resume.certifications.length ? 10 : 0;
  sections.push(section("Projects or certifications", proofScore, 10, "Tambahkan project atau sertifikasi sebagai bukti kompetensi."));

  const jdWords = wordsFromText(jobDescription).filter((word) => importantWords.has(word));
  const resumeText = wordsFromText(JSON.stringify(resume));
  const uniqueJdWords = Array.from(new Set(jdWords));
  const matchedKeywords = uniqueJdWords.filter((word) => resumeText.includes(word));
  const missingKeywords = uniqueJdWords.filter((word) => !resumeText.includes(word));
  const keywordScore =
    uniqueJdWords.length === 0 ? 12 : Math.round((matchedKeywords.length / uniqueJdWords.length) * 20);
  sections.push(section("Keyword match", keywordScore, 20, "Sesuaikan keyword dengan job description."));

  const score = Math.min(
    100,
    sections.reduce((total, item) => total + item.score, 0)
  );

  const recommendations = sections
    .filter((item) => item.status !== "good")
    .map((item) => item.recommendation);

  return {
    score,
    missingKeywords,
    matchedKeywords,
    sections,
    recommendations
  };
}
