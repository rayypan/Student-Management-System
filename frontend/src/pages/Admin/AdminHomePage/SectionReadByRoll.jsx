import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormStudentData from "../../../components/FormStudentData";

export default function SectionReadByRoll({ rollNo }) {
  const [backToHome, setBackToHome] = useState(false);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionReadByRoll">
      <FormStudentData
        title="Read Student Details"
        isForm={false}
        rollNo={rollNo}
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
