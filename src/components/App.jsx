import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UrlPaths } from "../modules/UrlPaths";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ForgetPassword from "../pages/ForgetPassword";
import ForgetUserName from "../pages/ForgetUserName";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={UrlPaths.ROOT} Component={LoginPage}/>
        <Route path={UrlPaths.LOGIN} Component={LoginPage}/>
        <Route path={UrlPaths.REGISTER} Component={RegistrationPage}/>
        <Route path={UrlPaths.FORGOT_PASSWORD} Component={ForgetPassword}/>
        <Route path={UrlPaths.FORGOT_USERNAME} Component={ForgetUserName}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
