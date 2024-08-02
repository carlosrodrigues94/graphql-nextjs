"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { signIn } from "@/lib/actions/sign-in";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [state, dispatch] = useFormState(signIn, {
    email: "",
    token: "",
  });

  useEffect(() => {
    if (state.error) {
      toast(state.error, { type: "error" });
    }
  }, [state]);

  return (
    <div className="bg-slate-200 flex flex-col p-8 dark:bg-slate-800 items-center h-svh">
      <h4>GraphQL NextJS</h4>
      <form className="flex-col flex items-center p-1" action={dispatch}>
        <input
          className="m-1 rounded-sm p-1 w-full text-gray-500"
          type="text"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="email"
        />
        <input
          className="m-1 rounded-sm p-1 w-full text-gray-500"
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="password"
        />
        <label
          htmlFor="input-show-password"
          className="flex items-center justify-end w-full hover:cursor-pointer text-xxs font-bold pl-auto"
        >
          <span className="mr-2">Show Password</span>
          <input
            type="checkbox"
            id="input-show-password"
            onChange={({ target }) => setShowPassword(target.checked)}
          />
        </label>
        <LoginButton />

        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-sky-500 w-full p-1 rounded-sm text-sm"
        >
          Go Back
        </button>
      </form>
    </div>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-slate-500 p-1 mt-1 mb-2 text-sm rounded-sm w-full flex justify-center"
      onClick={() => {}}
      disabled={pending}
    >
      {pending ? <Spinner /> : "Login"}
    </button>
  );
}
