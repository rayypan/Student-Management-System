import FormStudentData from "../../components/FormStudentData";

import "../../style/StudentHomePage.css";

export default function StudentHomePage({ rollNo }) {
  const heading = "Welcome";
  const welcomeMessage =
    "The elevator to success is out of order. You'll have to take the stairs.";

  function Default() {
    return <FormStudentData isForm={true} rollNo={rollNo} />;
  }

  function MainContentView() {
    return <Default />;
  }

  return (
    <div className="StudentHomePage-Container">
      <div className="StudentHomePage-Card">
        <div className="StudentHomePage-SideBar">
          {heading}
          {welcomeMessage}
        </div>
        <div className="StudentHomePage-Content">
          <MainContentView />
        </div>
      </div>
    </div>
  );
}
