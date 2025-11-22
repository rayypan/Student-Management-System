import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { Roles } from "../modules/Types";
import { LoginContext } from "../context/LoginContext";
import { apiCall } from "../modules/Api";
import StudentHomePage from "./Student/StudentHomePage";
import AdminHomePage from "./Admin/AdminHomePage/AdminHomePage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();

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
    const loginData = await apiCall("POST", `/auth/login`, {
      email,
      password,
    }).catch((error) => alert(error));

    // update the context
    if (loginData != null) {
      setLoginData(loginData);
    }

    if (loginData.role === Roles.ADMIN) {
      navigate(PathConstants.RootPaths.ADMIN_HOME_PAGE);
    } else {
      navigate(PathConstants.RootPaths.STUDENT_HOME_PAGE);
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
