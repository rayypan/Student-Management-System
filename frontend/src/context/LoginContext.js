import { useState, createContext } from "react";

export const LoginContext = createContext({
  loginData:
    /** @type {{ token: string, expires: string, role: string } | null} */ (
      null
    ),
  setLoginData:
    /** @type {React.Dispatch<React.SetStateAction<{ token: string; expires: string;  role: string } | null>>} */ (
      () => {}
    ),
});

export function LoginProvider({ children }) {
  const [loginData, setLoginData] = useState(
    /** @type {{ token: string, expires: string, role: string } | null} */ (
      null
    )
  );

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
}
