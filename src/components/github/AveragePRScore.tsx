import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PullRequest } from "@/types/github";
import { PRScore } from "@/types/scoring";

interface AveragePRScoreProps {
  pullRequests: PullRequest[];
  scores: (PRScore | null)[];
}

export function AveragePRScore({ pullRequests, scores }: AveragePRScoreProps) {
  // Filter out null scores and calculate average
  const validScores = scores.filter(
    (score): score is PRScore => score !== null
  );

  const averageTotal =
    validScores.length > 0
      ? validScores.reduce((sum, score) => sum + score.total, 0) /
        validScores.length
      : 0;

  const averageMetrics =
    validScores.length > 0
      ? {
          complexityScore:
            validScores.reduce(
              (sum, score) => sum + score.metrics.complexityScore,
              0
            ) / validScores.length,
          impactScore:
            validScores.reduce(
              (sum, score) => sum + score.metrics.impactScore,
              0
            ) / validScores.length,
          filesScore:
            validScores.reduce(
              (sum, score) => sum + score.metrics.filesScore,
              0
            ) / validScores.length,
          locScore:
            validScores.reduce(
              (sum, score) => sum + score.metrics.locScore,
              0
            ) / validScores.length,
        }
      : {
          complexityScore: 0,
          impactScore: 0,
          filesScore: 0,
          locScore: 0,
        };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Average PR Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-sm text-gray-600">Overall Avg Score</div>
            <div className="text-2xl font-bold text-blue-600">
              {averageTotal.toFixed(1)}
            </div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-sm text-gray-600">Avg Code Quality</div>
            <div className="text-xl font-semibold text-green-600">
              {averageMetrics.complexityScore.toFixed(1)}
            </div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-sm text-gray-600">Avg Impact</div>
            <div className="text-xl font-semibold text-purple-600">
              {averageMetrics.impactScore.toFixed(1)}
            </div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-sm text-gray-600">Avg Files Changed</div>
            <div className="text-xl font-semibold text-orange-600">
              {averageMetrics.filesScore.toFixed(1)}
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Based on {validScores.length} scored pull requests
        </div>
      </CardContent>
    </Card>
  );
}
