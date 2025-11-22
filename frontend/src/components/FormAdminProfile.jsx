import { useState } from "react";
import { NameConstants } from "../modules/NameConstants";

import "../style/Form.css";

function BasicFields({ data, enabled }) {
  const fields = [
    { label: "Registration No", name: "registrationNo", enabled: false },
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

export default function FormAdminProfile({ isForm = true, viewData, onSubmit }) {
  const showButtons = isForm;

  const [enableUpdateBtn, setEnableUpdateBtn] = useState(isForm);
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(!enableUpdateBtn);

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
      <h1>
        {viewData == null
          ? "Welcome Admin"
          : `Welcome ${viewData.firstName} ${viewData.lastName}`}
      </h1>
      <BasicFields
        data={viewData}
        enabled={enableSubmitBtn}
      />

      <div className="FormReadOrUpdate-Buttons">
        {buttons.map((btn) =>
          btn.visible ? (
            <button
              key={btn.id}
              disabled={!btn.enabled}
              onClick={btn.onClick}
              type={/** @type {any} */ (btn.type)}
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
