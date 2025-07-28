import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Updated Types for GitHub API responses
interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

// Updated PR interface to match GitHub API structure
interface PullRequest {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  pull_request: {
    html_url: string;
  };
  repository_url: string;
}

async function fetchGitHubData(username: string) {
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

    // Extract repository names from repository_url
    const prs = await Promise.all(
      prsData.items.map(async (pr: PullRequest) => {
        // Extract repo name from repository_url
        // Format: "https://api.github.com/repos/owner/repo"
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
    console.error("Error fetching GitHub data:", error);
    return { repos: [], prs: [] };
  }
}

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching data", error);
    return <div>Error Fetching Data</div>;
  }

  const githubUsername = user?.user_metadata?.user_name;
  const avatarUrl = user?.user_metadata?.avatar_url;
  const name = user?.user_metadata?.name || "User";

  let githubData;
  if (githubUsername) {
    githubData = await fetchGitHubData(githubUsername);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt={`${name}'s avatar`}
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            {githubUsername && (
              <p className="text-gray-600">GitHub: @{githubUsername}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {githubData?.repos?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Repositories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {githubData?.repos?.map((repo: any) => (
                <div key={repo.id} className="border-b pb-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 text-sm">{repo.description}</p>
                  <div className="flex space-x-4 mt-2 text-sm">
                    <span>⭐ {repo.stargazers_count}</span>
                    {repo.language && <span>🔤 {repo.language}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {githubData?.prs?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Pull Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {githubData?.prs?.map((pr: any) => (
                <div key={pr.id} className="border-b pb-4">
                  <a
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {pr.title}
                  </a>
                  <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                    <span>📂 {pr.repository?.name}</span>
                    <span>
                      📅 {new Date(pr.created_at).toLocaleDateString()}
                    </span>
                    <span
                      className={`${
                        pr.state === "open"
                          ? "text-green-600"
                          : "text-purple-600"
                      }`}
                    >
                      {pr.state === "open" ? "🟢 Open" : "🟣 Merged"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
