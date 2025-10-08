import { useState } from "react";
import { NameConstants } from "../../modules/NameConstants";
import { PathConstants } from "../../modules/PathConstants";
import SectionAdminHomePage from "./SectionAdminHomePage";
import SectionReadAll from "./SectionReadAll";
import SectionReadByRoll from "./SectionReadByRoll";
import SectionUpdate from "./SectionUpdate";
import SectionDelete from "./SectionDelete";
import SectionProfile from "./SectionProfile";
import SectionRollNoForm from "./SectionRollNoForm";

export function AdminHomePage() {
  const [rollNumber, setrollNumber] = useState("");
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
        return <SectionAdminHomePage />;
      case PathConstants.AdminHomePage.READ_ALL:
        return <SectionReadAll />;
      case PathConstants.AdminHomePage.READ_BY_ROLL:
        if (!rollNumber) {
          return (
            <SectionRollNoForm onSubmit={(rollNo) => setrollNumber(rollNo)} />
          );
        }
        return <SectionReadByRoll />;
      case PathConstants.AdminHomePage.UPDATE:
        if (!rollNumber) {
          return (
            <SectionRollNoForm onSubmit={(rollNo) => setrollNumber(rollNo)} />
          );
        }
        return <SectionUpdate />;
        if (!rollNumber) {
          return (
            <SectionRollNoForm onSubmit={(rollNo) => setrollNumber(rollNo)} />
          );
        }
      case PathConstants.AdminHomePage.DELETE:
        return <SectionDelete />;
      case PathConstants.AdminHomePage.PROFILE:
        return <SectionProfile />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="AdminHomePage-SideBar">
        <nav className="AdminHomePage-SideBar-CrudOptions">
          {crudOptions.map((item) => (
            <div
              className="AdminHomePage-SideBar-CrudOptions-Item"
              key={item.id}
            >
              <a href="#" onClick={(e) => setOptionPath(item.path)}>
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <nav className="AdminHomePage-SideBar-ProfileOptions">
          {profileOptions.map((item) => (
            <div
              className="AdminHomePage-SideBar-ProfileOptions-Item"
              key={item.id}
            >
              <a href="#" onClick={(e) => setOptionPath(item.path)}>
                {item.name}
              </a>
            </div>
          ))}
        </nav>
      </div>

      <div className="AdminHomePage-Content">
        <div className="AdminHomePage-Content-DashBoard"></div>

        <div className="AdminHomePage-Content-MainContentView">
          <MainContentView />
        </div>
      </div>
    </>
  );
}
