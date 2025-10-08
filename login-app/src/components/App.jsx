import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PathConstants } from "../modules/PathConstants";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ForgetPassword from "../pages/ForgetPassword";
import ForgetUserName from "../pages/ForgetUserName";
import { AdminHomePage } from "../pages/AdminHomePage/AdminHomePage";

export default function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path={PathConstants.RootPaths.ROOT} Component={LoginPage}/>
        <Route path={PathConstants.RootPaths.LOGIN} Component={LoginPage}/>
        <Route path={PathConstants.RootPaths.REGISTER} Component={RegistrationPage}/>
        <Route path={PathConstants.RootPaths.FORGOT_PASSWORD} Component={ForgetPassword}/>
        <Route path={PathConstants.RootPaths.FORGOT_USERNAME} Component={ForgetUserName}/>
      </Routes>
    </BrowserRouter> */}
    <AdminHomePage/>
    </>
  )
}
