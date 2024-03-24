import './App.scss';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Recipe from './Recipe/Recipe';

function App() {
  const [ingredients, setIngedients] = useState([])
  const [gptResponse, setGptResponse] = useState('')
  const [input, setInput] = useState('')
  const [view, setView] = useState(true)

  
  const fetchRecipe = async () => {
    console.log('clicked')
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
      setView(false)
    } catch(err){
      console.log(err)
    }
  }

  const clearIngredients = () => {
    setIngedients([])
  }

  const toggleView = () => {
    setView(!view)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setIngedients([...ingredients, input])
    setInput('')
  }


  const renderIngredients = ingredients.map((item) => {
    return(
      <li>{item}</li>
    )
  })
 

  const renderRecipeResponse = gptResponse.recipes ? gptResponse.recipes.map((recipe) => {
    {console.log(recipe)}
    return <Recipe recipe={recipe} />
  }): null

  console.log(gptResponse)
  return (
    <div className="App">
      <div className='searchDiv'>
        <h1>Recipe GPT</h1>
        <div className='inputDiv'>
          <form onSubmit={handleSubmit}>
            <input 
            type='input' 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            autoFocus={true} 
            placeholder='What ingredients do you have?'
            />
            <button type='submit'>add to ingredients</button>
          </form>
        </div>
        <div className='buttonDiv'>
          <button onClick={fetchRecipe}>find recipe</button>  
          <button onClick={clearIngredients}>clear ingredients</button>
          <button onClick={toggleView}>{view ? 'View Recipes' : 'View Ingredients'}</button>
        </div>
        
      </div>
      
      <div className='listDiv'>
        {view && <div className='ingredientsDiv'>
          <h1>Ingredients</h1>
          <ul className='ingredientList'>
            {renderIngredients}
          </ul>
        </div>}
        {!view && <div className='recipeDiv'>
          <h1>Recipes</h1>
          <div className='gptRes'>
            {renderRecipeResponse}   
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
