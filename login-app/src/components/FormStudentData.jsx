import { useState, useEffect } from "react";
import { NameConstants } from "../modules/NameConstants";
import { fetchRandomFakeData } from "../modules/FakeData";
import { Roles } from "../modules/Types";

function BasicFields({ data, enabled, onChange }) {
  const fields = [
    { label: "UID", name: "uid", enabled: false },
    { label: "Registered On", name: "registeredOn", enabled: false },
    { label: "First Name", name: "firstName", enabled },
    { label: "Last Name", name: "lastName", enabled },
    { label: "Email", name: "email", enabled: false },
  ];

  return (
    <>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type="text"
            name={field.name}
            disabled={!field.enabled}
            defaultValue={data[field.name]}
            onChange={onChange}
          />
        </label>
      ))}
    </>
  );
}

function StudentFields({ data, enabled, onChange }) {
  // TODO: change subjects input into a pick list coponent instead of HTML input
  const fields = [
    { label: "Roll", name: "roll", enabled: false },
    { label: "Subjects", name: "subjects", enabled },
  ];

  return (
    <>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type="text"
            name={field.name}
            disabled={!field.enabled}
            defaultValue={
              Array.isArray(data[field.name])
                ? data[field.name].join(", ")
                : data[field.name]
            }
            onChange={onChange}
          />
        </label>
      ))}
    </>
  );
}

export default function FormStudentData({ isForm, rollNo }) {
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(isForm);
  const [enableUpdateBtn, setEnableUpdateBtn] = useState(!isForm);
  const [showUpdateBtn, ] = useState(!isForm);

  var i = 0;
  const buttons = [
    {
      id: ++i,
      label: NameConstants.FormButtons.SUBMIT,
      enabled: enableSubmitBtn,
      visible: true,
      onClick: handleSubmitClick,
    },
    {
      id: ++i,
      label: NameConstants.FormButtons.UPDATE,
      enabled: enableUpdateBtn,
      visible: showUpdateBtn,
      onClick: handleUpdateClick,
    },
  ];

  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(
    () =>
      void fetchRandomFakeData(Roles.STUDENT, rollNo)
        .then((data) => setData(data))
        .catch((e) => alert(e.toString())),
    [rollNo]
  );

  async function handleSubmitClick() {
    setEnableSubmitBtn((prev) => !prev);
    setEnableUpdateBtn((prev) => !prev);
    // TODO: api call
    alert(JSON.stringify(formData));
  }

  function handleUpdateClick() {
    setEnableUpdateBtn(!enableUpdateBtn);
    setEnableSubmitBtn(!enableSubmitBtn);
  }

  function handleChange(e) {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  }

  if (data == null) {
    return <h1>Loading...</h1>;
  }

  return (
    <form className="FormStudentData-Form">
      <h1>Student Details</h1>
      <BasicFields
        data={data}
        enabled={enableSubmitBtn}
        onChange={handleChange}
      />
      <StudentFields
        data={data}
        enabled={enableSubmitBtn}
        onChange={handleChange}
      />

      <div className="FormStudentData-Buttons">
        {buttons.map((btn) =>
          btn.visible ? (
            <button key={btn.id} disabled={!btn.enabled} onClick={btn.onClick}>
              {btn.label}
            </button>
          ) : (
            <></>
          )
        )}
      </div>
    </form>
  );
}
