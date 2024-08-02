import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { CookieService } from "../cookies/cookie-service";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const session = CookieService.getSession();
  const authorization = `Bearer ${session}`;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(session ? { authorization } : {}),
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ["userName"],
      },
    },
  }),
  link: concat(authMiddleware, httpLink),
});
