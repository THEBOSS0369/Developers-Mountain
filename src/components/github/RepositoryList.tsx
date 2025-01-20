import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Repository } from "@/types/github";

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  if (!repositories?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Repos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {repositories.map((repo) => (
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
  );
}
