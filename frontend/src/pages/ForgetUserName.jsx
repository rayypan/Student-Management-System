import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { apiCall } from "../modules/Api";

export default function ForgetUserName() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  let i = 0;
  const inputFields = [
    {
      id: i++,
      fieldName: "Email",
      type: "text",
      onChange: (e) => setEmail(e.target.value),
      value: email,
    },
  ];

  function handleSubmit() {
    apiCall("POST", "/auth/forgot-username", { email })
      .then((res) => {
        if (res?.message) alert(res.message);
        navigate(PathConstants.RootPaths.LOGIN);
      })
      .catch((error) => alert(error));
  }

  return (
    <div className="Card">
      <div className="InputFields">
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <label>
              <strong>{inputField.fieldName}:</strong>
              <input
                name={inputField.fieldName}
                type={inputField.type}
                value={inputField.value}
                onChange={inputField.onChange}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="BtnSubmit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
