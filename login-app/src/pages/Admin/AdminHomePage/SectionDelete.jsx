import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";

export default function SectionDelete({ rollNo }) {
  const [sumbitted, setSubmitted] = useState(false);

  if (sumbitted) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionDelete">
      <form className="AdminHomePage-SectionDelete-Form">
        <h1>Delete Student</h1>
        <h4>{rollNo}</h4>
      </form>

      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setSubmitted(true)}
      >
        Back to Home
      </button>
    </div>
    
  );
}
