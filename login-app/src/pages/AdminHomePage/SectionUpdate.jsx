import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";

export default function SectionUpdate({ rollNo }) {
  const [sumbitted, setSubmitted] = useState(false);

  if (sumbitted) {
    return <SectionAdminHomePage />;
  }

  return (
    <>
      <form className="AdminHomePage-SectionUpdate">
        <h1>Update Student Details</h1>
        <h4>{rollNo}</h4>
      </form>{" "}
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setSubmitted(true)}
      >
        Back to Home
      </button>
    </>
  );
}
