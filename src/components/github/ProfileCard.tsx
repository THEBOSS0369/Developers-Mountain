import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubUser } from "@/types/github";
import Image from "next/image";

interface ProfileCardProps {
  user: GitHubUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="bg-stone-700/30 backdrop-blur-xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)]">
      <CardHeader>
        <CardTitle>
          {user?.user_name && (
            <span className="text-stone-300">
              GitHub User Name:{" "}
              <span className="text-lime-300">@{user?.user_name}</span>
            </span>
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
