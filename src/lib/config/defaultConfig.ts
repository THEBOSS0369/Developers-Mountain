import { ProjectConfig } from "@/types/config";

export const DEFAULT_CONFIG: ProjectConfig = {
  weights: {
    loc: 0.4,
    complexity: 0.3,
    files: 0.2,
    impact: 0.1,
  },
  thresholds: {
    loc: {
      min: 50,
      max: 500,
      optimal: 275,
    },
    files: {
      max: 10,
      penalty: 5,
    },
    lineLength: 120,
    nestingLevel: 4,
  },
  scoring: {
    documentation: 5,
    test: 10,
    bugfix: 8,
    refactor: 6,
    comments: 1,
  },
  ignorePatterns: {
    files: ["package-lock.json", "yarn.lock", "*.min.js", "*.generated.*"],
    magicNumbers: [0, 1, -1, 100],
    longLines: [/http[s]?:\/\//, /^import .*from/],
  },
};
