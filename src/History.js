//table showing history of data submissions
function History ( {firebaseWaste, handleDelete} ) {
  
  const wasteArray = []

  for (let key in firebaseWaste) {
    
    //take firebase's unique key id and put them inside an array. this line looks really dumb lol.
    firebaseWaste[key].key = key
    wasteArray.push(firebaseWaste[key])
  
  }

  return (
    <section className="historyTable">
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
                //maps through array and adds data to table
                wasteArray.map((wasteEntry) => {
                  return (
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