import { useState } from "react";
import { toTitleCase } from "../../../modules/Util.js";
import SectionAdminHomePage from "./SectionAdminHomePage.jsx";
import Accordion from "../../../components/Accordion.jsx";

const studentData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  roll: `R${1000 + i}`,
  class: `Class ${(i % 5) + 1}`,
  section: ["A", "B", "C"][i % 3],
  marks: Math.floor(Math.random() * 100),
  email: `student${i + 1}@school.edu`,
  enrolledOn: new Date().toString(),
}));

export default function SectionReadAll() {
  const [backToHome, setBackToHome] = useState(false);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionReadAll">
      <div className="AdminHomePage-SectionReadAll-Content">
        {studentData.map((student, idx) => (
          <Accordion
            key={idx}
            summaryComponent={
              <div>
                <label>
                  Name:
                  {student.name}
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
