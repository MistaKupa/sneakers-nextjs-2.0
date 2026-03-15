import Header from "@/_components/_header/Header";
import { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <main className="w-full mx-auto">{children}</main>;
}
