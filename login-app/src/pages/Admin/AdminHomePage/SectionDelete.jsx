import { useState } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";

export default function SectionDelete({ rollNo }) {
  const [sumbitted, setSubmitted] = useState(false);

  if (sumbitted) {
   
    return <SectionAdminHomePage />;
  }

  function handleDelete(){
        //send the roll and call the back function to perform the delete op.
        alert("Deleted Successfully")
        return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionDelete" onSubmit={handleDelete}>
      <form className="AdminHomePage-SectionDelete-Form">
        <h1>Delete Student</h1>
        <h4>{rollNo}</h4>
        <button type="submit">Delete</button>
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
