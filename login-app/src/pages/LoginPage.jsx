import { useState } from "react";
import { Link } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { fetchFakeLogin } from "../modules/FakeData";
import { Roles } from "../modules/Types";
import StudentHomePage from "./Student/StudentHomePage";
import AdminHomePage from "./Admin/AdminHomePage/AdminHomePage";

export default function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(null);

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
      fieldName: "Username",
      type: "text",
      value: userName,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      id: ++i,
      fieldName: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  //when login is done, write to database
  async function handleSubmit(event) {
    event.preventDefault();
    // a wrapper to keep the received data from backend
    const loginData = await fetchFakeLogin();
    setLoginData(loginData);
    alert("Submit button clicked");
  }

  function AdminOrStudent({ role }) {
    if (role === Roles.STUDENT) {
      return <StudentHomePage rollNo={loginData.roll} />;
    } else {
      return <AdminHomePage />;
    }
  }

  if (loginData != null) {
    return <AdminOrStudent role={loginData.role} />;
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
