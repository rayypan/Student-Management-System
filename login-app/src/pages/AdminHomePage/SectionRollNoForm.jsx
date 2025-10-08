import { useState } from "react";

export default function SectionRollNoForm({ pageName, onSubmit }) {
  const [rollNo, setRollNo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!rollNo) {
      alert("Roll Number Empty");
      return;
    }
    onSubmit(rollNo);
    setRollNo("");
  }

  return (
    <form onSubmit={handleSubmit} className="AdminHomePage-SectionRollNoForm">
      <h1>{pageName}</h1>
      <label>
        <strong>Roll No:</strong>
        <input
          type="number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
