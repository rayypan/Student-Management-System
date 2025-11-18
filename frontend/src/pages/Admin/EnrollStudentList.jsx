import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import { NameConstants } from "../../modules/NameConstants";
import { PathConstants } from "../../modules/PathConstants";
import { fetchData, SERVER_HOST } from "../../modules/Api";
import { LoginContext } from "../../context/LoginContext";

import "../../style/EnrollStudentList.css";

function SummaryStudent({ oneStudent }) {
  // TODO: isDisabled not working for buttons
  const [isDisabled, setIsDisabled] = useState(false);

  const { loginData } = useContext(LoginContext);

  function handleAccept() {
    fetchData(
      "POST",
      `${SERVER_HOST}/api/admin/student/enroll-by-roll?rollNo=${oneStudent.rollNo}`,
      null,
      loginData?.token
    )
      .then(() => setIsDisabled(true))
      .catch((error) => alert(error));
  }

  function handleReject() {
    fetchData(
      "POST",
      `${SERVER_HOST}/api/admin/student/reject-by-roll?rollNo=${oneStudent.rollNo}`,
      null,
      loginData?.token
    )
      .then(() => setIsDisabled(true))
      .catch((error) => alert(error));
  }

  return (
    <div className="OneStudent-Summary">
      <div className="OneStudent-Row-Left">
        <div className="OneStudent-Name">
          {oneStudent.firstName} {oneStudent.lastName}
        </div>
        <div className="OneStudent-EnrolledOn">{oneStudent.rollNo}</div>
      </div>

      <div className="OneStudent-Row-Right">
        <button
          className="OneStudent-Enrollment-BtnAccept"
          onClick={handleAccept}
          disabled={isDisabled}
        >
          {NameConstants.EnrollStudButton.ACCEPT}
        </button>

        <button
          className="OneStudent-Enrollment-BtnReject"
          onClick={handleReject}
          disabled={isDisabled}
        >
          {NameConstants.EnrollStudButton.REJECT}
        </button>
      </div>
    </div>
  );
}

function DetailStudent({ oneStudent }) {
  return (
    <div className="OneStudent-Detail">
      <div className="OneStudent-Row-Left">
        <label className="OneStudent-Item">
          Name:{" "}
          <span>
            {oneStudent.firstName} {oneStudent.lastName}
          </span>
        </label>

        <label className="OneStudent-Item">
          Roll: <span>{oneStudent.rollNo}</span>
        </label>

        <label className="OneStudent-Item">
          Subjects: <span>{oneStudent.subjects}</span>
        </label>
      </div>

      <div className="OneStudent-Row-Right">
        <label className="OneStudent-Item">
          Username: <span>{oneStudent.username}</span>
        </label>

        <label className="OneStudent-Item">
          Email: <span>{oneStudent.email}</span>
        </label>
      </div>
    </div>
  );
}

export default function EnrollStudentList() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);

  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    fetchData(
      "GET",
      `${SERVER_HOST}/api/admin/student/get-all-notenrolled`,
      null,
      loginData?.token
    ).then((result) => setStudentData(result || []));
  }, []);

  function handleClick() {
    navigate(PathConstants.RootPaths.ADMIN_HOME_PAGE);
  }

  function convertBackendDataToViewable(backendSudent) {
    backendSudent = { ...backendSudent, ...backendSudent.registration };
    delete backendSudent.registration;
    return backendSudent;
  }

  return (
    <div className="EnrollStudentList">
      <div className="EnrollStudentList-List">
        {studentData
          .map((d) => convertBackendDataToViewable(d))
          .map((oneStudent, idx) => (
            <Accordion
              key={idx}
              summaryComponent={<SummaryStudent oneStudent={oneStudent} />}
              detailComponent={<DetailStudent oneStudent={oneStudent} />}
            />
          ))}
      </div>

      <a href={PathConstants.DEFAULT_HREF} onClick={handleClick}>
        Back to Home Page
      </a>
    </div>
  );
}
