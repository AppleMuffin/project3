import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const categories = {
  landfill: new Array(12).fill(0),
  recycling: new Array(12).fill(0),
  organics: new Array(12).fill(0),
}
// make a select option for years and create an onchange function that takes the value and uses chart.js update to show you the database by year

const Graphs = ( {graphData, firebaseWaste} ) => {


  const barGrouper = (data) => {
  
    for (let wasteEntry in data) {
      const entry = data[wasteEntry];
      const dest = categories[entry.wasteType.toLowerCase()]

      const monthEntry = new Date(entry.date).getMonth()

      const weight = entry.wasteWeight;

      dest[monthEntry] += weight
      
    }

    console.log(categories)

  
  }
//make an array with all the month names
  barGrouper(firebaseWaste)
  return(
    <section className="graphs">
      <div className="wrapper">
      <h2>Graphs</h2>
      <div className="chartHolder">
        <div className="barWrapper">
          <Chart 
          type='bar'
          width={400}
          height={400}
          data={{
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
              {
                label: 'Landfill',
                data: categories.landfill,
                backgroundColor: 'rgba(102, 100, 96, 0.8)'
              },
              {
                label: 'Recycling',
                data: categories.recycling,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
              },
              {
                label: 'Organics',
                data: categories.organics,
                backgroundColor: 'rgba(138, 201, 38, 0.8)'
              }


            ],
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              }
            },
            plugins: {
              title: {
                text: 'Monthly Waste Generated',
                display: true,
              }
            }

          }}
          />
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
                      size: 20
                    }
                  },
                  title: {
                    text: 'Waste Generation Breakdown (kg)',
                    display: true,
                    font: {
                      size: 20
                    }
                  },
                  legend: {
                    labels: {
                      font: {
                        size: 20
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