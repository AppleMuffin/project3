import firebase from './firebase.js'
import Header from './Header.js'
import Form from './Form.js'


function App() {
  const [wasteData, setWasteData] = useState([]);

  return (
    <div className="App">
      <Header />
      <Form />
      <div>
        {wasteDataResponse.map((wasteData) => {
          
        })}
      </div>
    </div>
  );
}

export default App;
