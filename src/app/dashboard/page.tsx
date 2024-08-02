"use client";

import { ListUsers } from "@/components/list-users";
import { Spinner } from "@/components/spinner";
import { signOut } from "@/lib/actions/sign-out";
import { QUERY_USERS } from "@/services/graphql/query/get-users";
import { QueryUsers } from "@/types/query";
import { useQuery } from "@apollo/client";

export default function Dashboard() {
  const { loading, data } = useQuery<QueryUsers>(QUERY_USERS, {
    variables: {
      limit: 100,
      offset: 0,
    },
  });

  return (
    <div className="w-full h-svh flex justify-start p-1 bg-slate-800 items-center flex-col">
      <header className="flex justify-center items-center p-1 w-full mb-2">
        <div className="">{loading && <Spinner />}</div>
        <h1 className="ml-auto">Dashboard</h1>
        <form action="" className="ml-auto">
          <button
            className="bg-sky-500 flex justify-center items-center p-1 mt-2 rounded-sm"
            formAction={signOut}
          >
            Logout
          </button>
        </form>
      </header>
      <ListUsers users={data?.users?.result || []} />
    </div>
  );
}
