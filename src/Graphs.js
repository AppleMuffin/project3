//chart js imports
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


//! make a select option for years and create an onchange function that takes the value and uses chart.js update to show you the database by year

const Graphs = ( {graphData, firebaseWaste} ) => {

  //prepares empty arrays for monthly trend chart. 
  const categories = {
    landfill: new Array(12).fill(0),
    recycling: new Array(12).fill(0),
    organics: new Array(12).fill(0),
  }

  //groups firebase data into correct format for chart.js barChart
  const barGrouper = (data) => {
    for (let wasteEntry in data) {
      const entry = data[wasteEntry];
      const dest = categories[entry.wasteType.toLowerCase()]
      const monthEntry = new Date(entry.date).getMonth()
      const weight = entry.wasteWeight;
      dest[monthEntry] += weight
    }
  }

  barGrouper(firebaseWaste)

  return(
    <section className="graphs">
      <div className="wrapper">
      <h2>Graphs</h2>
      <div className="chartHolder">
        <div className="barWrapper">
          {/* chartJs bar component + config options */}
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
            maintainAspectRatio: true,
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
                font: {
                  size: 15
                }
              },
              legend: {
                labels: {
                  font: {
                    size: 15
                  }
                }
              }
            }
          }}
          />
        </div>
          <div className="pieWrapper">
            {/* chartjs pie chart + config options */}
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
                plugins: {
                  tooltip: {
                  //! if time allows, configure tooltips to show percentages here.
                  },
                  title: {
                    text: 'Waste Generation Breakdown (kg)',
                    display: true,
                    font: {
                      size: 15
                    }
                  },
                  legend: {
                    labels: {
                      font: {
                        size: 15
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

//todo: add yearly functionality

//todo authentication if possible (likely take time)
//todo pagination if possible (likely take time)
