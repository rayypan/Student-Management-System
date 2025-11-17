import { useState, useEffect, useContext } from "react";
import FormStudentData from "../../components/FormStudentData";
import { fetchData, SERVER_HOST } from "../../modules/Api";
import { LoginContext } from "../../context/LoginContext";

import "../../style/StudentHomePage.css";

export default function StudentHomePage() {
  const [viewData, setViewData] = useState(null);

  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    fetchData(
      "GET",
      `${SERVER_HOST}/api/student/get`,
      null,
      loginData.token
    ).then((result) => setViewData(convertBackendDataToViewable(result)));
  });

  function handleSubmit(updateData) {
    fetchData(
      "POST",
      `${SERVER_HOST}/api/student/update`,
      updateData,
      loginData.token
    ).then((updatedBackendData) => {
      setViewData(convertBackendDataToViewable(updatedBackendData));
      alert("Profile Updated Successfull!");
    });
  }

  function convertBackendDataToViewable(backendSudent) {
    backendSudent = { ...backendSudent, ...backendSudent.registration };
    delete backendSudent.registration;
    return backendSudent;
  }

  const heading = `Welcome ${viewData.firstName}!`;

  function Default() {
    return (
      <FormStudentData
        title={heading}
        isForm={true}
        viewData={viewData}
        onSubmit={handleSubmit}
      />
    );
  }

  function MainContentView() {
    return <Default />;
  }

  return (
    <div className="StudentHomePage-Container">
      <div className="StudentHomePage-Card">
        <div className="StudentHomePage-SideBar">{heading}</div>
        <div className="StudentHomePage-Content">
          <MainContentView />
        </div>
      </div>
    </div>
  );
}
