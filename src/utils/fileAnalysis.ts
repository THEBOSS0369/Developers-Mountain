export function calculateFileImportance(filename: string): number {
  let importance = 1;

  if (filename.includes("src/")) importance *= 1.2;
  if (filename.includes("core/")) importance *= 1.3;
  if (filename.includes("security/")) importance *= 1.4;
  if (filename.includes("test/")) importance *= 0.8;
  if (filename.includes("docs/")) importance *= 0.7;

  return importance;
}

export function analyzeVariableScopes(lines: string[]): {
  unusedVariables: string[];
  scopeDepth: number;
} {
  const variables = new Map();
  let scopeDepth = 0;

  lines.forEach((line) => {
    const declarations = line.match(/(?:let|var|const)\s+(\w+)\s*=/g) || [];
    declarations.forEach((decl) => {
      const varName = decl.match(/(?:let|var|const)\s+(\w+)/)?.[1];
      if (varName) {
        variables.set(varName, { declared: true, used: false });
      }
    });

    Array.from(variables.keys()).forEach((varName) => {
      if (line.includes(varName) && !line.includes(`${varName} =`)) {
        variables.set(varName, { declared: true, used: true });
      }
    });

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

export function analyzeCodeStructure(code: string): {
  maxNestingLevel: number;
  complexity: number;
} {
  let maxNestingLevel = 0;
  let currentNesting = 0;
  let complexity = 0;

  const lines = code.split("\n");
  lines.forEach((line) => {
    currentNesting += (line.match(/{/g) || []).length;
    currentNesting -= (line.match(/}/g) || []).length;

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
