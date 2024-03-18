import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try{
      const response = await axios.get('http://localhost:3001');
      setData(response.data);
    } catch{
      console.log('problem with axios')
    }
   
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
    Recipe GPT
    <div>{data}</div>
    </div>
  );
}

export default App;
