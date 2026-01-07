"use client";

import { createContext, useContext, useState } from "react";

const NavColorContext = createContext();

const NavColorProvider = ({ children }) => {
  const [textColorClass, setTextColorClass] = useState("text-dark-100");

  return (
    <NavColorContext.Provider value={{ textColorClass, setTextColorClass }}>
      {children}
    </NavColorContext.Provider>
  );
};

function useNavColor() {
  const context = useContext(NavColorContext);
  if (!context) {
    throw new Error(
      "useNavColorContext must be used within useNavColorProvider"
    );
  }
  return context;
}

export { NavColorProvider, useNavColor };
