export default function RollNumberInputForm({onSubmit}){

     function handleSubmit(){
        alert("Submit button clicked")
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="Roll-NO-FORM">
            <label>Roll NO:
            <input type="number"/>
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}