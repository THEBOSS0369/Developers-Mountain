import { CommitFile } from "@/types/github";
import { PullRequest } from "@/types/github";
import { PRScore } from "@/types/scoring";
import { ProjectConfig } from "@/types/config";
import { DEFAULT_CONFIG } from "@/lib/config/defaultConfig";
import { calculateZScore } from "../utils/normalization";
import { calculateFileImportance } from "../utils/fileAnalysis";
import { detectCodeQualityIssues } from "./codeQuality";

function calculateLocScore(files: CommitFile[], config: ProjectConfig): number {
  const totalChanges = files.reduce(
    (sum, file) => sum + file.additions + file.deletions,
    0
  );

  const normalizedScore = calculateZScore(
    totalChanges,
    config.thresholds.loc.optimal,
    config.thresholds.loc.max - config.thresholds.loc.min
  );

  return Math.max(0, Math.min(100, 50 + normalizedScore * 25));
}

function calculateFilesScore(
  files: CommitFile[],
  config: ProjectConfig
): number {
  const fileCount = files.filter(
    (file) =>
      !config.ignorePatterns.files.some((pattern) =>
        new RegExp(pattern.replace("*", ".*")).test(file.filename)
      )
  ).length;

  if (fileCount <= config.thresholds.files.max) {
    return 100 - (fileCount / config.thresholds.files.max) * 20;
  }

  return Math.max(
    0,
    80 -
      (fileCount - config.thresholds.files.max) *
        config.thresholds.files.penalty
  );
}

function calculateImpactScore(
  files: CommitFile[],
  pr: PullRequest,
  config: ProjectConfig
): number {
  let score = 0;
  const title = pr.title.toLowerCase();
  const body = pr.body?.toLowerCase() || "";

  if (title.includes("fix") || body.includes("fixes #")) {
    score += config.scoring.bugfix;
  }
  if (title.includes("refactor") || body.includes("refactor")) {
    score += config.scoring.refactor;
  }

  for (const file of files) {
    if (
      config.ignorePatterns.files.some((pattern) =>
        new RegExp(pattern.replace("*", ".*")).test(file.filename)
      )
    ) {
      continue;
    }

    if (file.filename.includes("test")) {
      score += config.scoring.test;
    }
    if (file.filename.endsWith(".md") || file.filename.endsWith(".txt")) {
      score += config.scoring.documentation;
    }

    const fileImportance = calculateFileImportance(file.filename);
    score += Math.min(file.changes, 100) * 0.1 * fileImportance;
  }

  return Math.min(100, score);
}

function calculateComplexityScore(
  files: CommitFile[],
  config: ProjectConfig
): [number, CodeQualityIssue[]] {
  let score = 100;
  const allIssues: CodeQualityIssue[] = [];

  for (const file of files) {
    if (!file.patch) continue;

    const issues = detectCodeQualityIssues(file.patch, config, file.filename);
    allIssues.push(...issues);

    const totalPenalty = issues.reduce((sum, issue) => sum + issue.penalty, 0);
    score -= totalPenalty;

    const lines = file.patch.split("\n");
    const commentBonus =
      lines.filter(
        (line) =>
          line.startsWith("+") &&
          (line.includes("//") || line.includes("/*") || line.includes("*"))
      ).length * config.scoring.comments;

    score += commentBonus;
  }

  return [Math.max(0, Math.min(100, score)), allIssues];
}

export function calculatePRScore(
  files: CommitFile[],
  pr: PullRequest,
  projectConfig: Partial<ProjectConfig> = {}
): PRScore {
  const config = {
    ...DEFAULT_CONFIG,
    ...projectConfig,
    weights: { ...DEFAULT_CONFIG.weights, ...projectConfig.weights },
    thresholds: { ...DEFAULT_CONFIG.thresholds, ...projectConfig.thresholds },
    scoring: { ...DEFAULT_CONFIG.scoring, ...projectConfig.scoring },
    ignorePatterns: {
      ...DEFAULT_CONFIG.ignorePatterns,
      ...projectConfig.ignorePatterns,
    },
  };

  const [complexityScore, qualityIssues] = calculateComplexityScore(
    files,
    config
  );
  const locScore = calculateLocScore(files, config);
  const filesScore = calculateFilesScore(files, config);
  const impactScore = calculateImpactScore(files, pr, config);

  const total =
    locScore * config.weights.loc +
    complexityScore * config.weights.complexity +
    filesScore * config.weights.files +
    impactScore * config.weights.impact;

  return {
    total: Math.round(total * 100) / 100,
    metrics: {
      locScore: Math.round(locScore * 100) / 100,
      complexityScore: Math.round(complexityScore * 100) / 100,
      filesScore: Math.round(filesScore * 100) / 100,
      impactScore: Math.round(impactScore * 100) / 100,
      qualityIssues,
    },
    config,
  };
}
