import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubUser } from "@/types/github";
import Image from "next/image";

interface ProfileCardProps {
  user: GitHubUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Github Information</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">
            {user?.user_name && (
              <span className="text-neutral-100/60">
                User Name: @{user?.user_name}
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
