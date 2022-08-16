import { push, getDatabase, ref, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebase from './firebase';
import Header from './Header.js';
import Form from './Form.js';
import History from './History.js';
import Graphs from './Graphs.js'

function App() {

//useStates: get firebase data
const [firebaseWaste, setFirebaseWaste] = useState([]);
// arranging firebase data for chart.js graphs
const [graphData, setGraphData] = useState({})


const [categories, setCategories] = useState({
    landfill: new Array(12).fill(0),
    recycling: new Array(12).fill(0),
    organics: new Array(12).fill(0),
})



// firebase references
const database = getDatabase(firebase);
const dbRef = ref(database);

// preparing data for pie chart
const pieSorter = (data) => {
  const totalWeights = {};
  totalWeights.landfill = 0;
  totalWeights.recycling = 0;
  totalWeights.organics = 0;

  for (let dataEntry in data) {
    if (data[dataEntry].wasteType === 'Landfill') {
      totalWeights.landfill += data[dataEntry].wasteWeight
    } else if (data[dataEntry].wasteType === 'Recycling') {
      totalWeights.recycling += data[dataEntry].wasteWeight
    } else {
      totalWeights.organics += data[dataEntry].wasteWeight
    }
    setGraphData(totalWeights);
  }

}

// useEffect: gets firebase data each time it changes
useEffect(() => {
  onValue(dbRef, (response) => {
    
    const databaseWaste = response.val();
    //prepare data for chart section
    pieSorter(databaseWaste)
    //prepare data for history section
    setFirebaseWaste(databaseWaste)
    
  })
}, [dbRef])


//delete database entries
const handleDelete = (event, key) => {
  event.preventDefault();
  const dataReference = ref(database, `/${key}`);
  remove(dataReference)
}



const barGrouper = (data) => {
    const copy = {...categories}
    console.log(data)
    for (let wasteEntry in data) {
      const entry = data[wasteEntry];
      const dest = copy[entry.wasteType.toLowerCase()]
      const monthEntry = new Date(entry.date).getMonth()
      const weight = entry.wasteWeight;
      dest[monthEntry] += weight

      console.log(data[wasteEntry])
    }
    console.log(categories)
  }

  // send firebase data on form submit
  const handleWasteSubmit = (event) => {
    event.preventDefault();
    const formInfo = event.target
    const wasteData = {
      date: formInfo[0].value,
      wasteType: formInfo[1].value,
      wasteWeight: Number(formInfo[2].value)
    }
    console.log(wasteData)

    //simple validation check: ensure data is correct type
    if (typeof wasteData.date === 'string' && typeof wasteData.wasteWeight === 'number') {
      push(dbRef, wasteData)
    }

    console.log(wasteData)
    barGrouper()

  }


//todo: if time allows, could add some routing
  return (
    <div className="App">
      <Header />
      <Form handleWasteSubmit={handleWasteSubmit} barGrouper={barGrouper}/>
      <Graphs graphData={graphData} firebaseWaste={firebaseWaste} categories={categories} setCategories={setCategories} />
      <History firebaseWaste={firebaseWaste} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
