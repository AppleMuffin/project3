//chart js imports
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


//! make a select option for years and create an onchange function that takes the value and uses chart.js update to show you the database by year


const Graphs = ( {graphData, firebaseWaste, categories, setCategories} ) => {
  //prepares empty arrays for monthly trend chart. 

  console.log(categories)
  for (let wasteEntry in categories) {
    console.log(categories)
  }
  // const categories = {
  //   landfill: new Array(12).fill(0), 
  //   recycling: new Array(12).fill(0),
  //   organics: new Array(12).fill(0),
  // }

  //groups firebase data into correct format for chart.js barChart
    // const barGrouper = (data) => {
    //   const copy = {...categories}
    //   console.log(data)
    //   for (let wasteEntry in data) {
    //     const entry = data[wasteEntry];
    //     const dest = copy[entry.wasteType.toLowerCase()]
    //     const monthEntry = new Date(entry.date).getMonth()
    //     const weight = entry.wasteWeight;
    //     dest[monthEntry] += weight

    //     console.log(data[wasteEntry])
    //   }
    //   console.log(categories)
    // }
  
  // useEffect(()=>{

  //   if(categories) {
  //     barGrouper(firebaseWaste)
  //   }
    
  // }, [firebaseWaste])
  
  const handleYearChange = (e, data) => {
    e.preventDefault();
    const dataContainer = {}
    const currentYear = parseInt(e.target[0].value)
    for (let wasteEntry in data) {
      const yearOfSubmission = new Date(data[wasteEntry].date).getFullYear()
      
      if ( yearOfSubmission === currentYear ) {
        const keyID = data[wasteEntry].key
        dataContainer[keyID] = data[wasteEntry]
      
      }
    
    }
    
    setCategories(dataContainer)
    console.log(dataContainer)
    // barGrouper(dataContainer)
  }

  return(
    <section className="graphs">
      <div className="wrapper">
      <h2>Graphs</h2>
        <form action="" onSubmit={(e) => handleYearChange(e, firebaseWaste)}>
        <div className="userInput yearPicker" >
          <label htmlFor="year">Show Year</label>
          <select name="year" id="year" >
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <button type="submit">Check Annual Waste Trends</button>
        </div>
      </form>
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
          //! compare the graph comopnent category state for landfill, recycling and organics (whatever was pushed into firebase bascailly), looks whats tehre and compare it to the dataset in the chart component. if chart is undefined, but we do have a number in landfill, whys that not being passed correctly? might be the way its being passed is incorrect. some weird stuff is happenign tehre. so thats where you need to look
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
                text: `Monthly Waste Generated`,
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
                    text: 'Total Waste Breakdown (Across all years) (kg)',
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
