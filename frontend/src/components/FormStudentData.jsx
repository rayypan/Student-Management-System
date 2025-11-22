import { useState } from "react";
import { NameConstants } from "../modules/NameConstants";

import "../style/Form.css";

function BasicFields({ data, enabled }) {
  const fields = [
    { label: "Resgistration No", name: "registrationNo", enabled: false },
    { label: "Username", name: "username", enabled: false },
    { label: "Registered On", name: "registeredOn", enabled: false },
    { label: "First Name", name: "firstName", enabled },
    { label: "Last Name", name: "lastName", enabled },
    { label: "Email", name: "email", enabled: false },
  ];

  if (data == null) return null;

  return (
    <div className="FormReadOrUpdate-Fields">
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type="text"
            name={field.name}
            disabled={!field.enabled}
            defaultValue={data[field.name]}
          />
        </label>
      ))}
    </div>
  );
}

function StudentFields({ data, enabled }) {
  // TODO: change subjects input into a pick list coponent instead of HTML input
  const fields = [
    { label: "Roll", name: "rollNo", enabled: false },
    { label: "Subjects", name: "subjects", enabled },
  ];

  if (data == null) return null;

  return (
    <div className="FormReadOrUpdate-Fields">
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
          />
        </label>
      ))}
    </div>
  );
}

export default function FormStudentData({ title, isForm, viewData, onSubmit }) {
  const showButtons = isForm;

  const [enableUpdateBtn, setEnableUpdateBtn] = useState(true);
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false);

  var i = 0;
  const buttons = [
    {
      id: ++i,
      label: NameConstants.FormButtons.SUBMIT,
      enabled: enableSubmitBtn,
      visible: showButtons,
      onClick: void 0,
      type: "submit",
    },
    {
      id: ++i,
      label: NameConstants.FormButtons.UPDATE,
      enabled: enableUpdateBtn,
      visible: showButtons,
      onClick: handleUpdateClick,
      type: void 0,
    },
  ];

  async function handleSubmit(formEvent) {
    formEvent.preventDefault();

    const entries = new FormData(formEvent.target);
    const updateData = Object.fromEntries(entries);

    setEnableSubmitBtn((prev) => !prev);
    setEnableUpdateBtn((prev) => !prev);

    onSubmit?.(updateData);
  }

  function handleUpdateClick() {
    setEnableUpdateBtn(!enableUpdateBtn);
    setEnableSubmitBtn(!enableSubmitBtn);
  }

  return (
    <form className="FormReadOrUpdate-Form" onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <BasicFields data={viewData} enabled={enableSubmitBtn} />
      <StudentFields data={viewData} enabled={enableSubmitBtn} />

      <div className="FormReadOrUpdate-Buttons">
        {buttons.map((btn) =>
          btn.visible ? (
            <button
              key={btn.id}
              disabled={!btn.enabled}
              onClick={btn.onClick}
              type={/** @type {"submit"|undefined} */ (btn.type)}
            >
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
