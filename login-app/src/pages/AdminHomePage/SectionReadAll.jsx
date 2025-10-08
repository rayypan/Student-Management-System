import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";

export default function SectionReadAll() {
  const [sumbitted, setSubmitted] = useState(false);

  if (sumbitted) {
    return <SectionAdminHomePage />;
  }

  return (
    <>
      <div className="AdminHomePage-SectionReadAll">
        <h1>Read All Students</h1>
      </div>
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setSubmitted(true)}
      >
        Back to Home
      </button>
    </>
  );
}
