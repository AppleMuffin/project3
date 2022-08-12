function Form (props) {

console.log(props)



    return (
        <section className="formEntry">
            <div className="wrapper">
                <h2>Data Submission</h2>
                <div className="instructions">
                    <h3>Instructions</h3>
                    <p>Enter your waste data and chart your waste habits. Use this to track how much waste you make over time!</p>
                </div>
                {/*remember that in addition to using anon functions to prevent your functions from running automatically, in this case you also need to define your function in the main component, pass it into the component the function should be, and give that anon function the event object */}
                <form onSubmit={(event) =>  props.handleWasteSubmit(event)}>

                    <div className="wasteInformation">
                        <div className="userInput">
                            <label htmlFor="Date">Enter Date of Entry</label>
                            <input type="Date" placeholder="Date" required></input>
                        </div>  
                    </div>
                    
                    <div className="wasteData">
                        <div className="userInput">
                            <label htmlFor="wasteType">Choose a Waste Type:</label>
                            <select id="wasteType" name="wasteType" required>
                                <option value="Landfill">Landfill</option>
                                <option value="Recycling">Recycling</option>
                                <option value="Organics">Organics</option>
                            </select>
                        </div>
                        <div className="userInput">
                            <label htmlFor="weight">Weight (kg)</label>
                            <input placeholder="Enter a weight" type="number"  id="weight" required></input>
                        </div>
                    </div>

                    <button type="submit">Submit</button>   
                    {/* is there a way to use a ternary that shows status of submission if wasteHandleSubmit was true or false? */}
            </form>
        </div>
    </section>
    )
}

export default Form;