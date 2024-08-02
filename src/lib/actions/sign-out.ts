"use server";

import { CookieService } from "@/services/cookies/cookie-service";
import { redirect } from "next/navigation";

export async function signOut() {
  CookieService.deleteSession();
  redirect("/login");
}
