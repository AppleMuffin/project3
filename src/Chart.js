function Chart () {
  return (
    <section className="chart">
      <div className="wrapper">
        <h2>Waste Trends</h2>
        <div className="trends">
          <table>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Weight (kg)</th>
            </tr>
          </table>
          <div className="graph">
            <h3>Graphs</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chart;