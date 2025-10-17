export default function ExtraDetailsForm({ options, buttonLabel, onSubmit }) {
  function handleSubmit(e) {
    alert("Submit");
    onSubmit(e)
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
