import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import ForgetUserName from "../pages/ForgetUserName";
import AdminHomePage from "../pages/Admin/AdminHomePage/AdminHomePage";
import StudentHomePage from "../pages/Student/StudentHomePage";
import EnrollStudentList from "../pages/Admin/EnrollStudentList";
import { LoginProvider } from "../context/LoginContext";

export default function App() {
  // prettier-ignore
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PathConstants.RootPaths.ROOT} Component={LoginPage}/>
          <Route path={PathConstants.RootPaths.LOGIN} Component={LoginPage}/>
          <Route path={PathConstants.RootPaths.REGISTER} Component={RegistrationPage}/>
          <Route path={PathConstants.RootPaths.FORGOT_PASSWORD} Component={ForgetPassword}/>
          <Route path={PathConstants.RootPaths.RESET_PASSWORD} Component={ResetPassword}/>
          <Route path={PathConstants.RootPaths.FORGOT_USERNAME} Component={ForgetUserName}/>
          <Route path={PathConstants.RootPaths.ADMIN_HOME_PAGE} Component={AdminHomePage}/>
          <Route path={PathConstants.RootPaths.STUDENT_HOME_PAGE} Component={StudentHomePage}/>
          <Route path={PathConstants.EnrollNavigate.ENROLL_STUDENT_LIST} Component={EnrollStudentList}/>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}
