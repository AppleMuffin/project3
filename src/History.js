

function History ( {firebaseWaste, handleDelete} ) {
  
  //create an array and add each object representing a waste entry (plus a key)
  const wasteArray = []

  for (let key in firebaseWaste) {
    
    //! look at this stupid looking line. but it works lmao (adds the object key into each object in the array of objects as a key)
    firebaseWaste[key].key = key
    wasteArray.push(firebaseWaste[key])
  
  }
  console.log(wasteArray)

  
  return (
    //make this a a routed graph, and add a b
    <section className="chart">
      <div className="wrapper">
        <h2>History</h2>

        <div className="trends">

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Weight (kg)</th>
                <th>Delete Entry</th>
              </tr>
            </thead>
            <tbody>

              {
                wasteArray.map((wasteEntry) => {
                  return (
                    // instead of manually entering the properties, maybe i can create my own function that returns stusff that JSX will accept?
                    <tr key={wasteEntry.key}>
                      <td>{wasteEntry.date}</td>
                      <td>{wasteEntry.wasteType}</td>
                      <td>{wasteEntry.wasteWeight}</td>
                      <td className="buttonContainer"><button className="delete" onClick={(e) => handleDelete(e, wasteEntry.key)} >Remove</button></td>
                    </tr>
                  )

                })
              }
            
            </tbody>
          </table>

          

        </div>

      </div>
    </section>
  )
}

export default History;