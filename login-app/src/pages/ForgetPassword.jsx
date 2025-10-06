import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [otp, setOtp] = useState("");

  function handleSubmit() {
    alert(JSON.stringify({ emailOrUserName, otp }));
    navigate(PathConstants.RootPaths.LOGIN);
  }

  let i = 0;
  const inputFields = [
    {
      fieldName: "Email / Username",
      id: i++,
      required: true,
      maxLenth: null,
      minLength: null,
      type: "text",
      onChange: (e) => setEmailOrUserName(e.target.value),
      value: emailOrUserName,
    },
    {
      fieldName: "OTP",
      id: i++,
      required: true,
      maxLenth: 6,
      minLength: 6,
      type: "password",
      onChange: (e) => setOtp(e.target.value),
      value: otp,
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
