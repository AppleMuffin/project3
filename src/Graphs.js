import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const Graphs = ( {graphData} ) => {
  return(
    <section className="graphs">
      <div className="wrapper">
      <h2>Graphs</h2>
      <div className="chartHolder">
        <div className="barWrapper">
          {/* <Chart 
          type='bar'
          width={400}
          height={400}
          data={{

          }}
          /> */}
        </div>
          <div className="pieWrapper">
            <Chart
              type='doughnut'
              width={400}
              height={400}
              data={{
                labels: ['Landfill', 'Recycling', 'Organics'],

                datasets: [{
                  backgroundColor: [
                    'rgba(102, 100, 96, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(138, 201, 38, 0.8)'
                  ],

                  data: [graphData.landfill, graphData.recycling, graphData.organics]
                }],
              }}
              options={{
                reponsive: true,
                layout: {
                  padding: 25
                },
                plugins: {
                  tooltip: {
                    bodyFont: {
                      size: 25
                    }
                  },
                  title: {
                    text: 'Waste Generation Breakdown (kg)',
                    display: true,
                    font: {
                      size: 25
                    }
                  },
                  legend: {
                    labels: {
                      font: {
                        size: 25
                      }
                    }
                  }
                }
              }} />
          </div>
      </div>
      
      </div>
    </section>
  )
}

export default Graphs;

//TODO: add floats to kg input, finish GRAPH component, add Chart.js (pie chart, timeline by week/ month, bar graph), add some rotating background animations and general styling, add routing for graph and chart components
//TODO EXTRAS: more inputs, extended categories, authentication?