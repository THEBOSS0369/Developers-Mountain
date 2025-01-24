"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PullRequest, CommitFile } from "@/types/github";
import { PRScore } from "@/types/scoring";
import { calculatePRScore } from "@/services/scoreCalculation";
import { fetchCommitFiles } from "@/lib/github";

interface PullRequestListProps {
  pullRequests: PullRequest[];
}

interface PRWithScore {
  pr: PullRequest;
  score: PRScore | null;
  files: CommitFile[];
}

export function PullRequestList({ pullRequests }: PullRequestListProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [prsWithScores, setPrsWithScores] = useState<PRWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const loadScores = async () => {
      if (!user) return;

      const scoredPRs = await Promise.all(
        pullRequests.map(async (pr) => {
          if (pr.merged_at && pr.merge_commit_sha && pr.repository?.full_name) {
            try {
              const files = await fetchCommitFiles(
                pr.repository.full_name,
                pr.merge_commit_sha
              );
              const score = calculatePRScore(files, pr);
              return { pr, score, files };
            } catch (error) {
              console.error(`Error calculating score for PR ${pr.id}:`, error);
              return { pr, score: null, files: [] };
            }
          }
          return { pr, score: null, files: [] };
        })
      );

      const validScores = scoredPRs.filter((prScore) => prScore.score !== null);
      const avgScore =
        validScores.length > 0
          ? validScores.reduce(
              (sum, prScore) => sum + (prScore.score?.total || 0),
              0
            ) / validScores.length
          : null;

      setPrsWithScores(scoredPRs);
      setAverageScore(avgScore);

      if (avgScore !== null) {
        try {
          const { error } = await supabase
            .from("profiles")
            .update({ scores: avgScore })
            .eq("id", user.id);

          if (error) throw error;
        } catch (error) {
          console.error("Error updating score:", error);
        }
      }

      setLoading(false);
    };

    loadScores();
  }, [pullRequests, user]);

  const ScoreDisplay = ({ score }: { score: PRScore }) => (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-600">Overall Score</div>
          <div className="text-2xl font-bold text-blue-600">
            {score.total.toFixed(1)}
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-600">Code Quality</div>
          <div className="text-xl font-semibold text-green-600">
            {score.metrics.complexityScore.toFixed(1)}
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-600">Impact</div>
          <div className="text-xl font-semibold text-purple-600">
            {score.metrics.impactScore.toFixed(1)}
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-600">Files Changed</div>
          <div className="text-xl font-semibold text-orange-600">
            {score.metrics.filesScore.toFixed(1)}
          </div>
        </div>
      </div>

      {score.metrics.qualityIssues.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">
            Quality Issues Found:
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <ul className="space-y-1">
              {score.metrics.qualityIssues.map((issue, index) => (
                <li
                  key={index}
                  className="text-sm flex justify-between items-center border-b last:border-0 py-1"
                >
                  <span className="text-red-600">{issue.description}</span>
                  <span className="text-gray-500">-{issue.penalty} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent PR&apos;s</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading PR scores...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent PR&apos;s</CardTitle>
          {averageScore !== null && (
            <div className="text-sm text-gray-600">
              Avg Score:{" "}
              <span className="font-bold text-blue-600">
                {averageScore.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {prsWithScores.map(({ pr, score, files }) => (
            <div key={pr.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <a
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {pr.title}
                  </a>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span role="img" aria-label="repository">
                        📂
                      </span>
                      {pr.repository?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <span role="img" aria-label="date">
                        📅
                      </span>
                      {new Date(pr.created_at).toLocaleDateString()}
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        pr.state === "open"
                          ? "text-green-600"
                          : "text-purple-600"
                      }`}
                    >
                      {pr.state === "open" ? "🟢 Open" : "🟣 Merged"}
                    </span>
                    {files.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span role="img" aria-label="files">
                          📄
                        </span>
                        {files.length} files changed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {score && <ScoreDisplay score={score} />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
