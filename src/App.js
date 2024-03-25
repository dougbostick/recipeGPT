import './App.scss';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Recipe from './Recipe/Recipe';

function App() {
  const [ingredients, setIngedients] = useState([])
  const [gptResponse, setGptResponse] = useState('')
  const [input, setInput] = useState('')
  const [view, setView] = useState(true)
  const [loading, setLoading] = useState(false)


  
  const fetchRecipe = async () => {
    setGptResponse('')
    setView(false)
    setLoading(true)
    if(!ingredients.length){
      setGptResponse('')
    } else {
      let ingredientList = ''
      for(const item of ingredients){
        ingredientList += (item + ', ')
      }
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
    setLoading(false)
  }

  const clearIngredients = () => {
    setIngedients([])
    setGptResponse('')
  }

  const toggleView = () => {
    setView(!view)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setView(true)
    setIngedients([...ingredients, input])
    setInput('')
  }


  const renderIngredients = ingredients.length ? ingredients.map((item) => {
    return(
      <li className='ingredientLi'>{item}</li>
    )
  }) : <div className='message'>Enter some ingredients!</div>
 const noRecipes = (
  ingredients.length ? 
  <div className='message'>Sorry we couldn't find any recipes!</div> : <div className='message'>Enter some ingredients!</div>
 )

  const renderRecipeResponse = gptResponse.recipes ? gptResponse.recipes.map((recipe) => {
    {console.log(recipe)}
    return <Recipe recipe={recipe} />
  }): noRecipes


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
            {loading ? <div className='message'>Asking our LLM friend for recipes, one moment!</div> : renderRecipeResponse}   
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
