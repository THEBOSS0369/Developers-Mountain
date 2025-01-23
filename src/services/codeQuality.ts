import { CodeQualityIssue } from "@/types/scoring";
import { ProjectConfig } from "@/types/config";
import {
  analyzeCodeStructure,
  analyzeVariableScopes,
} from "@/utils/fileAnalysis";

export function detectCodeQualityIssues(
  patch: string,
  config: ProjectConfig,
  filename: string
): CodeQualityIssue[] {
  const issues: CodeQualityIssue[] = [];

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

  addedLines.forEach((line, index) => {
    if (line.length > config.thresholds.lineLength) {
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
