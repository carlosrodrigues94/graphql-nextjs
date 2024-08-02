import { FC } from "react";
import "./style.css";
import "@/app/globals.css";

export const Spinner: FC<{}> = () => {
  return <span className={`loader`} />;
};
