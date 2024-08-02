"use server";

import { CookieService } from "@/services/cookies/cookie-service";
import { client } from "@/services/graphql/client";
import { ApolloError, gql } from "@apollo/client";
import { redirect } from "next/navigation";
import z from "zod";

type SingInState = {
  token: string;
  email: string;
  error?: string;
};

export async function signIn(
  currentState: SingInState,
  data: FormData
): Promise<SingInState> {
  try {
    const email = data.get("email");
    const password = data.get("password");

    const schema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "password must contain at least 8 characters" }),
    });

    const user = schema.parse({ email, password });

    const result = await client.mutate({
      mutation: gql`
        mutation SignIn($email: String!, $password: String!) {
          signIn(email: $email, password: $password) {
            email
            token
          }
        }
      `,
      variables: user,
    });

    CookieService.setSession(result.data.signIn.token);

    return {
      token: result.data.signIn.token,
      email: result.data.signIn.email,
    };
  } catch (err) {
    const error = err as any;
    let message = "";

    if (error instanceof ApolloError) {
      message = error?.cause?.message || "Error on client request";
    }

    if (error.issues) {
      message = error.errors
        .map((item: Record<string, any>) => item.message)
        .join(", ");
    }

    if (!message) {
      message = "Unhandled Error";
    }

    return {
      ...currentState,
      error: message,
    };
  } finally {
    if (CookieService.getSession()) {
      redirect("/dashboard");
    }
  }
}
