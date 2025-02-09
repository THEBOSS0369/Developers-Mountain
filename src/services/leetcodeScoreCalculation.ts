import { LeetCodeStats, LeetCodeScoreConfig } from "@/types/leetcode";
import { DEFAULT_LEETCODE_SCORE_CONFIG } from "@/lib/config/leetcodeConfig";

export function calculateLeetCodePerformanceScore(
  stats: Omit<LeetCodeStats, "performanceScore">,
  config: LeetCodeScoreConfig = DEFAULT_LEETCODE_SCORE_CONFIG,
): number {
  const { difficultyWeights, scoringFactors } = config;

  // Difficulty-based scores
  const difficultyScore =
    stats.easySolved * difficultyWeights.easy +
    stats.mediumSolved * difficultyWeights.medium +
    stats.hardSolved * difficultyWeights.hard;

  // Solved ratio score
  const solvedRatioScore =
    Math.min(1, stats.totalSolved / stats.totalQuestions) *
    100 *
    scoringFactors.solvedRatio;

  // Acceptance rate score
  const acceptanceScore =
    Math.min(stats.acceptanceRate, 100) * scoringFactors.acceptance;

  // Ranking score (inverse, so lower ranking is better)
  const rankingScore =
    Math.max(0, 1000 - stats.ranking) * scoringFactors.ranking;

  // Combine and normalize scores
  const totalScore =
    difficultyScore + solvedRatioScore + acceptanceScore + rankingScore;

  return Math.min(Math.max(totalScore, 0), 100);
}

// Optional: Function to provide detailed score breakdown
export function getScoreBreakdown(
  stats: Omit<LeetCodeStats, "performanceScore">,
  config: LeetCodeScoreConfig = DEFAULT_LEETCODE_SCORE_CONFIG,
) {
  const { difficultyWeights, scoringFactors } = config;

  return {
    difficultyScore: {
      easy: stats.easySolved * difficultyWeights.easy,
      medium: stats.mediumSolved * difficultyWeights.medium,
      hard: stats.hardSolved * difficultyWeights.hard,
    },
    solvedRatioScore:
      Math.min(1, stats.totalSolved / stats.totalQuestions) *
      100 *
      scoringFactors.solvedRatio,
    acceptanceScore:
      Math.min(stats.acceptanceRate, 100) * scoringFactors.acceptance,
    rankingScore: Math.max(0, 1000 - stats.ranking) * scoringFactors.ranking,
  };
}
