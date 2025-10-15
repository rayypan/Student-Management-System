import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";

export default function SectionDelete({ rollNo }) {
  const [backToHome, setBackToHome] = useState(false);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  function handleDelete(e) {
    e.preventDefault();

    //send the roll and call the back function to perform the delete op.
    alert("Deleted Successfully");
    setBackToHome(true)
  }

  return (
    <div className="AdminHomePage-SectionDelete" >
      <form className="AdminHomePage-SectionDelete-Form" onSubmit={handleDelete}>
        <h1>Delete Student</h1>
        <h4>{rollNo}</h4>
        <button type="submit">Delete</button>
      </form>

      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
