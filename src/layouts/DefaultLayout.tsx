import type { PropsWithChildren } from "react";
import TheHeader from "../components/TheHeader";

type DefaultLayoutProps = PropsWithChildren<{
  className?: string,
}>;

export default function DefaultLayout({ children, className }: DefaultLayoutProps) {
  return <>
    <TheHeader />

    <main className={className}>
      {children}
    </main>
  </>
}
