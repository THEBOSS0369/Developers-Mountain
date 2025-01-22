"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCommitFiles } from "@/lib/github";
import { CommitFile } from "@/types/github";
import { Car } from "lucide-react";

interface PrCodeDisplayProps {
  repoFullName: string;
  commitSha: string;
}

export function PrCodeDisplay({ repoFullName, commitSha }: PrCodeDisplayProps) {
  const [files, setFiles] = useState<CommitFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const commitFiles = await fetchCommitFiles(repoFullName, commitSha);
        setFiles(commitFiles);
      } catch (er) {
        setError(
          er instanceof Error ? er.message : "Failed to load commit files"
        );
      } finally {
        setLoading(false);
      }
    };

    if (repoFullName && commitSha) {
      loadFiles();
    }
  }, [repoFullName, commitSha]);

  if (loading) return <div>Loading commit files..</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changed Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.filename} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">{file.filename}</h3>
              <div className="flex space-x-4 text-sm text-gray-600 mb-2">
                <span>Changes: {file.changes}</span>
                <span className="text-green-600">+{file.additions}</span>
                <span className="text-red-600">-{file.deletions}</span>
              </div>
              {file.patch && (
                <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
                  {file.patch}
                </pre>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
