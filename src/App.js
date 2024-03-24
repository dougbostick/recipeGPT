import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Recipe from './Recipe/Recipe';

function App() {
  const [ingredients, setIngedients] = useState([])
  const [gptResponse, setGptResponse] = useState('')
  const [input, setInput] = useState('')


  
  const fetchRecipe = async () => {
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

  const clearIngredients = () => {
    setIngedients([])
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

  // const renderRecipeResponse = gptResponse ? (
  // <div>
  //   <h1>{gptResponse.recipe}</h1>
  //   {visible && <div>
  //     <h2>Ingredients</h2>
  //     <ul>
  //       {gptResponse.ingredients.map((item) => {
  //         return <li>{item}</li>
  //       })}
  //     </ul>
  //     <h2>Steps</h2>
  //     <ul>
  //       {gptResponse.steps.map((step) => {
  //         return <li>{step}</li>
  //       })}
  //     </ul>
  //   </div>}
  // </div>
  // ) : null
 

  const renderRecipeResponse = gptResponse.recipes ? gptResponse.recipes.map((recipe) => {
    {console.log(recipe)}
    return <Recipe recipe={recipe} />
  }): null

  console.log(gptResponse)
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
        <button onClick={fetchRecipe}>find recipe</button>  
        <button onClick={clearIngredients}>clear ingredients</button>
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
          <div className='gptRes'>
            {renderRecipeResponse}
            
          </div>
          {/* <ul className='recipeList'>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default App;
