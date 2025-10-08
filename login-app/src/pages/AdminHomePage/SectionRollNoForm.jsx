import { useState } from "react";

export default function SectionRollNoForm({ onSubmit }) {
  const [rollno, setrollno] = useState(""); 

  function handleSubmit(e) {
    e.preventDefault();
    if (!rollno) {
      alert("Submit button clicked");
      return;
    }
    onSubmit(rollno);
    setrollno("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="AdminHomePage-SectionRollNoForm">
        <label>
          <strong>Roll No:</strong>
          <input
            type="number"
            value={rollno}
            onChange={(e) => setrollno(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
