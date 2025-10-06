import { useState } from "react";
import { NameConstants } from "../../modules/NameConstants";
import { PathConstants } from "../../modules/PathConstants";
import RollNumberInputForm from "./RollNumberInputForm";

export function AdminHomePage() {
  let i = 0;

  const crudOptions = [
    {
      id: ++i,
      name: NameConstants.AdminHomePage.READ_ALL,
      path: PathConstants.AdminHomePage.READ_ALL,
    },
    {
      id: ++i,
      name: NameConstants.AdminHomePage.READ_BY_ROLL,
      path: PathConstants.AdminHomePage.READ_BY_ROLL,
    },
    {
      id: ++i,
      name: NameConstants.AdminHomePage.UPDATE,
      path: PathConstants.AdminHomePage.UPDATE,
    },
    {
      id: ++i,
      name: NameConstants.AdminHomePage.DELETE,
      path: PathConstants.AdminHomePage.DELETE,
    },
  ];

  const profileOptions = [
    {
      id: ++i,
      name: NameConstants.AdminHomePage.PROFILE,
      path: PathConstants.AdminHomePage.PROFILE,
    },
  ];

  const [optionPath, setOptionPath] = useState(
    PathConstants.AdminHomePage.HOMEPAGE
  );

  function MainContentView() {
    switch (optionPath) {
      case PathConstants.AdminHomePage.HOMEPAGE:
        return <h1>{optionPath}</h1>;
      case PathConstants.AdminHomePage.READ_ALL:
        return <RollNumberInputForm />;
      case PathConstants.AdminHomePage.READ_BY_ROLL:
        return <h1>{optionPath}</h1>;
      case PathConstants.AdminHomePage.UPDATE:
        return <h1>{optionPath}</h1>;
      case PathConstants.AdminHomePage.DELETE:
        return <h1>{optionPath}</h1>;
      case PathConstants.AdminHomePage.PROFILE:
        return <h1>{optionPath}</h1>;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="Admin-SideBar">
        <nav className="Admin-SideBar-CRUD-Options">
          {crudOptions.map((item) => (
            <div className="Admin-SideBar-CRUD-Options-item" key={item.id}>
              <a href="#" onClick={(e) => setOptionPath(item.path)}>
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <nav className="Admin-SideBar-Profile">
          {profileOptions.map((item) => (
            <div className="Admin-SideBar-Profile-item" key={item.id}>
              <a href="#" onClick={(e) => setOptionPath(item.path)}>
                {item.name}
              </a>
            </div>
          ))}
        </nav>
      </div>

      <div className="Admin-Main">
        <div className="Admin-Main-DashBoard"></div>

        <div className="Admin-Main-MainContent">
          <MainContentView />
        </div>
      </div>
    </>
  );
}
