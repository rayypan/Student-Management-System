import { useState, useEffect, useContext } from "react";
import SectionAdminHomePage from "./SectionAdminHomePage";
import FormAdminProfile from "../../../components/FormAdminProfile";
import { fetchData, SERVER_HOST } from "../../../modules/Api";
import { LoginContext } from "../../../context/LoginContext";

export default function SectionProfile() {
  const [viewData, setViewData] = useState(null);
  const [backToHome, setBackToHome] = useState(false);

  const { loginData } = useContext(LoginContext);

  if (backToHome) {
    return <SectionAdminHomePage />;
  }

  useEffect(() => {
    fetchData(
      "GET",
      `${SERVER_HOST}/api/admin/get`,
      null,
      loginData.token
    ).then((result) => setViewData(result));
  });

  function handleSubmit(updateData) {
    fetchData(
      "POST",
      `${SERVER_HOST}/api/admin/update`,
      updateData,
      loginData.token
    ).then((updatedBackendData) => {
      setViewData(updatedBackendData);
      alert("Profile Updated Successfull!!");
    });
  }

  return (
    <div className="AdminHomePage-SectionProfile">
      <FormAdminProfile isForm={true} viewData={viewData} onSubmit={handleSubmit} />
      <button
        className="AdminHomePage-BtnBackToHome"
        onClick={() => setBackToHome(true)}
      >
        Back to Home
      </button>
    </div>
  );
}
