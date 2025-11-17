import { useEffect, useState, useContext } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormStudentData from "../../../components/FormStudentData";
import { fetchData, SERVER_HOST } from "../../../modules/Api";
import { LoginContext } from "../../../context/LoginContext";

export default function SectionReadByRoll({ rollNo }) {
  const [viewData, setViewData] = useState(null);
  const [backToHome, setBackToHome] = useState(false);

  const { loginData } = useContext(LoginContext);

  function convertBackendDataToViewable(backendSudent) {
    backendSudent = { ...backendSudent, ...backendSudent.registration };
    delete backendSudent.registration;
    return backendSudent;
  }

  useEffect(() => {
    fetchData(
      "GET",
      `${SERVER_HOST}/api/admin/student/get-by-roll?rollNo=${rollNo}`,
      null,
      loginData.token
    ).then((result) => setViewData(convertBackendDataToViewable(result)));
  });

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionReadByRoll">
      <FormStudentData
        title="Read Student Details"
        isForm={false}
        viewData={viewData}
        rollNo={rollNo}
      />
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
