import { push, getDatabase, ref, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebase from './firebase';
import Header from './Header.js';
import Form from './Form.js';
import History from './History.js';
import Graphs from './Graphs.js'
import Footer from './Footer';

function App() {

//useStates: get firebase data
const [firebaseWaste, setFirebaseWaste] = useState([]);
// arranging firebase data for chart.js graphs
const [graphData, setGraphData] = useState({})

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

// send firebase data
const handleWasteSubmit = (event) => {
  
  event.preventDefault();
  const formInfo = event.target
  
  //mm not happy using hard index values. should come back to this later
  const wasteData = {
    date: formInfo[0].value,
    wasteType: formInfo[1].value,
    wasteWeight: Number(formInfo[2].value)
  }
  console.log(wasteData)
  
  //push into database based on username only if the name is a string and weight is a number

  if (typeof wasteData.date === 'string' && typeof wasteData.wasteWeight === 'number') {
    push(dbRef, wasteData )
  } 
}

  return (
    <div className="App">
      <Header />
      <Form handleWasteSubmit={handleWasteSubmit}/>
      <Graphs graphData={graphData} firebaseWaste={firebaseWaste}/>
      <History firebaseWaste={firebaseWaste} handleDelete={handleDelete}/>
      <Footer />
      
    </div>
  );
}

export default App;
