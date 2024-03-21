import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [ingredients, setIngedients] = useState([])
  const [gptResponse, setGptResponse] = useState('')
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    try{
      const response = await axios.get('http://localhost:3001');
      console.log(response.data)
      setData(response.data);
    } catch(err){
      console.log(err)
    }
   
  }

  const fetchRecipe = async () => {
    // const ingredientList = ingredients.reduce((list, item) => {
    //   list + item + ', '
    //   return list
    // }, '')
    let ingredientList = ''

    for(const item of ingredients){
      ingredientList += (item + ', ')
    }

    console.log('LIST', ingredientList)
    try{
      const response = await axios.post('http://localhost:3001/gpt', {
       ingredientList
      })
      console.log('axios res', response)
      setGptResponse(response.data)
    } catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    fetchData();
    setIngedients(['chicekn', 'toamto sauce', 'pasta'])
  }, [])

  useEffect(() => {
    fetchRecipe()
  }, [ingredients])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setIngedients([...ingredients, e.target.value])
  // }

  console.log('GPT', gptResponse)

  return (
    <div className="App">
    Recipe GPT
    <div>{data}</div>
    {/* <div>
      <form onSubmit={handleSubmit}>
        <input type='input' value={search} />
        <button type='submit'>add to ingredients</button>
      </form>
    </div> */}
    <div>{gptResponse}</div>
    </div>
  );
}

export default App;
