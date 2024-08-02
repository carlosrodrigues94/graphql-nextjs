export interface Avatar {
  __typename: "Avatar";
  avatarId: string;
  url: string;
  createdAt: string; // You might want to consider using Date type if you're working with dates
  updatedAt: string | null;
}
