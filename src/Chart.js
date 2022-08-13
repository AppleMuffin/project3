function Chart ( {firebaseWaste} ) {
  return (
    //make this a a routed graph, and add a b
    <section className="chart">
      <div className="wrapper">
        <h2>Waste History</h2>

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
              {firebaseWaste.map((wasteEntry) => {
                return (
                  // instead of manually entering the properties, maybe i can create my own function that returns stuff that JSX will accept?
                  <tr>
                    <td>{wasteEntry.date}</td>
                    <td>{wasteEntry.wasteType}</td>
                    <td>{wasteEntry.wasteWeight}</td>
                    <td><button className="delete">Remove</button></td>
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

export default Chart;