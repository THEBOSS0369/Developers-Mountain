import { GitHubData, PullRequest } from "@/types/github";

export async function fetchGitHubData(username: string): Promise<GitHubData> {
  try {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

    if (!githubToken) {
      console.error("Github Token is not configured");
      return { repos: [], prs: [] };
    }
    const headers = {
      Authoirzation: `Bearer ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    // Fetch Repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
      { headers }
    );
    if (!reposResponse.ok) {
      throw new Error(`Failed to Fetch Repos: ${reposResponse.statusText}`);
    }
    const repos = await reposResponse.json();

    // Fetch PR's
    const prsResponse = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr&sort=updated&per_page=5`,
      { headers }
    );
    if (!prsResponse.ok) {
      throw new Error(`Failed to Fetch PRs: ${prsResponse.statusText}`);
    }
    const prsData = await prsResponse.json();

    const prs = await Promise.all(
      prsData.items.map(async (pr: PullRequest) => {
        const repoName = pr.repository_url.split("/").slice(-2).join("/");
        return {
          ...pr,
          repository: {
            name: repoName,
          },
        };
      })
    );

    return { repos, prs };
  } catch (error) {
    console.error("Error Fetching Github Data:", error);
    return { repos: [], prs: [] };
  }
}
