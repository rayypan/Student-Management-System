export default function ExtraDetailsForm({ options, buttonLabel }) {
  function handleSubmit() {
    alert("Submit");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {options.map((option) => (
          <input
            key={option.id}
            type={option.type}
            name={option.name}
            placeholder={option.name}
          />
        ))}
        <button type="submit">{buttonLabel}</button>
      </form>
    </div>
  );
}
