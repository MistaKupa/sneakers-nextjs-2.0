import Header from "./_components/_header/Header";

import LandingPage from "./_components/_landing/LandingPage";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative max-w-[1440px] mx-auto">
        <LandingPage />
      </main>
    </>
  );
}
