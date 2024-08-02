import { Pagination } from "./pagination";
import { User } from "./user";

export type QueryPublicUsers = {
  publicUsers: { result: Record<string, any>[] };
};

export type QueryUsers = {
  users: {
    result: User[];
    pagination: Pagination;
  };
};
