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
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  pull_request: {
    html_url: string;
  };
  repository_url: string;
  repository?: {
    name: string;
  };
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
