export interface PRScore {
  total: number;
  metrics: {
    locScore: number;
    complexityScore: number;
    filesScore: number;
    impactScore: number;
    qualityIssues: CodeQualityIssue[];
  };
  config: ProjectConfig;
}

export interface CodeQualityIssue {
  type: string;
  description: string;
  severity: "info" | "warning" | "error";
  penalty: number;
  context: any;
}
