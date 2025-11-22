import { useState, useContext, useEffect } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormStudentData from "../../../components/FormStudentData";
import { apiCall } from "../../../modules/Api";
import { LoginContext } from "../../../context/LoginContext";

export default function SectionUpdate({ rollNo }) {
  const [viewData, setViewData] = useState(null);
  const [backToHome, setBackToHome] = useState(false);

  const { loginData } = useContext(LoginContext);

  function convertBackendDataToViewable(backendSudent) {
    // backendSudent: {
    //   rollNo,
    //   subjects,
    //   registration: {
    //     uid,
    //     firstName,
    //     ...
    //   }
    // }
    backendSudent = { ...backendSudent, ...backendSudent.registration };
    // backendSudent: {
    //   rollNo,
    //   subjects,
    //   registration: {
    //     uid,
    //     firstName,
    //     ...
    //   },
    // // Newly added (shallow copy):
    //     uid,
    //     firstName,
    //     ...
    // }
    delete backendSudent.registration;
    // backendSudent: {
    //   rollNo,
    //   subjects,
    // // Newly added:
    //     uid,
    //     firstName,
    //     ...
    // }
    return backendSudent;
  }

  useEffect(() => {
    apiCall(
      "GET",
      `/api/admin/student/get-by-roll?rollNo=${rollNo}`,
      null,
      loginData?.token
    )
      .then((result) => setViewData(convertBackendDataToViewable(result)))
      .catch((error) => alert(error));
  }, [loginData?.token, rollNo]);

  function handleSubmit(updateData) {
    apiCall(
      "POST",
      `/api/admin/student/update-by-roll?rollNo=${rollNo}`,
      updateData,
      loginData?.token
    )
      .then((updatedBackendData) => {
        // updatedBackendData: {
        //   rollNo,
        //   subjects,
        //   registration: {
        //     uid,
        //     firstName,
        //     ...
        //   }
        // }
        // step 1. set form data as updated data
        // step 2. bring registration out into same level
        setViewData(convertBackendDataToViewable(updatedBackendData));
        alert(`Student ${rollNo} Updated Successfully`);
      })
      .catch((error) => alert(error));
  }

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionUpdate">
      <FormStudentData
        title="Update Student Details"
        isForm={true}
        viewData={viewData}
        onSubmit={handleSubmit}
      />
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={() => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
