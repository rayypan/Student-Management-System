import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormAdminProfile from "../../../components/FormAdminProfile";

export default function SectionProfile() {
  const [backToHome, setBackToHome] = useState(false);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionProfile">
      <FormAdminProfile isForm={true} />
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
