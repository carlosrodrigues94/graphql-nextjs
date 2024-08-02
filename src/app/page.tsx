"use client";
import { useQuery } from "@apollo/client";
import { QUERY_USERS_PUBLIC } from "@/services/graphql/query/get-users-public";
import { QueryPublicUsers } from "@/types/query";

export default function Home() {
  const { data } = useQuery<QueryPublicUsers>(QUERY_USERS_PUBLIC, {
    variables: { offset: 0, limit: 50 },
  });

  return (
    <div className="w-full min-h-lvh fl overflow-y-auto p-2">
      <h1 className="flex justify-center items-center">
        Join with the Community
      </h1>
      <a
        href="/login"
        className="flex justify-end text-sm text-cyan-600 mt-2 mb-2 font-bold underline"
      >
        Login
      </a>
      <ul className="w-full flex flex-wrap justify-center items-center">
        {data?.publicUsers.result.map((item) => {
          return (
            <li
              key={item.userName + Math.random()}
              className="border-cyan-600 border-2 rounded-md m-1 p-1"
            >
              <div className="flex flex-col text-sm">
                <span className="text-sm">{item.userName}</span>
                {/* <span>{item.registerStatus}</span> */}
              </div>
              <img
                className="rounded-sm"
                src={item.avatar.url}
                width={100}
                height={100}
                alt="avatar"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
