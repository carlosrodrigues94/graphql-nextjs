"use client";

import { client } from "@/services/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <ToastContainer />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Fragment>
  );
}
