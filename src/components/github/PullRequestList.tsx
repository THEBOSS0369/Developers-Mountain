import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PullRequest } from "@/types/github";

interface PullRequestListProps {
  pullRequests: PullRequest[];
}

export function PullRequestList({ pullRequests }: PullRequestListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent PR's</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pullRequests.map((pr) => (
            <div key={pr.id} className="border-b pb-4">
              <a
                href={pr.html_url}
                target="_blank"
                rel="noopener norefer"
                className="text-blue-600 hover:underline font-medium"
              >
                {pr.title}
              </a>
              <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                <span>📂 {pr.repository?.name}</span>
                <span>📅 {new Date(pr.created_at).toLocaleDateString()}</span>
                <span
                  className={`${
                    pr.state === "open" ? "text-green-600" : "text-purple-600"
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
  );
}
