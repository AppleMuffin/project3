function Form (props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('test')
    }

    return (
        <section className="formEntry">
            <div className="wrapper">
                <form onClick={handleSubmit}>
                    <div className="wasteInformation">
                        <div className="userInput">
                            <label for="Name">Enter your name</label>
                            <input type="text" placeholder="Name"></input>
                        </div>  
                    </div>
                    
                    <div className="wasteData">
                        <div className="userInput">
                            <label for="wasteType">Choose a Waste Type:</label>
                            <select id="wasteType" name="wasteType">
                                <option value="Landfill">Landfill</option>
                                <option value="Recycling">Recycling</option>
                                <option value="Organics">Organics</option>
                            </select>
                        </div>
                        <div className="userInput">
                            <label for="weight">Weight (kg)</label>
                            <input placeholder="Enter a weight" id="weight"></input>
                        </div>
                    </div>
                    <button type="submit">Submit</button>               
            </form>
        </div>
    </section>
    )
}

export default Form;