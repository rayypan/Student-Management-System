import { useState, useContext } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import { fetchData, SERVER_HOST } from "../../../modules/Api";
import { LoginContext } from "../../../context/LoginContext";

export default function SectionDelete({ rollNo }) {
  const [backToHome, setBackToHome] = useState(false);
  const { loginData } = useContext(LoginContext);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  function handleDelete(e) {
    e.preventDefault();

    // Send the roll and call the back function to perform the delete op.
    fetchData(
      "DELETE",
      `${SERVER_HOST}/api/admin/student/delete-by-roll?rollNo=${rollNo}`,
      null,
      loginData.token
    ).then(() => alert(`Deleted Student ${rollNo} Successfully!`));
    
    setBackToHome(true);
  }

  return (
    <div className="AdminHomePage-SectionDelete">
      <form
        className="AdminHomePage-SectionDelete-Form"
        onSubmit={handleDelete}
      >
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
