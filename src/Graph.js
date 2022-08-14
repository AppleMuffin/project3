import { Bar } from 'react-chartjs-2';

function Graph () {
  return(
    <section className="graph">
      <h2>Graphss</h2>
      <div>
        <canvas id="myChart" width="400" height="400"></canvas>
        <Bar data={{
          labels: ['red', 'blue']
        }
        }
          height={400}
          width={600} />
      </div>
      
      
     
    </section>
  )
}

export default Graph;

//TODO: add floats to kg input, finish GRAPH component, add Chart.js (pie chart, timeline by week/ month, bar graph), add some rotating background animations and general styling, add routing for graph and chart components
//TODO EXTRAS: more inputs, extended categories, authentication?