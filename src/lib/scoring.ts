// This file contains all the logic which i have divided in multiple files this was the first basic logic
// to calculate the scores. More changes will be done on different files.
import { CommitFile, PullRequest } from "@/types/github";
import { PRScore, CodeQualityIssue, ProjectConfig } from "@/types/scoring";

// Default configuration that can be overridden per project
const DEFAULT_CONFIG: ProjectConfig = {
  weights: { loc: 0.4, complexity: 0.3, files: 0.2, impact: 0.1 },
  thresholds: {
    // Derived from statistical analysis of repository history
    loc: { min: 50, max: 500, optimal: 275 },
    files: {
      max: 10,
      penalty: 5, // Per file penalty after max
    },
    lineLength: 120,
    nestingLevel: 4,
  },
  scoring: {
    // Points awarded/deducted for different aspects
    documentation: 5,
    test: 10,
    bugfix: 8,
    refactor: 6,
    comments: 1,
  },
  ignorePatterns: {
    files: ["package-lock.json", "yarn.lock", "*.min.js", "*.generated.*"],
    magicNumbers: [0, 1, -1, 100], // Common acceptable magic numbers
    longLines: [/http[s]?:\/\//, /^import .*from/], // Patterns to ignore for line length
  },
};

function detectCodeQualityIssues(
  patch: string,
  config: ProjectConfig,
  filename: string
): CodeQualityIssue[] {
  const issues: CodeQualityIssue[] = [];

  // Skip quality checks for ignored files
  if (
    config.ignorePatterns.files.some((pattern) =>
      new RegExp(pattern.replace("*", ".*")).test(filename)
    )
  ) {
    return issues;
  }

  const addedLines = patch
    .split("\n")
    .filter((line) => line.startsWith("+"))
    .map((line) => line.slice(1));

  // Improved variable usage detection using scope analysis
  const scopeAnalysis = analyzeVariableScopes(addedLines);
  scopeAnalysis.unusedVariables.forEach((varName) => {
    issues.push({
      type: "unused-variable",
      description: `Potentially unused variable: ${varName}`,
      penalty: 3,
      severity: "warning",
      context: { variable: varName },
    });
  });

  // AST-based nesting level detection
  const astAnalysis = analyzeCodeStructure(addedLines.join("\n"));
  if (astAnalysis.maxNestingLevel > config.thresholds.nestingLevel) {
    issues.push({
      type: "deep-nesting",
      description: `Deep nesting detected (${astAnalysis.maxNestingLevel} levels)`,
      penalty:
        (astAnalysis.maxNestingLevel - config.thresholds.nestingLevel) * 3,
      severity: "warning",
      context: { level: astAnalysis.maxNestingLevel },
    });
  }

  // Smarter line length checking
  addedLines.forEach((line, index) => {
    if (line.length > config.thresholds.lineLength) {
      // Check if line matches any ignore patterns
      const shouldIgnore = config.ignorePatterns.longLines.some((pattern) =>
        pattern.test(line)
      );

      if (!shouldIgnore) {
        issues.push({
          type: "long-line",
          description: `Line exceeds ${config.thresholds.lineLength} characters`,
          penalty: 1,
          severity: "info",
          context: { line: index + 1, length: line.length },
        });
      }
    }
  });

  // Improved magic number detection
  const magicNumberRegex = new RegExp(
    `(?:^|\\s)(-?\\d+(?:\\.\\d+)?(?!px|em|rem|%|vh|vw|s|ms))(?!\\s*[{:]\\s*\\d+)`,
    "g"
  );

  addedLines.forEach((line, index) => {
    const matches = line.match(magicNumberRegex);
    if (matches) {
      matches.forEach((match) => {
        const number = parseFloat(match);
        if (
          !config.ignorePatterns.magicNumbers.includes(number) &&
          !line.trim().startsWith("//")
        ) {
          issues.push({
            type: "magic-number",
            description: "Consider defining magic number as a constant",
            penalty: 2,
            severity: "info",
            context: { line: index + 1, value: number },
          });
        }
      });
    }
  });

  return issues;
}

function calculateLocScore(files: CommitFile[], config: ProjectConfig): number {
  const totalChanges = files.reduce(
    (sum, file) => sum + file.additions + file.deletions,
    0
  );

  // Use z-score based normalization
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

  // Analyze PR title and description for impact indicators
  if (title.includes("fix") || body.includes("fixes #")) {
    score += config.scoring.bugfix;
  }
  if (title.includes("refactor") || body.includes("refactor")) {
    score += config.scoring.refactor;
  }

  for (const file of files) {
    // Skip ignored files
    if (
      config.ignorePatterns.files.some((pattern) =>
        new RegExp(pattern.replace("*", ".*")).test(file.filename)
      )
    ) {
      continue;
    }

    // Weighted scoring based on file type and changes
    if (file.filename.includes("test")) {
      score += config.scoring.test;
    }
    if (file.filename.endsWith(".md") || file.filename.endsWith(".txt")) {
      score += config.scoring.documentation;
    }

    // Calculate change impact based on file importance
    const fileImportance = calculateFileImportance(file.filename);
    score += Math.min(file.changes, 100) * 0.1 * fileImportance;
  }

  return Math.min(100, score);
}

export function calculatePRScore(
  files: CommitFile[],
  pr: PullRequest,
  projectConfig: Partial<ProjectConfig> = {}
): PRScore {
  // Merge project-specific config with defaults
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
    config, // Include applied configuration for transparency
  };
}

// Helper functions
function calculateZScore(value: number, mean: number, stdDev: number): number {
  return (value - mean) / stdDev;
}

function calculateFileImportance(filename: string): number {
  // Add weights based on file type and location
  let importance = 1;

  if (filename.includes("src/")) importance *= 1.2;
  if (filename.includes("core/")) importance *= 1.3;
  if (filename.includes("security/")) importance *= 1.4;
  if (filename.includes("test/")) importance *= 0.8;
  if (filename.includes("docs/")) importance *= 0.7;

  return importance;
}

function analyzeVariableScopes(lines: string[]): {
  unusedVariables: string[];
  scopeDepth: number;
} {
  // Simplified scope analysis - in practice, use an AST parser
  const variables = new Map<string, { declared: boolean; used: boolean }>();
  let scopeDepth = 0;

  lines.forEach((line) => {
    // Track variable declarations and usage
    const declarations = line.match(/(?:let|var|const)\s+(\w+)\s*=/g) || [];
    declarations.forEach((decl) => {
      const varName = decl.match(/(?:let|var|const)\s+(\w+)/)?.[1];
      if (varName) {
        variables.set(varName, { declared: true, used: false });
      }
    });

    // Track variable usage
    Array.from(variables.keys()).forEach((varName) => {
      if (line.includes(varName) && !line.includes(`${varName} =`)) {
        variables.set(varName, { declared: true, used: true });
      }
    });

    // Track scope depth
    scopeDepth += (line.match(/{/g) || []).length;
    scopeDepth -= (line.match(/}/g) || []).length;
  });

  return {
    unusedVariables: Array.from(variables.entries())
      .filter(([_, status]) => status.declared && !status.used)
      .map(([varName]) => varName),
    scopeDepth,
  };
}

function analyzeCodeStructure(code: string): {
  maxNestingLevel: number;
  complexity: number;
} {
  // Simplified AST-based analysis - in practice, use a proper AST parser
  let maxNestingLevel = 0;
  let currentNesting = 0;
  let complexity = 0;

  const lines = code.split("\n");
  lines.forEach((line) => {
    // Track nesting level using brackets and control structures
    currentNesting += (line.match(/{/g) || []).length;
    currentNesting -= (line.match(/}/g) || []).length;

    // Track complexity based on control structures
    if (line.match(/if|while|for|switch|catch/)) {
      complexity++;
    }

    maxNestingLevel = Math.max(maxNestingLevel, currentNesting);
  });

  return {
    maxNestingLevel,
    complexity,
  };
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

    // Award bonus points for comments
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

export function normalizeScores(scores: number[]): number[] {
  if (scores.length === 0) return [];

  // Calculate mean and standard deviation
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
    scores.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return scores.map(() => 50);

  // Use z-score normalization with bounds
  return scores.map((score) => {
    const zScore = (score - mean) / stdDev;
    return Math.round(Math.max(0, Math.min(100, 50 + zScore * 25)) * 100) / 100;
  });
}
