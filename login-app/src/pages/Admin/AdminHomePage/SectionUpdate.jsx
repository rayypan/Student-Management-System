import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormStudentData from "../../../components/FormStudentData";

export default function SectionUpdate({ rollNo }) {
  const [backToHome, setBackToHome] = useState(false);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  function handleSubmit(formData) {
    // send data to backend
    alert("submitted update");
  }

  return (
    <div className="AdminHomePage-SectionUpdate">
      <FormStudentData
        title="Update Student Details"
        isForm={true}
        rollNo={rollNo}
        onSubmit={handleSubmit}
      />
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
