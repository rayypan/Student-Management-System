import { useState, useEffect } from "react";
import { NameConstants } from "../modules/NameConstants";
import { toTitleCase } from "../modules/Util";
import { Roles } from "../modules/Types";
import { fetchRandomFakeData } from "../modules/FakeData";

function BasicFields({ data, isSubmitButtonShown, onChange }) {
  return (
    <>
      <label>
        UID:
        <input
          type="text"
          name="uid"
          disabled={true}
          defaultValue={data.uid}
          onChange={onChange}
        />
      </label>

      <label>
        Registered On:
        <input
          type="text"
          name="registeredOn"
          disabled
          defaultValue={data.registeredOn}
          onChange={onChange}
        />
      </label>

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          disabled={!isSubmitButtonShown}
          defaultValue={data.firstName}
          onChange={onChange}
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          disabled={!isSubmitButtonShown}
          defaultValue={data.lastName}
          onChange={onChange}
        />
      </label>

      <label>
        Email:
        <input
          type="text"
          name="email"
          disabled
          defaultValue={data.email}
          onChange={onChange}
        />
      </label>
    </>
  );
}

function StudentFields({ data, isSubmitButtonShown, onChange }) {
  // TODO: change subjects input into a pick list coponent instead of HTML input
  return (
    <>
      <label>
        Roll:
        <input
          type="text"
          name="roll"
          disabled
          defaultValue={data.roll}
          onChange={onChange}
        />
      </label>

      <label>
        Subjects:
        <input
          type="text"
          name="subjects"
          disabled={!isSubmitButtonShown}
          defaultValue={data.subjects.join(", ")}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default function AdminOrStudentReadOrUpdateForm({
  isForm,
  role,
  rollNo,
}) {
  const [isSubmitButtonShown, setIsSubmitButtonShown] = useState(isForm);
  const [isUpdateButtonShown, setIsUpdateButtonShown] = useState(!isForm);

  var i = 0;
  const buttons = [
    {
      id: ++i,
      label: NameConstants.FormButtons.SUBMIT,
      disabled: isSubmitButtonShown,
      onClick: handleSubmitClick,
    },
    {
      id: ++i,
      label: NameConstants.FormButtons.UPDATE,
      disabled: isUpdateButtonShown,
      onClick: handleUpdateClick,
    },
  ];

  const [data, setData] = useState(null);

  const formData = {};

  useEffect(
    () =>
      void fetchRandomFakeData(rollNo)
        .then((data) => {
            setData(data);
            console.log(d)
        })
        .catch((e) => alert(e.toString())),
    []
  );

  async function handleSubmitClick() {
    setIsSubmitButtonShown((prev) => !prev);
    setIsUpdateButtonShown((prev) => !prev);
    // TODO: api call
  }

  function handleUpdateClick() {
    setIsUpdateButtonShown(!isUpdateButtonShown);
    setIsSubmitButtonShown(!isSubmitButtonShown);
  }

  function handleChange(e) {
    formData[e.target.name] = e.target.value;
  }

  if (data == null) {
    return <h1>Loading...</h1>
  }

  return (
    <form className="AdminOrStudentReadOrUpdate-Form">
      <BasicFields
        data={data}
        disabled={!isSubmitButtonShown}
        onChange={handleChange}
      />

      {role !== Roles.ADMIN && (
        <StudentFields
          data={data}
          disabled={!isSubmitButtonShown}
          onChange={handleChange}
        />
      )}

      <div className="AdminOrStudentReadOrUpdate-Form">
        {buttons.map((btn) => (
          <button key={btn.id} disabled={btn.disabled} onClick={btn.onClick}>
            {btn.label}
          </button>
        ))}
      </div>
    </form>
  );
}
