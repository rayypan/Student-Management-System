import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";

export default function ForgetUserName() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  let i = 0;
  const inputFields = [
    {
      id: i++,
      fieldName: "Username",
      type: "text",
      onChange: (e) => setUserName(e.target.value),
      value: userName,
    },
  ];

  function handleSubmit() {
    alert(userName);
    navigate(PathConstants.RootPaths.LOGIN);
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
