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
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        {user.avatar_url && (
          <Image
            src={user?.avatar_url}
            alt={`${user?.user_name}'s avatar`}
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">
            {user?.email}
            <br />
            {user?.user_name && (
              <span className="text-gray-600">Github: @{user?.user_name}</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
