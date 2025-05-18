import Header from "@/app/_components/_header/Header";

export default function SiteLayout({ children }) {
  return <main className="w-full max-w-[1440px] mx-auto ">{children}</main>;
}
