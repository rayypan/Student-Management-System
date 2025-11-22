import { useState, useEffect, useContext } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormAdminProfile from "../../../components/FormAdminProfile";
import { apiCall } from "../../../modules/Api";
import { LoginContext } from "../../../context/LoginContext";

export default function SectionProfile() {
  const [viewData, setViewData] = useState(null);
  const [backToHome, setBackToHome] = useState(false);

  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    apiCall("GET", `/api/admin/get`, null, loginData?.token)
      .then((result) => setViewData(result))
      .catch((error) => alert(error));
  }, []);

  function handleSubmit(updateData) {
    apiCall("POST", `/api/admin/update`, updateData, loginData?.token)
      .then((updatedBackendData) => {
        setViewData(updatedBackendData);
        alert("Profile Updated Successfull!!");
      })
      .catch((error) => alert(error));
  }

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  return (
    <div className="AdminHomePage-SectionProfile">
      <FormAdminProfile
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
