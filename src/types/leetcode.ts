export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  performanceScore: number;
}

export interface LeetCodeScoreConfig {
  difficultyWeights: {
    easy: number;
    medium: number;
    hard: number;
  };
  scoringFactors: {
    acceptance: number;
    solvedRatio: number;
    ranking: number;
  };
}
