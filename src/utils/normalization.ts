export function calculateZScore(
  value: number,
  mean: number,
  stdDev: number
): number {
  return (value - mean) / stdDev;
}

export function normalizeScores(scores: number[]): number[] {
  if (scores.length === 0) return [];

  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
    scores.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return scores.map(() => 50);

  return scores.map((score) => {
    const zScore = (score - mean) / stdDev;
    return Math.round(Math.max(0, Math.min(100, 50 + zScore * 25)) * 100) / 100;
  });
}
