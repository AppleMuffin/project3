//imports: firebase database, firebase methods, components
import { push, getDatabase, ref, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebase from './firebase';

//import components
import Header from './Header.js';
import Form from './Form.js';
import History from './History.js';
import Graphs from './Graphs.js'



function App() {

//useStates: waste data from firebase
const [firebaseWaste, setFirebaseWaste] = useState([]);
const [graphData, setGraphData] = useState({})

//setting firebase reference points
const database = getDatabase(firebase);
const dbRef = ref(database);

//! sort waste data for chart section
const dataSorter = (data) => {
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

//need to add a remove function

//! useEffect: get the full database every time it changes
useEffect(() => {
  onValue(dbRef, (response) => {
    
    const databaseWaste = response.val();
    console.log(databaseWaste)
    //prepare data for chart section
    dataSorter(databaseWaste)
    //prepare data for history section
    setFirebaseWaste(databaseWaste)
    
  })
}, [dbRef])


//delete entry from database
const handleDelete = (event, key) => {
  event.preventDefault();
  const dataReference = ref(database, `/${key}`);
  remove(dataReference)
}

// on form submit, send data to firebase
const handleWasteSubmit = (event) => {
  event.preventDefault();
  const formInfo = event.target
  
  //mm not happy using hard index values. should come back to this later
  const wasteData = {
    date: formInfo[0].value,
    wasteType: formInfo[1].value,
    wasteWeight: Number(formInfo[2].value)
  }
  
  //push into database based on username only if the name is a string and weight is a number

  if (typeof wasteData.date === 'string' && typeof wasteData.wasteWeight === 'number') {
    push(dbRef, wasteData )
  } 
}

  return (
    <div className="App">
      <Header />
      <Form handleWasteSubmit={handleWasteSubmit}/>
      <Graphs graphData={graphData}/>
      <History firebaseWaste={firebaseWaste} handleDelete={handleDelete}/>
      
    </div>
  );
}

export default App;
