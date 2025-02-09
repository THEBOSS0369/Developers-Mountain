import { LeetCodeStats } from "@/types/leetcode";
import { calculateLeetCodePerformanceScore } from "./leetcodeScoreCalculation";

export async function fetchLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  try {
    const query = `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch LeetCode data");
    }

    const data = await response.json();
    if (!data.data.matchedUser) {
      return null;
    }

    // Get the stats arrays
    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const totalSubmissions =
      data.data.matchedUser.submitStats.totalSubmissionNum;
    const allQuestions = data.data.allQuestionsCount;

    // Calculate total questions directly from allQuestions array
    const totalQuestions =
      allQuestions.find((q: any) => q.difficulty === "All")?.count ||
      allQuestions.reduce((acc: number, curr: any) => {
        if (curr.difficulty !== "All") {
          return acc + curr.count;
        }
        return acc;
      }, 0);

    // Calculate total solved from stats
    const totalSolved = stats.reduce((acc: number, curr: any) => {
      if (curr.difficulty !== "All") {
        return acc + curr.count;
      }
      return acc;
    }, 0);

    // Calculate total attempted from submissions
    const totalAttempted = totalSubmissions.reduce((acc: number, curr: any) => {
      if (curr.difficulty !== "All") {
        return acc + curr.count;
      }
      return acc;
    }, 0);

    const statsResult = {
      totalSolved,
      totalQuestions,
      easySolved: stats.find((s: any) => s.difficulty === "Easy")?.count || 0,
      mediumSolved:
        stats.find((s: any) => s.difficulty === "Medium")?.count || 0,
      hardSolved: stats.find((s: any) => s.difficulty === "Hard")?.count || 0,
      acceptanceRate: totalAttempted ? (totalSolved / totalAttempted) * 100 : 0,
      ranking: data.data.matchedUser.profile.ranking,
      performanceScore: 0, // Placeholder
    };

    // Calculate performance score
    statsResult.performanceScore =
      calculateLeetCodePerformanceScore(statsResult);

    return statsResult;
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
}
