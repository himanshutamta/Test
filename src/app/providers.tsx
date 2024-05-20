"use client";
import { NextUIProvider } from "@nextui-org/system";
import React from "react";
import store from "./store/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NextUIProvider>
        <Provider store={store}>{children}</Provider>
      </NextUIProvider>
    </div>
  );
}
