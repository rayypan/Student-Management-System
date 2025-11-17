import { useState, createContext } from "react";

export const LoginContext = createContext({
  loginData: /** @type {{ token: string, expires: string } | null} */ (null),
  setLoginData: () => {},
});

export function LoginProvider({ children }) {
  const [loginData, setLoginData] = useState(
    /** @type {{ token: string, expires: string } | null} */ (null)
  );

  return (
    <UserContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </UserContext.Provider>
  );
}
