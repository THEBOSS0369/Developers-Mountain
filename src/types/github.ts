export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  merged_at: string | null;
  merge_commit_sha: string | null;
  pull_request: {
    html_url: string;
  };
  repository_url: string;
  repository?: {
    name: string;
    full_name: string;
  };
  commits_url?: string;
}

export interface CommitFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  raw_url: string;
  contents_url: string;
}

export interface GitHubData {
  repos: Repository[];
  prs: PullRequest[];
}

export interface GitHubUser {
  name: string;
  email: string;
  avatar_url: string;
  user_name: string;
}
