import { useState } from "react";
import { NameConstants } from "../../../modules/NameConstants";
import { PathConstants } from "../../../modules/PathConstants";
import SectionAdminHomePage from "./SectionAdminHomePage";
import SectionReadAll from "./SectionReadAll";
import SectionReadByRoll from "./SectionReadByRoll";
import SectionUpdate from "./SectionUpdate";
import SectionDelete from "./SectionDelete";
import SectionProfile from "./SectionProfile";
import SectionRollNoForm from "./SectionRollNoForm";
import AdminDashBoard from "./AdminDashBoard";

import "../../../style/AdminHomePage.css";

export default function AdminHomePage() {
  const [rollNumber, setRollNumber] = useState("");
  let i = 0;

  // TODO: useEffect: get details from backend using token

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

  const [optionItem, setOptionItem] = useState({
    id: -1,
    name: NameConstants.AdminHomePage.HOMEPAGE,
    path: PathConstants.AdminHomePage.HOMEPAGE,
  });

  function MainContentView() {
    const optionPath = optionItem.path;
    const optionName = optionItem.name;

    switch (optionPath) {
      case PathConstants.AdminHomePage.HOMEPAGE:
        return <SectionAdminHomePage />;

      case PathConstants.AdminHomePage.READ_ALL:
        return <SectionReadAll />;

      case PathConstants.AdminHomePage.READ_BY_ROLL:
        if (!rollNumber) {
          return (
            <SectionRollNoForm
              pageName={optionName}
              onSubmit={(rollNo) => setRollNumber(rollNo)}
            />
          );
        }
        return <SectionReadByRoll rollNo={rollNumber} />;

      case PathConstants.AdminHomePage.UPDATE:
        if (!rollNumber) {
          return (
            <SectionRollNoForm
              pageName={optionName}
              onSubmit={(rollNo) => setRollNumber(rollNo)}
            />
          );
        }
        return <SectionUpdate rollNo={rollNumber} />;

      case PathConstants.AdminHomePage.DELETE:
        if (!rollNumber) {
          return (
            <SectionRollNoForm
              pageName={optionName}
              onSubmit={(rollNo) => setRollNumber(rollNo)}
            />
          );
        }
        return <SectionDelete rollNo={rollNumber} />;

      case PathConstants.AdminHomePage.PROFILE:
        return <SectionProfile />;

      default:
        return null;
    }
  }

  return (
    <div className="AdminHomePage-Container">
      <div className="AdminHomePage-Card">
        <div className="AdminHomePage-SideBar">
          <nav className="AdminHomePage-SideBar-CrudOptions">
            {crudOptions.map((item) => (
              <div
                className="AdminHomePage-SideBar-CrudOptions-Item"
                key={item.id}
              >
                <a
                  href={PathConstants.DEFAULT_HREF}
                  onClick={(e) => {
                    setOptionItem(item);
                    setRollNumber("");
                  }}
                >
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
                <a
                  href={PathConstants.DEFAULT_HREF}
                  onClick={(e) => {
                    setOptionItem(item);
                    setRollNumber("");
                  }}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
        </div>

        <div className="AdminHomePage-Content">
          <div className="AdminHomePage-Content-DashBoard">
            <AdminDashBoard />
          </div>

          <div className="AdminHomePage-Content-MainContentView">
            <MainContentView />
          </div>
        </div>
      </div>
    </div>
  );
}
