import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import GlobalLayout from "@/components/GlobalLayout";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <>
      <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
      </GlobalLayout>
    </>
  );
}
