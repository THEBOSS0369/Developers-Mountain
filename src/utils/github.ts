// utils/github.ts
export async function fetchGithubCommits(username: string) {
  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
    if (!token) {
      throw new Error("GitHub token is not configured");
    }

    // First, let's try a simpler query to make sure basic authentication works
    const query = `
      query {
        viewer {
          login
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Note: Changed to 'Bearer' with capital B
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await response.json();
    console.log("Raw API Response:", JSON.stringify(data, null, 2));

    // If the authentication works, then try the full query
    if (!data.errors) {
      const contributionsQuery = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;

      const contribResponse = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: contributionsQuery,
          variables: { username },
        }),
      });

      const contribData = await contribResponse.json();
      console.log(
        "Contributions Response:",
        JSON.stringify(contribData, null, 2)
      );

      if (contribData.errors) {
        throw new Error(contribData.errors[0]?.message || "GitHub API Error");
      }

      if (!contribData.data?.user) {
        throw new Error(`No user found with username: ${username}`);
      }

      const contributions = contribData.data.user.contributionsCollection;
      return (
        (contributions.totalCommitContributions || 0) +
        (contributions.restrictedContributionsCount || 0)
      );
    } else {
      throw new Error(data.errors[0]?.message || "Authentication failed");
    }
  } catch (error) {
    console.error("Detailed error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch GitHub data"
    );
  }
}
