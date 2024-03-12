import { createContext, useState } from "react";

export const context = createContext();

export default function ContextProvider({ children }) {
  const [userData, setUserData] = useState({ username: "", room: "" });
  return (
    <context.Provider value={{ userData, setUserData }}>
      {children}
    </context.Provider>
  );
}
