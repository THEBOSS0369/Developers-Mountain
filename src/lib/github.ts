// lib/github.ts
import { GitHubData, PullRequest, CommitFile } from "@/types/github";
import { EXCLUDED_FILES } from "./config/excludedfiles";

export async function fetchGitHubData(username: string): Promise<GitHubData> {
  try {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
    if (!githubToken) {
      console.error("GitHub token is not configured");
      return { repos: [], prs: [] };
    }

    const headers = {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
      { headers }
    );
    if (!reposResponse.ok) {
      throw new Error(
        `Failed to fetch repositories: ${reposResponse.statusText}`
      );
    }
    const repos = await reposResponse.json();

    // Fetch pull requests
    const prsResponse = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr&sort=updated&per_page=5`,
      { headers }
    );
    if (!prsResponse.ok) {
      throw new Error(`Failed to fetch PRs: ${prsResponse.statusText}`);
    }
    const prsData = await prsResponse.json();

    // Extract repository names and fetch additional PR data
    const prs = await Promise.all(
      prsData.items.map(async (pr: PullRequest) => {
        const repoFullName = pr.repository_url.split("/").slice(-2).join("/");

        // Fetch detailed PR data to get merge commit SHA
        const prDetailResponse = await fetch(
          `https://api.github.com/repos/${repoFullName}/pulls/${pr.number}`,
          { headers }
        );

        if (!prDetailResponse.ok) {
          return {
            ...pr,
            repository: {
              name: repoFullName.split("/")[1],
              full_name: repoFullName,
            },
          };
        }

        const prDetail = await prDetailResponse.json();
        return {
          ...pr,
          merge_commit_sha: prDetail.merge_commit_sha,
          merged_at: prDetail.merged_at,
          repository: {
            name: repoFullName.split("/")[1],
            full_name: repoFullName,
          },
        };
      })
    );

    return { repos, prs };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { repos: [], prs: [] };
  }
}

function shouldIncludeFile(filename: string): boolean {
  return !EXCLUDED_FILES.some((pattern) => {
    if (pattern.endsWith("/")) {
      // Check if filename starts with directory pattern
      return filename.startsWith(pattern);
    } else if (pattern.includes("*")) {
      // Convert glob pattern to regex
      const regexPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
      return new RegExp(`^${regexPattern}$`).test(filename);
    } else {
      // Exact match
      return filename === pattern;
    }
  });
}

// fetch commit files
export async function fetchCommitFiles(
  repoFullName: string,
  commitSha: string
): Promise<CommitFile[]> {
  try {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
    if (!githubToken) {
      throw new Error("Github Token is not configured");
    }

    const headers = {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };
    const resposne = await fetch(
      `https://api.github.com/repos/${repoFullName}/commits/${commitSha}`,
      { headers }
    );
    if (!resposne.ok) {
      throw new Error(`Failed to Fetch commit: ${resposne.statusText}`);
    }

    const commitData = await resposne.json();

    // Filtering out excluded file
    const filteredFiles = (commitData.files || []).filter(
      (file: { filename: string }) => shouldIncludeFile(file.filename)
    );

    return filteredFiles;
  } catch (error) {
    console.error("Error Fetching files", error);
    return [];
  }
}
