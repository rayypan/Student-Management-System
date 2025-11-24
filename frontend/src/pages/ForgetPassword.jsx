import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { apiCall } from "../modules/Api";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isDisabled,setIsDisabled] = useState(false);

  function handleSubmit() {
    setIsDisabled(true);
    apiCall("POST", "/auth/reset-password/send-email", { email })
      .then((res) => {
        if (res?.message) alert(res.message);
        navigate(PathConstants.RootPaths.LOGIN);
      })
      .catch((error) => alert(error));
  }

  let i = 0;
  const inputFields = [
    {
      fieldName: "Email",
      id: i++,
      required: true,
      maxLenth: null,
      minLength: null,
      type: "text",
      onChange: (e) => setEmail(e.target.value),
      value: email,
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
              onChange={inputField.onChange}
              value={inputField.value}
            />
          </label>
        ))}

        <div className="BtnSubmit">
          <button onClick={handleSubmit} disabled={isDisabled} style={{cursor:"not-allowed"}}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
