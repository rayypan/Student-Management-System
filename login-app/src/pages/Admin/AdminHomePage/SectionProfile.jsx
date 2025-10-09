import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";

export default function SectionProfile() {
  const [sumbitted, setSubmitted] = useState(false);

  if (sumbitted) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionProfile">
      <form className="AdminHomePage-SectionProfile-Form">
        <h1>Your Admin Profile</h1>
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
