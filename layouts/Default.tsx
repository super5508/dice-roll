"use client";

import React, { PropsWithChildren } from "react";
import { RollContextProvider } from "@/context/RollContext";

export const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <RollContextProvider>{children}</RollContextProvider>;
};
