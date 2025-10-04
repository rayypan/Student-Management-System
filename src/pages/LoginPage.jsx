import { useState } from "react";
import { Link } from "react-router-dom";
import { UrlPaths } from "../modules/UrlPaths";

export default function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let i = 0;
  const options = [
    { id: ++i, text: "Forget Password", path: UrlPaths.FORGOT_PASSWORD },
    { id: ++i, text: "Forget Username", path: UrlPaths.FORGOT_USERNAME },
    { id: ++i, text: "Not Registered?", path: UrlPaths.REGISTER },
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

  function handleSubmit(event) {
    alert("Submit button clicked");
  }

  return (
    <div className="Card">
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
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <nav className="Links">
        {options.map((option) => (
          <div key={option.id}>
            <Link to={option.path}>{option.text}</Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
