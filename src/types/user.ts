import { Avatar } from "./avatar";

export interface User {
  __typename: "User";
  userName: string;
  registerStatus: "REGISTERED" | "PENDING" | "REJECTED"; // Assuming possible values for registerStatus
  createdAt: string; // You might want to consider using Date type if you're working with dates
  updatedAt: string | null;
  deletedAt: string | null;
  avatar?: Avatar;
}
