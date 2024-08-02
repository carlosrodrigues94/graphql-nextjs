import Cookie from "js-cookie";

export class CookieService {
  static getSession(): string | null {
    const session = this.cookies().get("session");
    if (!session) return null;
    return session;
  }

  static deleteSession(): void {
    return this.cookies().delete("session");
  }

  static setSession(token: string) {
    return this.cookies().set("session", token);
  }

  private static cookies(): {
    get: (name: string) => string | undefined;
    delete: (name: string) => void;
    set: (name: string, value: string) => void;
  } {
    const isServerSide = typeof window === "undefined";
    if (isServerSide) {
      const { cookies: nextCookies } = require("next/headers");
      return {
        delete: (name: string) => {
          nextCookies().delete(name);
        },
        get: (name: string) => nextCookies().get(name)?.value,
        set: (name: string, value: string, options?: { expire?: number }) => {
          const cookieOptions = options?.expire
            ? { expires: options.expire }
            : {};
          nextCookies().set(name, value, cookieOptions);
        },
      };
    }
    return {
      delete: (name: string) => Cookie.remove(name),
      get: (name: string) => Cookie.get(name),
      set: (name: string, value: string, options?: { expire: number }) =>
        Cookie.set(name, value, options),
    };
  }
}
