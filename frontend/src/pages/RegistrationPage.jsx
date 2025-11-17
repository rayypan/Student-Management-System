import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { Roles } from "../modules/Types";
import { SERVER_HOST, fetchData } from "../modules/Api";

export default function RegistrationPage() {
  // const [formData, setFormData] = useState({});

  let i = 0;
  const [fields, setFields] = useState(
    // prettier-ignore
    [
      { id: ++i, type: "text",     label: "Username",         name: "username",     onChange: handleChange, required: false },
      { id: ++i, type: "email",    label: "Email",            name: "email",        onChange: handleChange, required: true, },
      { id: ++i, type: "password", label: "Confirm Password", name: "confPassword", onChange: handleChange, required: true, },
      { id: ++i, type: "password", label: "Password",         name: "password",     onChange: handleChange, required: true, },
      { id: ++i, type: "text",     label: "First Name",       name: "firstName",    onChange: handleChange, required: true, },
      { id: ++i, type: "text",     label: "Last Name",        name: "lastName",     onChange: handleChange, required: true, },
      { id: ++i, type: "date",     label: "DoB",              name: "dob",          onChange: handleChange, required: true, },
      { id: ++i, type: "select",   label: "Role",             name: "role",         onChange: handleChange, required: true, option: Object.values(Roles) },
    ]
  );

  const extraForm = [
    { id: ++i, type: "text", label: "subjects", name: "subjects" },
  ];

  const navigate = useNavigate();

  function handleSubmit(formEvent) {
    formEvent.preventDefault();
    let data = new FormData(formEvent.target);
    data = Object.fromEntries(data);
    // setFormData(data);
    // Send data to backend
    if (data["role"] === Roles.ADMIN) {
      fetchData("POST", `${SERVER_HOST}/auth/admin/register`, data).then(() =>
        alert("Admin Registration Successfull!")
      );
    } else if (data["role"] === Roles.STUDENT) {
      fetchData("POST", `${SERVER_HOST}/auth/student/register`, data).then(() =>
        alert("Student Registration Successfull!")
      );
    }
    navigate(PathConstants.RootPaths.LOGIN);
  }

  function handleChange(changeEvent) {
    if (changeEvent.target.label === "Role") {
      // student
      if (changeEvent.target.value === Roles.STUDENT) {
        setFields([...fields, ...extraForm]);
      }

      // admin
      else {
        // setFormData((oldFormData) => {
        //   delete oldFormData["Subjects"];
        //   return oldFormData;
        // });

        setFields((oldFields) =>
          oldFields.filter((field) => field.label !== "Subjects")
        );
      }

      // end of if-role
    }
  }

  return (
    <form className="Card" onSubmit={handleSubmit}>
      <div className="InputFields">
        {fields.map((field) =>
          field.type === "select" ? (
            <label key={field.id}>
              <strong>{field.label}:</strong>
              <select
                name={field.label}
                type={field.type}
                required={field.required}
                onChange={field.onChange}
              >
                {field.option.map((optn, idx) => (
                  <option key={idx} value={optn}>
                    {optn}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label key={field.id}>
              <strong>{field.label}:</strong>
              <input
                name={field.label}
                type={field.type}
                required={field.required}
                onChange={field.onChange}
              />
            </label>
          )
        )}
      </div>

      <div className="BtnSubmit">
        <button type="submit">Submit</button>
      </div>

      <nav className="Links">
        <Link to={PathConstants.RootPaths.LOGIN}>Back to Login</Link>
      </nav>
    </form>
  );
}
