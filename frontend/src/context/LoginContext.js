import { useState, createContext } from "react";

export const LoginContext = createContext({
  loginData: null,
  setLoginData: () => {},
});

export function LoginProvider({ children }) {
  const [loginData, setLoginData] = useState(null);

  return (
    <UserContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </UserContext.Provider>
  );
}
