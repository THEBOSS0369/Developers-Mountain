export interface Profile {
  id: string;
  full_name: string;
  username: string;
  website: string;
  avatar_url: string;
  languages: {
    name: string;
    icon: string;
  };
  scores: number;
}
