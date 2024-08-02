import { User } from "@/types/user";

export const ListUsers = (props: { users: User[] }) => {
  return (
    <ul className="w-full flex flex-wrap justify-center items-center">
      {props.users.map((item) => {
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
              src={item.avatar?.url}
              width={100}
              height={100}
              alt="avatar"
            />
          </li>
        );
      })}
    </ul>
  );
};
