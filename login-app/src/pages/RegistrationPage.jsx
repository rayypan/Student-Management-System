import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { Roles } from "../modules/Types";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({});

  let i = 0;
  const [fields, setFields] = useState(
    // prettier-ignore
    [
      { id: ++i, type: "text", name: "Username", onChange: handleChange, required: false },
      { id: ++i, type: "email", name: "Email", onChange: handleChange, required: true, },
      { id: ++i, type: "password", name: "Confirm Password", onChange: handleChange, required: true, },
      { id: ++i, type: "password", name: "Password", onChange: handleChange, required: true, },
      { id: ++i, type: "text", name: "First Name & Last Name", onChange: handleChange, required: true, },
      { id: ++i, type: "date", name: "DoB", onChange: handleChange, required: true, },
      { id: ++i, type: "select", name: "Role", onChange: handleChange, required: true, option: Object.values(Roles) },
    ]
  );

  const extraForm = [{ id: ++i, type: "text", name: "Subjects" }];

  const navigate = useNavigate();

  // e -> {
  //   target -> {
  //     "firstName": ...,
  //     "lastName": ...,
  //     ...
  //   }
  // }

  function handleSubmit(formEvent) {
    formEvent.preventDefault();
    let data = new FormData(formEvent.target);
    data = Object.fromEntries(data);
    setFormData(data);
    alert(JSON.stringify(data));
    navigate(PathConstants.RootPaths.LOGIN);
  }

  function handleChange(changeEvent) {
    if (changeEvent.target.name === "Role") {
      // student
      if (changeEvent.target.value === Roles.STUDENT) {
        setFields([...fields, ...extraForm]);
      }

      // admin
      else {
        setFormData((oldFormData) => {
          delete oldFormData["Subjects"];
          return oldFormData;
        });

        setFields((oldFields) =>
          oldFields.filter((field) => field.name !== "Subjects")
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
              <strong>{field.name}:</strong>
              <select
                name={field.name}
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
              <strong>{field.name}:</strong>
              <input
                name={field.name}
                type={field.type}
                required={field.required}
                onChange={field.onChange}
              />
            </label>
          )
        )}
      </div>

      {/* <ExtraDetailsForm
        options={extraform}
        buttonLabel={"Go with RegistrationPage"}
        onSubmit={handleSubmit}
      /> */}

      <div className="BtnSubmit">
        <button type="submit">Submit</button>
      </div>

      <nav className="Links">
        <Link to={PathConstants.RootPaths.LOGIN}>Back to Login</Link>
      </nav>
    </form>
  );
}
