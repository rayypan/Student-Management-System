import { useNavigate } from "react-router-dom";
import { PathConstants } from "../../../modules/PathConstants";
import { NameConstants } from "../../../modules/NameConstants";

export default function AdminDashBoard() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(PathConstants.EnrollNavigate.ENROLL_STUDENT_LIST);
  }

  return (
    <>
      <div className="AdminHomePage-AdminDashBoard">
        <div className="AdminHomePage-AdminDashBoard-Upper">
          <button onClick={handleNavigate}>
            {NameConstants.EnrollStudButton.ENROLL_BUTTON}
          </button>
        </div>

        <div className="AdminHomePage-AdminDashBoard-Lower">
          <label>Open Tickets: 23%</label>
          <label>Resolved Tickets: 10%</label>
          <label>Resolve Rate: 5%</label>
        </div>
      </div>
    </>
  );
}
