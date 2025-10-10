import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import { NameConstants } from "../../modules/NameConstants";
import { PathConstants } from "../../modules/PathConstants";

import "../../style/EnrollStudentList.css"

const studentData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  roll: `R${1000 + i}`,
  class: `Class ${(i % 5) + 1}`,
  section: ["A", "B", "C"][i % 3],
  marks: Math.floor(Math.random() * 100),
  email: `student${i + 1}@school.edu`,
  enrolledOn: new Date(),
}));

function SummaryStudent({ oneStudent }) {
  return (
    <div className="OneStudent-Summary">
      <div className="OneStudent-Row-Left">
        <div className="OneStudent-Name">{oneStudent.name}</div>
        <div className="OneStudent-EnrolledOn">
          {oneStudent.enrolledOn.toString()}
        </div>
      </div>

      <div className="OneStudent-Row-Right">
        <button className="OneStudent-Enrollment-BtnAccept">
          {NameConstants.EnrollStudButton.ACCEPT}
        </button>

        <button className="OneStudent-Enrollment-BtnReject">
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
          Name: <span>{oneStudent.name}</span>
        </label>

        <label className="OneStudent-Item">
          Roll: <span>{oneStudent.roll}</span>
        </label>

        <label className="OneStudent-Item">
          Class: <span>{oneStudent.class}</span>
        </label>
      </div>

      <div className="OneStudent-Row-Right">
        <label className="OneStudent-Item">
          Section: <span>{oneStudent.section}</span>
        </label>

        <label className="OneStudent-Item">
          Marks: <span>{oneStudent.marks}</span>
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

  function handleClick() {
    navigate(PathConstants.RootPaths.ADMIN_HOME_PAGE);
  }
  return (
    <div className="EnrollStudentList">
  
      <div className="EnrollStudentList-List">
        {studentData.map((oneStudent, idx) => (
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
