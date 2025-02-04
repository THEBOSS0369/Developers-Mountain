import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");

  if (!username || !userId) {
    return NextResponse.json(
      { error: "Username and userId are required" },
      { status: 400 },
    );
  }

  try {
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
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

    const data = await response.json();

    if (!data.data?.matchedUser) {
      return NextResponse.json(
        { error: "LeetCode user not found" },
        { status: 404 },
      );
    }

    // Calculate score based on solved problems
    const problems = data.data.matchedUser.submitStats.acSubmissionNum;
    const leetcodeScore = problems.reduce((total: number, problem: any) => {
      // Weight different difficulty levels
      const weights = { Easy: 1, Medium: 2, Hard: 3 };
      return total + problem.count * weights[problem.difficulty];
    }, 0);

    // Update the leetcode_scores column
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ leetcodescores: leetcodeScore })
      .eq("id", userId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      score: leetcodeScore,
      problems: problems,
    });
  } catch (error) {
    console.error("Error processing LeetCode data:", error);
    return NextResponse.json(
      { error: "Failed to process LeetCode data" },
      { status: 500 },
    );
  }
}
