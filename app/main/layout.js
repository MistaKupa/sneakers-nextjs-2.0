import Header from "../_components/_header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default MainLayout;
