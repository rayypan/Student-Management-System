import { useState } from "react";
import { NameConstants } from "../modules/NameConstants";

import "../style/Form.css";

function BasicFields({ data, enabled, onChange }) {
  const fields = [
    { label: "UID", name: "uid", enabled: false },
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
            onChange={onChange}
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
      onClick: null,
      type: "submit",
    },
    {
      id: ++i,
      label: NameConstants.FormButtons.UPDATE,
      enabled: enableUpdateBtn,
      visible: showButtons,
      onClick: handleUpdateClick,
      type: null,
    },
  ];

  const [updateData, setUpdateData] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    setEnableSubmitBtn((prev) => !prev);
    setEnableUpdateBtn((prev) => !prev);
    alert(JSON.stringify(updateData));

    onSubmit?.(updateData);
  }

  function handleUpdateClick() {
    setEnableUpdateBtn(!enableUpdateBtn);
    setEnableSubmitBtn(!enableSubmitBtn);
  }

  function handleChange(e) {
    setUpdateData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
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
        onChange={handleChange}
      />

      <div className="FormReadOrUpdate-Buttons">
        {buttons.map((btn) =>
          btn.visible ? (
            <button
              key={btn.id}
              disabled={!btn.enabled}
              onClick={btn.onClick}
              type={btn.type}
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
