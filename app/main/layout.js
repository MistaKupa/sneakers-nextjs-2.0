import Header from "../_components/_header/Header";

function MainLayout({ children }) {
  return <main className="w-full min-h-screen">{children}</main>;
}

export default MainLayout;
