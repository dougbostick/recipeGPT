import './App.scss';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Recipe from './Recipe/Recipe';
import Assistant from './Assistant/Assistant';
import logo from './assets/logo.png'
import RecipeFinder from './RecipeFinder/RecipeFinder';

function App() {
  const [ingredients, setIngedients] = useState([])
  const [gptResponse, setGptResponse] = useState({})
  const [input, setInput] = useState('')
  const [view, setView] = useState('')
  const [loading, setLoading] = useState(false)
  const [assistantView, setAssistantView] = useState(false)
  const [assistantResponse, setAssistantResponse] = useState({})


  const fetchAdvice = async () => {
    setAssistantResponse({})
    setView(false)
    setAssistantView(true)
    setLoading(true)
    try{
      const response = await axios.post('http://localhost:3001/gptAssist', {
        input
      })
      console.log('assist response', response.data)
      setAssistantResponse(response.data)
    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }
  
  const fetchRecipe = async () => {
    setGptResponse({})
    setView(false)
    setLoading(true)
    if(!ingredients.length){
      setGptResponse({})
    } else {
      let ingredientList = ''
      for(const item of ingredients){
        ingredientList += (item + ', ')
      }
      try{
        const response = await axios.post('http://localhost:3001/gpt', {
         ingredientList
        })
        console.log('axios res', response.data)
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
    if(assistantView){
    
      setView(false)
      fetchAdvice()
      setInput('')
    } else {
      setView(true)
      setIngedients([...ingredients, input])
      setInput('')
    }
    
  }

  const toggleAssistant = () => {
    setAssistantView(!assistantView)
    setView(!view)
  }

    //need a button for assisnt view / recipe view toggle

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

  const renderAssistantResponse = assistantResponse.response ? <p>{assistantResponse.response}</p> : null

  const inputPlaceHolder = assistantView ? 'Ask me a culinary question' : 'What ingredients do you have?'

  const handleSelect = (e) => {
    setView(e.target.value)
    console.log(view)
  }
  return (
    <div className="App">
      <div className='header'>
        <img src={logo} />
        <div className='logo'>
          <select onChange={handleSelect}>
            <option value='recipe'>Recipe Finder</option>
            <option value='assistant'>Culinary Assistant</option>
            <option value='about'>About</option>

          </select>
        </div>
      </div>
      <div className='main'>
        {view === 'assistant' ? <Assistant /> : null}
        {view === 'recipe' ? <RecipeFinder /> : null}
      </div>
      {/* <div className='searchDiv'>
        <div>
          <h1>Mis En Place</h1>
          <button onClick={toggleAssistant} className='assitantToggle'>{assistantView ? 'Culinary Assistant' : 'Recipe Helper'}</button>
        </div>
        
        <div className='inputDiv'>
          <form onSubmit={handleSubmit}>
            <input 
            type='input' 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            autoFocus={true} 
            placeholder={inputPlaceHolder}
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
      
      <div className='responseDiv'>
        {!view && assistantView && <div className='assistantResDiv'>
            <h1>Let's talk food!</h1>
            <div className='message'>
             {loading ? 'Asking our LLM friend your question, one moment!' : renderAssistantResponse}
            </div>
          </div>}
        {view && !assistantView &&<div className='ingredientsDiv'>
          <h1>Ingredients</h1>
          <ul className='ingredientList'>
            {renderIngredients}
          </ul>
        </div>}
        {!view && !assistantView && <div className='recipeDiv'>
          <h1>Recipes</h1>
          <div className='gptRes'>
            {loading ? <div className='message'>Asking our LLM friend for recipes, one moment!</div> : renderRecipeResponse}   
          </div>
        </div>}
      </div> */}
    </div>
  );
}

export default App;
