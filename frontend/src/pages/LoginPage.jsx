import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { fetchFakeLogin } from "../modules/FakeData";
import { Roles } from "../modules/Types";
import { LoginContext } from "../context/LoginContext";
import { fetchData } from "../modules/Api";
import StudentHomePage from "./Student/StudentHomePage";
import AdminHomePage from "./Admin/AdminHomePage/AdminHomePage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginData, setLoginData] = useContext(LoginContext);

  let i = 0;
  const options = [
    {
      id: ++i,
      text: "Forget Password",
      path: PathConstants.RootPaths.FORGOT_PASSWORD,
    },
    {
      id: ++i,
      text: "Forget Username",
      path: PathConstants.RootPaths.FORGOT_USERNAME,
    },
    {
      id: ++i,
      text: "Not Registered?",
      path: PathConstants.RootPaths.REGISTER,
    },
  ];

  const inputFields = [
    {
      id: ++i,
      fieldName: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: ++i,
      fieldName: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  // when login is done, write to database
  async function handleSubmit(event) {
    event.preventDefault();
    // a wrapper to keep the received data from backend
    const loginData = await fetchData(
      "POST",
      "https://localhost:8080/api/auth/login",
      { email, password }
    );
    if (loginData != null) {
      setLoginData(loginData);
    }
  }

  if (loginData != null) {
    if (loginData.role === Roles.STUDENT) {
      return <StudentHomePage />;
    } else {
      return <AdminHomePage />;
    }
  }

  return (
    <form className="Card" onSubmit={handleSubmit}>
      <div className="InputFields">
        {inputFields.map((inputField) => (
          <label key={inputField.id}>
            <strong>{inputField.fieldName}:</strong>
            <input
              required
              type={inputField.type}
              name={inputField.fieldName}
              value={inputField.value}
              onChange={inputField.onChange}
            />
          </label>
        ))}
      </div>

      <div className="BtnSubmit">
        <button type="submit">Submit</button>
      </div>

      <nav className="Links">
        {options.map((option) => (
          <div key={option.id}>
            <Link to={option.path}>{option.text}</Link>
          </div>
        ))}
      </nav>
    </form>
  );
}
