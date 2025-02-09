import { LeetCodeScoreConfig } from "@/types/leetcode";

export const DEFAULT_LEETCODE_SCORE_CONFIG: LeetCodeScoreConfig = {
  difficultyWeights: {
    easy: 1, // Less weight for easy problems
    medium: 3, // More weight for medium problems
    hard: 5, // Highest weight for hard problems
  },
  scoringFactors: {
    acceptance: 0.5, // Weight for acceptance rate
    solvedRatio: 2, // Weight for solved/total questions ratio
    ranking: 0.1, // Small weight for global ranking
  },
};
