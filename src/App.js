//imports: firebase database, firebase methods, components
import { push, getDatabase, ref, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebase from './firebase';

//import components
import Header from './Header.js';
import Form from './Form.js';
import Chart from './Chart';


function App() {

//useStates: waste data submission
const [wasteData, setWasteData] = useState();

//useEffect: update chart history when new data is entered



//setting firebase reference points
const database = getDatabase(firebase);
const dbRef = ref(database);

// const userDatabase = ref(dbRef, `'users`)

// send data to firebase
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
    
    // push(dbRef, wasteData )
  } 
  

}

  return (
    <div className="App">
      <Header />
      <Form handleWasteSubmit={handleWasteSubmit}/>
      <Chart />
    </div>
  );
}

export default App;
