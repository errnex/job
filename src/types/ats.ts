export type ATSSectionScore = {
  label: string;
  score: number;
  maxScore: number;
  status: "good" | "warning" | "missing";
  recommendation: string;
};

export type ATSScoreResult = {
  score: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  sections: ATSSectionScore[];
  recommendations: string[];
};
