export interface ProjectConfig {
  weights: {
    loc: number;
    complexity: number;
    files: number;
    impact: number;
  };
  thresholds: {
    loc: {
      min: number;
      max: number;
      optimal: number;
    };
    files: {
      max: number;
      penalty: number;
    };
    lineLength: number;
    nestingLevel: number;
  };
  scoring: {
    documentation: number;
    test: number;
    bugfix: number;
    refactor: number;
    comments: number;
  };
  ignorePatterns: {
    files: string[];
    magicNumbers: number[];
    longLines: RegExp[];
  };
}
