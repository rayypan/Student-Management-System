import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormStudentData from "../../../components/FormStudentData";

export default function SectionReadByRoll({ rollNo }) {
  const [sumbitted, setSubmitted] = useState(false);

  if (sumbitted) {
    return <SectionAdminHomePage />;
  }
   

  return (
    <div className="AdminHomePage-SectionReadByRoll">
      <div className="AdminHomePage-SectionReadByRoll-Content">
        <h1>Read Student Details</h1>
        <h4>{rollNo}</h4>
        <FormStudentData isForm={false} rollNo={rollNo} />
      </div>

      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setSubmitted(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
