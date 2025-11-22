import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { apiCall } from "../modules/Api";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  function handleSubmit() {
    if (!token) {
      alert("Invalid credentials. Please try again.");
    }
    if (password !== confPassword) {
      alert("Passwords don't match");
      return;
    }

    apiCall("POST", "/auth/reset-password/verify-and-reset", { password, token })
      .then((res) => {
        if (res?.message) alert(res.message);
        // replace current URL (with token)
        navigate(PathConstants.RootPaths.LOGIN, { replace: true });
      })
      .catch((error) => alert(error));
  }

  let i = 0;
  const inputFields = [
    {
      fieldName: "Password",
      id: i++,
      required: true,
      type: "password",
      onChange: (e) => setPassword(e.target.value),
      value: password,
    },
    {
      fieldName: "Confirm Password",
      id: i++,
      required: true,
      type: "password",
      onChange: (e) => setConfPassword(e.target.value),
      value: confPassword,
    },
  ];

  return (
    <div className="Card">
      <div className="InputFields">
        {inputFields.map((inputField) => (
          <label key={inputField.id}>
            <strong>{inputField.fieldName}:</strong>
            <input
              name={inputField.fieldName}
              required={inputField.required}
              type={inputField.type}
              minLength={inputField.minLength}
              maxLength={inputField.minLength}
              onChange={inputField.onChange}
              value={inputField.value}
            />
          </label>
        ))}

        <div className="BtnSubmit">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
