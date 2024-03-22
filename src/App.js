import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [ingredients, setIngedients] = useState([])
  const [gptResponse, setGptResponse] = useState('')
  const [input, setInput] = useState('')

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
    setIngedients(['chicken', 'toamto sauce', 'pasta'])
  }, [])

  // useEffect(() => {
  //   fetchRecipe()
  // }, [ingredients])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIngedients([...ingredients, input])
    setInput('')
  }

  console.log('GPT', gptResponse)

  const renderIngredients = ingredients.map((item) => {
    return(
      <li>{item}</li>
    )
  })
  return (
    <div className="App">
      <div className='searchDiv'>
        <h1>Recipe GPT</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input 
            type='input' 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            autoFocus={true} 
            />
            <button type='submit'>add to ingredients</button>
          </form>
        </div>  
      </div>
      
      <div className='listDiv'>
        <div className='ingredientsDiv'>
          <h1>Ingredients</h1>
          <ul className='ingredientList'>
            {renderIngredients}
          </ul>
        </div>
        <div className='recipeDiv'>
          <h1>Recipes</h1>
          <ul className='recipeList'>
          <li>num1</li>
          <li>num1</li>
          <li>num1</li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
