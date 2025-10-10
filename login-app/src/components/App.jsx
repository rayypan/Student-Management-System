import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import { Roles } from "../modules/Types";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ForgetPassword from "../pages/ForgetPassword";
import ForgetUserName from "../pages/ForgetUserName";
import AdminHomePage from "../pages/Admin/AdminHomePage/AdminHomePage";
import EnrollStudentList from "../pages/Admin/EnrollStudentList";
import AdminOrStudentReadOrUpdateForm from "./AdminOrStudentReadOrUpdateForm";

export default function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes> */}
          {/* <Route path={PathConstants.RootPaths.ROOT} Component={LoginPage}/>
          <Route path={PathConstants.RootPaths.LOGIN} Component={LoginPage}/>
          <Route path={PathConstants.RootPaths.REGISTER} Component={RegistrationPage}/>
          <Route path={PathConstants.RootPaths.FORGOT_PASSWORD} Component={ForgetPassword}/>
          <Route path={PathConstants.RootPaths.FORGOT_USERNAME} Component={ForgetUserName}/> */}
          {/* <Route path={PathConstants.RootPaths.ADMIN_HOME_PAGE} Component={AdminHomePage}/>
          <Route path={PathConstants.EnrollNavigate.ENROLL_STUDENT_LIST} Component={EnrollStudentList}/>
        </Routes>
      </BrowserRouter> */}
      <AdminOrStudentReadOrUpdateForm isForm={true} role={Roles.ADMIN} rollNo={1} />
    </>
  );
}
