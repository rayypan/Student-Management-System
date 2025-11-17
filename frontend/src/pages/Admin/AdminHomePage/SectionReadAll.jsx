import { useState, useEffect, useContext } from "react";
import { toTitleCase } from "../../../modules/Util.js";
import { fetchData, SERVER_HOST } from "../../../modules/Api.js";
import SectionAdminHomePage from "./SectionAdminHomePage.jsx";
import Accordion from "../../../components/Accordion.jsx";
import { LoginContext } from "../../../context/LoginContext.js";

export default function SectionReadAll() {
  const [backToHome, setBackToHome] = useState(false);
  const [studentData, setStudentData] = useState([]);

  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    fetchData(
      "GET",
      `${SERVER_HOST}/api/admin/student/get-all-enrolled`,
      null,
      loginData.token
    ).then((result) => setStudentData(result ? result : []));
  }, []);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  function convertBackendDataToViewable(backendSudent) {
    backendSudent = { ...backendSudent, ...backendSudent.registration };
    delete backendSudent.registration;
    return backendSudent;
  }

  return (
    <div className="AdminHomePage-SectionReadAll">
      <div className="AdminHomePage-SectionReadAll-Content">
        {studentData
          .map((d) => convertBackendDataToViewable(d))
          .map((student, idx) => (
            <Accordion
              key={idx}
              summaryComponent={
                <div>
                  <label>
                    Name:
                    {student.firstName} {student.lastName}
                  </label>
                  <label>
                    Roll:
                    {student.roll}
                  </label>
                </div>
              }
              detailComponent={
                <div className="OneStudent-Detail">
                  {Object.entries(student).map(([key, value], idx) => (
                    <label key={idx}>
                      {toTitleCase(key)}: <p>{value}</p>
                    </label>
                  ))}
                </div>
              }
            />
          ))}
      </div>

      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={(e) => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
