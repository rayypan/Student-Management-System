import { Link, useNavigate } from "react-router-dom";
import { UrlPaths } from "../modules/UrlPaths";

export default function RegistrationPage() {
  const formData = {
    Username: "",
    Email: "",
    "Confirm Password": "",
    Password: "",
    "First Name & Last Name": "",
    DoB: "",
    Role: "",
  };

  let i = 0;
  const fields = [
    {
      id: i++,
      type: "text",
      name: "Username",
      onChange: handleChange,
      required: false,
    },
    {
      id: i++,
      type: "email",
      name: "Email",
      onChange: handleChange,
      required: true,
    },
    {
      id: i++,
      type: "password",
      name: "Confirm Password",
      onChange: handleChange,
      required: true,
    },
    {
      id: i++,
      type: "password",
      name: "Password",
      onChange: handleChange,
      required: true,
    },
    {
      id: i++,
      type: "text",
      name: "First Name & Last Name",
      onChange: handleChange,
      required: true,
    },
    {
      id: i++,
      type: "date",
      name: "DoB",
      onChange: handleChange,
      required: true,
    },
    {
      id: i++,
      type: "combobox",
      name: "Role",
      onChange: handleChange,
      required: true,
    },
  ];

  const navigate = useNavigate();

  function handleSubmit() {
    alert(JSON.stringify(formData));
    navigate(UrlPaths.LOGIN);
  }

  function handleChange(event) {
    for (const field of fields) {
      if (event.target.name === field.name) {
        formData[field.name] = event.target.value;
      }
    }
  }

  return (
    <div className="Card">
      <div className="InputFields">
        {fields.map((field) => (
          <label key={field.id}>
            <strong>{field.name}:</strong>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              onChange={field.onChange}
            />
          </label>
        ))}
      </div>

      <div className="BtnSubmit">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <nav className="Links">
        <Link to={UrlPaths.LOGIN}>Back to Login</Link>
      </nav>
    </div>
  );
}
