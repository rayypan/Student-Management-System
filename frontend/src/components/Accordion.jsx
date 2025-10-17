import { useState } from "react";
import "../style/Accordion.css";

export default function Accordion({ summaryComponent, detailComponent }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Accordion">
      <div className="Accordion-Summary">
        <button className="Accordion-BtnExpand" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "+" : "-"}</button>
        {summaryComponent}
      </div>

      {isOpen && (
        <div className="Accordion-DetailComponent">{detailComponent}</div>
      )}
    </div>
  );
}
