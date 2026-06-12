import type { ReactNode } from "react";
import type { ResumeData } from "@/types/resume";
import { cn } from "@/lib/cn";
import { splitLines } from "@/utils/text";

export type TemplateVariant =
  | "classic"
  | "clean"
  | "professional"
  | "compact"
  | "executive"
  | "minimal"
  | "modern"
  | "developer"
  | "creative"
  | "startup"
  | "portfolio"
  | "web3";

type TemplateProps = {
  resume: ResumeData;
  variant: TemplateVariant;
};

const fontSizeClass = {
  small: "text-[12px]",
  medium: "text-[13px]",
  large: "text-[14px]"
};

const marginClass = {
  compact: "p-8",
  normal: "p-10",
  wide: "p-12"
};

const variantStyles: Record<
  TemplateVariant,
  {
    accent: string;
    accentBg: string;
    heading: string;
    muted: string;
    divider: string;
  }
> = {
  classic: {
    accent: "text-slate-950",
    accentBg: "bg-slate-950",
    heading: "uppercase tracking-[0.16em] text-slate-950",
    muted: "text-slate-600",
    divider: "border-slate-300"
  },
  clean: {
    accent: "text-slate-800",
    accentBg: "bg-slate-800",
    heading: "uppercase tracking-[0.12em] text-slate-700",
    muted: "text-slate-500",
    divider: "border-slate-200"
  },
  professional: {
    accent: "text-slate-950",
    accentBg: "bg-slate-950",
    heading: "uppercase tracking-[0.18em] text-slate-950",
    muted: "text-slate-600",
    divider: "border-slate-950"
  },
  compact: {
    accent: "text-slate-900",
    accentBg: "bg-slate-900",
    heading: "uppercase tracking-[0.12em] text-slate-900",
    muted: "text-slate-500",
    divider: "border-slate-200"
  },
  executive: {
    accent: "text-blue-800",
    accentBg: "bg-blue-800",
    heading: "uppercase tracking-[0.16em] text-blue-800",
    muted: "text-slate-600",
    divider: "border-blue-200"
  },
  minimal: {
    accent: "text-slate-700",
    accentBg: "bg-slate-700",
    heading: "uppercase tracking-[0.22em] text-slate-600",
    muted: "text-slate-500",
    divider: "border-slate-200"
  },
  modern: {
    accent: "text-blue-700",
    accentBg: "bg-blue-700",
    heading: "uppercase tracking-[0.14em] text-blue-700",
    muted: "text-slate-500",
    divider: "border-blue-200"
  },
  developer: {
    accent: "text-emerald-700",
    accentBg: "bg-emerald-700",
    heading: "uppercase tracking-[0.14em] text-emerald-700",
    muted: "text-slate-500",
    divider: "border-emerald-200"
  },
  creative: {
    accent: "text-slate-900",
    accentBg: "bg-slate-900",
    heading: "uppercase tracking-[0.18em] text-slate-700",
    muted: "text-slate-500",
    divider: "border-slate-200"
  },
  startup: {
    accent: "text-cyan-700",
    accentBg: "bg-cyan-700",
    heading: "uppercase tracking-[0.16em] text-cyan-700",
    muted: "text-slate-500",
    divider: "border-cyan-200"
  },
  portfolio: {
    accent: "text-violet-700",
    accentBg: "bg-violet-700",
    heading: "uppercase tracking-[0.16em] text-violet-700",
    muted: "text-slate-500",
    divider: "border-violet-200"
  },
  web3: {
    accent: "text-indigo-700",
    accentBg: "bg-indigo-700",
    heading: "uppercase tracking-[0.16em] text-indigo-700",
    muted: "text-slate-500",
    divider: "border-indigo-200"
  }
};

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "CV"
  );
}

function PhotoBlock({
  resume,
  variant,
  className
}: {
  resume: ResumeData;
  variant: TemplateVariant;
  className?: string;
}) {
  if (!resume.settings.showPhoto) return null;

  if (resume.personalInfo.photo) {
    return <img src={resume.personalInfo.photo} alt="" className={cn("h-24 w-24 rounded-md object-cover", className)} />;
  }

  return (
    <div
      className={cn(
        "flex h-24 w-24 items-center justify-center rounded-md text-xl font-bold text-white",
        variantStyles[variant].accentBg,
        className
      )}
    >
      {getInitials(resume.personalInfo.fullName || "Your Name")}
    </div>
  );
}

function ContactLine({ resume, variant, stacked = false }: TemplateProps & { stacked?: boolean }) {
  const contact = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.linkedin,
    resume.personalInfo.github,
    resume.personalInfo.portfolio
  ].filter(Boolean);

  if (!contact.length) return null;

  if (stacked) {
    return (
      <div className={cn("space-y-1 break-words leading-relaxed", variantStyles[variant].muted)}>
        {contact.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    );
  }

  return <p className={cn("mt-2 break-words leading-relaxed", variantStyles[variant].muted)}>{contact.join(" | ")}</p>;
}

function Section({
  title,
  children,
  variant,
  compact = false
}: {
  title: string;
  children: ReactNode;
  variant: TemplateVariant;
  compact?: boolean;
}) {
  const styles = variantStyles[variant];

  return (
    <section className="break-inside-avoid">
      <h2 className={cn("mb-2 border-b pb-1 text-[11px] font-bold", styles.heading, styles.divider)}>{title}</h2>
      <div className={cn(compact ? "space-y-1.5" : "space-y-2.5")}>{children}</div>
    </section>
  );
}

function Bullets({ value }: { value: string }) {
  const lines = splitLines(value);
  if (!lines.length) return null;

  return (
    <ul className="list-disc space-y-1 pl-4">
      {lines.map((line, index) => (
        <li key={`${line}-${index}`}>{line.replace(/^[-*]\s*/, "")}</li>
      ))}
    </ul>
  );
}

function SummarySection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.summary || !resume.summary.trim()) return null;
  return (
    <Section title="Professional Summary" variant={variant} compact={compact}>
      <p className="leading-relaxed">{resume.summary}</p>
    </Section>
  );
}

function ExperienceSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.experience || !resume.experiences.length) return null;
  return (
    <Section title="Work Experience" variant={variant} compact={compact}>
      {resume.experiences.map((item) => (
        <div key={item.id} className="break-inside-avoid">
          <div className="flex flex-wrap justify-between gap-2">
            <p className="font-semibold">
              {item.position || "Position"} - {item.companyName || "Company"}
            </p>
            <p className={variantStyles[variant].muted}>
              {item.startDate || "Start"} - {item.currentlyWorking ? "Present" : item.endDate || "End"}
            </p>
          </div>
          {item.location ? <p className={variantStyles[variant].muted}>{item.location}</p> : null}
          <Bullets value={item.description} />
        </div>
      ))}
    </Section>
  );
}

function EducationSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.education || !resume.education.length) return null;
  return (
    <Section title="Education" variant={variant} compact={compact}>
      {resume.education.map((item) => (
        <div key={item.id} className="break-inside-avoid">
          <p className="font-semibold">{item.institution || "Institution"}</p>
          <p>
            {[item.degree, item.major].filter(Boolean).join(" in ")}
            {item.gpa ? ` | GPA ${item.gpa}` : ""}
          </p>
          <p className={variantStyles[variant].muted}>{[item.startYear, item.endYear].filter(Boolean).join(" - ")}</p>
          <Bullets value={item.description} />
        </div>
      ))}
    </Section>
  );
}

function ProjectsSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.projects || !resume.projects.length) return null;
  return (
    <Section title="Projects" variant={variant} compact={compact}>
      {resume.projects.map((item) => (
        <div key={item.id} className="break-inside-avoid">
          <p className="font-semibold">{item.projectName || "Project"}</p>
          <p className={variantStyles[variant].muted}>{[item.role, item.techStack].filter(Boolean).join(" | ")}</p>
          {item.link ? <p className={cn("break-all", variantStyles[variant].accent)}>{item.link}</p> : null}
          <Bullets value={item.description} />
        </div>
      ))}
    </Section>
  );
}

function SkillsSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.skills || !resume.skills.length) return null;
  const grouped = resume.skills.reduce<Record<string, string[]>>((acc, skill) => {
    const key = skill.category || "Skills";
    if (skill.name) acc[key] = [...(acc[key] ?? []), skill.name];
    return acc;
  }, {});

  return (
    <Section title="Skills" variant={variant} compact={compact}>
      {Object.entries(grouped).map(([category, skills]) => (
        <p key={category}>
          <span className="font-semibold">{category}:</span> {skills.join(", ")}
        </p>
      ))}
    </Section>
  );
}

function CertificationsSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.certifications || !resume.certifications.length) return null;
  return (
    <Section title="Certifications" variant={variant} compact={compact}>
      {resume.certifications.map((item) => (
        <p key={item.id}>
          <span className="font-semibold">{item.name || "Certification"}</span>
          {item.issuer ? ` - ${item.issuer}` : ""}
          {item.year ? ` (${item.year})` : ""}
          {item.link ? <span className={cn("block break-all", variantStyles[variant].accent)}>{item.link}</span> : null}
        </p>
      ))}
    </Section>
  );
}

function LanguagesSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.languages || !resume.languages.length) return null;
  return (
    <Section title="Languages" variant={variant} compact={compact}>
      {resume.languages.map((item) => (
        <p key={item.id}>
          <span className="font-semibold">{item.language || "Language"}:</span> {item.proficiency}
        </p>
      ))}
    </Section>
  );
}

function AchievementsSection({ resume, variant, compact }: TemplateProps & { compact?: boolean }) {
  if (!resume.settings.visibleSections.achievements || !resume.achievements.length) return null;
  return (
    <Section title="Achievements" variant={variant} compact={compact}>
      {resume.achievements.map((item) => (
        <div key={item.id} className="break-inside-avoid">
          <p className="font-semibold">
            {item.title || "Achievement"} {item.year ? <span className={variantStyles[variant].muted}>({item.year})</span> : null}
          </p>
          <Bullets value={item.description} />
        </div>
      ))}
    </Section>
  );
}

function EmptyHint() {
  return (
    <div className="rounded-md border border-dashed border-slate-300 p-5 text-center text-slate-500">
      Isi data CV di form untuk melihat preview real-time.
    </div>
  );
}

function hasResumeContent(resume: ResumeData) {
  return Boolean(
    resume.personalInfo.fullName ||
      resume.summary ||
      resume.experiences.length ||
      resume.education.length ||
      resume.projects.length ||
      resume.skills.length
  );
}

function MainSections({ resume, variant, compact = false }: TemplateProps & { compact?: boolean }) {
  return (
    <>
      <SummarySection resume={resume} variant={variant} compact={compact} />
      <ExperienceSection resume={resume} variant={variant} compact={compact} />
      <ProjectsSection resume={resume} variant={variant} compact={compact} />
      <EducationSection resume={resume} variant={variant} compact={compact} />
      <AchievementsSection resume={resume} variant={variant} compact={compact} />
    </>
  );
}

function SideSections({ resume, variant, compact = false }: TemplateProps & { compact?: boolean }) {
  return (
    <>
      <SkillsSection resume={resume} variant={variant} compact={compact} />
      <CertificationsSection resume={resume} variant={variant} compact={compact} />
      <LanguagesSection resume={resume} variant={variant} compact={compact} />
    </>
  );
}

function Page({ resume, children, className }: { resume: ResumeData; children: ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        "resume-page mx-auto shadow-soft",
        marginClass[resume.settings.pageMargin],
        fontSizeClass[resume.settings.fontSize],
        className
      )}
    >
      {children}
    </article>
  );
}

function CenteredLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume}>
      <header className="mb-7 text-center">
        <PhotoBlock resume={resume} variant={variant} className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold uppercase tracking-wide">{resume.personalInfo.fullName || "Your Name"}</h1>
        <p className={cn("mt-1 text-base font-medium", variantStyles[variant].accent)}>
          {resume.personalInfo.jobTitle || "Your Target Role"}
        </p>
        <ContactLine resume={resume} variant={variant} />
      </header>
      {!hasResumeContent(resume) ? <EmptyHint /> : null}
      <main className="space-y-5">
        <MainSections resume={resume} variant={variant} />
        <SideSections resume={resume} variant={variant} />
      </main>
    </Page>
  );
}

function CleanLeftLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume}>
      <header className="mb-7 grid grid-cols-[1fr_auto] gap-6 border-b border-slate-300 pb-5">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{resume.personalInfo.fullName || "Your Name"}</h1>
          <p className={cn("mt-1 text-base font-medium", variantStyles[variant].accent)}>
            {resume.personalInfo.jobTitle || "Your Target Role"}
          </p>
          <ContactLine resume={resume} variant={variant} />
        </div>
        <PhotoBlock resume={resume} variant={variant} />
      </header>
      {!hasResumeContent(resume) ? <EmptyHint /> : null}
      <main className="space-y-5">
        <MainSections resume={resume} variant={variant} />
        <SideSections resume={resume} variant={variant} />
      </main>
    </Page>
  );
}

function CompactLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume} className="p-7">
      <header className="mb-4 flex items-start justify-between gap-5 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold">{resume.personalInfo.fullName || "Your Name"}</h1>
          <p className={cn("font-medium", variantStyles[variant].accent)}>{resume.personalInfo.jobTitle || "Your Target Role"}</p>
          <ContactLine resume={resume} variant={variant} />
        </div>
        <PhotoBlock resume={resume} variant={variant} className="h-20 w-20 text-base" />
      </header>
      {!hasResumeContent(resume) ? <EmptyHint /> : null}
      <main className="space-y-3">
        <MainSections resume={resume} variant={variant} compact />
        <SideSections resume={resume} variant={variant} compact />
      </main>
    </Page>
  );
}

function ExecutiveRailLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume}>
      <div className="grid grid-cols-[48mm_1fr] gap-8">
        <aside className="border-r border-blue-200 pr-5">
          <PhotoBlock resume={resume} variant={variant} className="mb-5" />
          <h1 className="text-2xl font-bold leading-tight">{resume.personalInfo.fullName || "Your Name"}</h1>
          <p className={cn("mt-2 font-semibold", variantStyles[variant].accent)}>{resume.personalInfo.jobTitle || "Your Target Role"}</p>
          <div className="mt-5">
            <Section title="Contact" variant={variant}>
              <ContactLine resume={resume} variant={variant} stacked />
            </Section>
          </div>
          <div className="mt-5 space-y-5">
            <SideSections resume={resume} variant={variant} compact />
          </div>
        </aside>
        <main className="space-y-5">
          {!hasResumeContent(resume) ? <EmptyHint /> : null}
          <MainSections resume={resume} variant={variant} />
        </main>
      </div>
    </Page>
  );
}

function RightSidebarLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume}>
      <header className="mb-8 grid grid-cols-[1fr_auto] gap-6 border-b border-slate-200 pb-6">
        <div>
          <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", variantStyles[variant].accent)}>
            {resume.personalInfo.jobTitle || "Your Target Role"}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{resume.personalInfo.fullName || "Your Name"}</h1>
          <ContactLine resume={resume} variant={variant} />
        </div>
        <PhotoBlock resume={resume} variant={variant} />
      </header>
      {!hasResumeContent(resume) ? <EmptyHint /> : null}
      <div className="grid grid-cols-[1fr_70mm] gap-8">
        <main className="space-y-5">
          <MainSections resume={resume} variant={variant} />
        </main>
        <aside className="space-y-5 border-l border-slate-200 pl-6">
          <SideSections resume={resume} variant={variant} />
        </aside>
      </div>
    </Page>
  );
}

function LeftSidebarLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume} className="p-0">
      <div className="grid min-h-[297mm] grid-cols-[68mm_1fr]">
        <aside className="bg-slate-950 p-8 text-white">
          <PhotoBlock resume={resume} variant={variant} className="mb-5 border border-white/20" />
          <h1 className="text-2xl font-bold leading-tight text-white">{resume.personalInfo.fullName || "Your Name"}</h1>
          <p className="mt-2 text-sm font-semibold text-emerald-200">{resume.personalInfo.jobTitle || "Your Target Role"}</p>
          <div className="mt-6 space-y-5 text-white">
            <div>
              <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-200">Contact</h2>
              <ContactLine resume={resume} variant={variant} stacked />
            </div>
            <SideSections resume={resume} variant={variant} compact />
          </div>
        </aside>
        <main className="space-y-5 p-9">
          {!hasResumeContent(resume) ? <EmptyHint /> : null}
          <MainSections resume={resume} variant={variant} />
        </main>
      </div>
    </Page>
  );
}

function BandLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume} className="p-0">
      <header className="bg-slate-900 px-10 py-9 text-white">
        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Creative Resume</p>
            <h1 className="mt-2 text-4xl font-bold text-white">{resume.personalInfo.fullName || "Your Name"}</h1>
            <p className="mt-1 text-slate-200">{resume.personalInfo.jobTitle || "Your Target Role"}</p>
            <div className="text-slate-300">
              <ContactLine resume={resume} variant={variant} />
            </div>
          </div>
          <PhotoBlock resume={resume} variant={variant} className="border border-white/20" />
        </div>
      </header>
      <main className="grid grid-cols-[1fr_66mm] gap-8 p-10">
        <div className="space-y-5">
          {!hasResumeContent(resume) ? <EmptyHint /> : null}
          <MainSections resume={resume} variant={variant} />
        </div>
        <aside className="space-y-5">
          <SideSections resume={resume} variant={variant} />
        </aside>
      </main>
    </Page>
  );
}

function ProfileCardLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume}>
      <header className="mb-8 rounded-lg bg-cyan-50 p-6">
        <div className="grid grid-cols-[auto_1fr] gap-5">
          <PhotoBlock resume={resume} variant={variant} className="h-28 w-28 rounded-lg" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Professional Profile</p>
            <h1 className="mt-2 text-4xl font-bold">{resume.personalInfo.fullName || "Your Name"}</h1>
            <p className="mt-1 text-base font-medium text-cyan-800">{resume.personalInfo.jobTitle || "Your Target Role"}</p>
            <ContactLine resume={resume} variant={variant} />
          </div>
        </div>
      </header>
      {!hasResumeContent(resume) ? <EmptyHint /> : null}
      <div className="grid grid-cols-[1fr_68mm] gap-8">
        <main className="space-y-5">
          <MainSections resume={resume} variant={variant} />
        </main>
        <aside className="space-y-5">
          <SideSections resume={resume} variant={variant} />
        </aside>
      </div>
    </Page>
  );
}

function PortfolioLayout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume}>
      <header className="mb-7 border-b-4 border-violet-200 pb-5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight">{resume.personalInfo.fullName || "Your Name"}</h1>
            <p className="mt-1 text-lg font-semibold text-violet-700">{resume.personalInfo.jobTitle || "Your Target Role"}</p>
            <ContactLine resume={resume} variant={variant} />
          </div>
          <PhotoBlock resume={resume} variant={variant} className="rounded-full" />
        </div>
      </header>
      {!hasResumeContent(resume) ? <EmptyHint /> : null}
      <main className="space-y-5">
        <SummarySection resume={resume} variant={variant} />
        <ProjectsSection resume={resume} variant={variant} />
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-5">
            <ExperienceSection resume={resume} variant={variant} />
            <AchievementsSection resume={resume} variant={variant} />
          </div>
          <div className="space-y-5">
            <SkillsSection resume={resume} variant={variant} />
            <EducationSection resume={resume} variant={variant} />
            <CertificationsSection resume={resume} variant={variant} />
            <LanguagesSection resume={resume} variant={variant} />
          </div>
        </div>
      </main>
    </Page>
  );
}

function Web3Layout({ resume, variant }: TemplateProps) {
  return (
    <Page resume={resume} className="p-0">
      <div className="grid min-h-[297mm] grid-cols-[72mm_1fr]">
        <aside className="bg-indigo-950 p-8 text-white">
          <PhotoBlock resume={resume} variant={variant} className="mb-5 rounded-full border border-white/20" />
          <h1 className="text-2xl font-bold leading-tight text-white">{resume.personalInfo.fullName || "Your Name"}</h1>
          <p className="mt-2 text-sm font-semibold text-indigo-200">{resume.personalInfo.jobTitle || "Your Target Role"}</p>
          <div className="mt-6 text-indigo-100">
            <ContactLine resume={resume} variant={variant} stacked />
          </div>
          <div className="mt-6 space-y-5">
            <SkillsSection resume={resume} variant={variant} compact />
            <LanguagesSection resume={resume} variant={variant} compact />
          </div>
        </aside>
        <main className="space-y-5 p-9">
          {!hasResumeContent(resume) ? <EmptyHint /> : null}
          <SummarySection resume={resume} variant={variant} />
          <ProjectsSection resume={resume} variant={variant} />
          <ExperienceSection resume={resume} variant={variant} />
          <EducationSection resume={resume} variant={variant} />
          <CertificationsSection resume={resume} variant={variant} />
          <AchievementsSection resume={resume} variant={variant} />
        </main>
      </div>
    </Page>
  );
}

export function BaseResumeTemplate({ resume, variant }: TemplateProps) {
  switch (variant) {
    case "clean":
    case "minimal":
      return <CleanLeftLayout resume={resume} variant={variant} />;
    case "compact":
      return <CompactLayout resume={resume} variant={variant} />;
    case "professional":
    case "executive":
      return <ExecutiveRailLayout resume={resume} variant={variant} />;
    case "modern":
      return <RightSidebarLayout resume={resume} variant={variant} />;
    case "developer":
      return <LeftSidebarLayout resume={resume} variant={variant} />;
    case "creative":
      return <BandLayout resume={resume} variant={variant} />;
    case "startup":
      return <ProfileCardLayout resume={resume} variant={variant} />;
    case "portfolio":
      return <PortfolioLayout resume={resume} variant={variant} />;
    case "web3":
      return <Web3Layout resume={resume} variant={variant} />;
    case "classic":
    default:
      return <CenteredLayout resume={resume} variant={variant} />;
  }
}
