import './index.scss'
import {useState} from 'react'
import Recipe from '../Recipe/Recipe'
import axios from 'axios'


export default function RecipeFinder(){
    const [view, setView] = useState(true)
    const [loading, setLoading] = useState(false)
    const [ingredients, setIngedients] = useState([])
    const [input, setInput] = useState('')
    const [apiResponse, setApiResponse] = useState({})

    const fetchRecipe = async () => {
        setApiResponse({})
        setView(false)
        setLoading(true)
        if(!ingredients.length){
          setApiResponse({})
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
            setApiResponse(response.data)
          } catch(err){
            console.log(err)
          }
        }
        setLoading(false)
      }

      const clearIngredients = () => {
        setIngedients([])
        setApiResponse({})
      }
    
      const toggleView = () => {
        setView(!view)
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setView(true)
        setIngedients([...ingredients, input])
        setInput('')
      }

      const noRecipes = (
        ingredients.length ? 
        <div className='message'>Sorry we couldn't find any recipes!</div> : <div className='message'>Enter some ingredients!</div>
       )

      const renderRecipeResponse = apiResponse.recipes ? apiResponse.recipes.map((recipe) => {
        {console.log(recipe)}
        return <Recipe recipe={recipe} />
      }): noRecipes

      const renderIngredients = ingredients.length ? ingredients.map((item) => {
        return(
          <li className='ingredientLi'>{item}</li>
        )}) : <div className='message'>Enter some ingredients!</div>


    return(
        <div className='component'>
          <div className='fillerDiv'>
            <div className='fillerText'>
              <div className='topText'>Enter your ingredients</div>
              <div className='midText'>Ask for some recipes</div>
              <div className='bottomText'>ABOUT FOOD</div>
              <div className='exampleText'>Need suggestions for vegan party guests? </div>
              <div className='exampleText2'>Finally learn how to cook rice??</div>
            </div>
           

          </div>
          <div className='apiDiv'>
            <div className='inputDiv'>
                <form onSubmit={handleSubmit}>
                    <input 
                    type='input' 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus={true} 
                    placeholder={'Add ingredients...'}
                    />
                    <button type='submit'>
                      <span class="material-symbols-outlined">
                        add
                      </span>
                    </button>
                </form>
          
            </div>
            <div className='responseDiv'>
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
                <div className='buttonDiv'>
                    {view && <button onClick={fetchRecipe}>
                        <span class="material-symbols-outlined">
                          search
                        </span>
                      </button>  }
                      {view && <button onClick={clearIngredients}>
                      <span class="material-symbols-outlined">
                        delete_forever
                      </span>
                        </button>}
                 
                    <button onClick={toggleView}>
                    <span class="material-symbols-outlined">
                      sync_alt
                    </span>   
                      </button>
                </div>
            </div>
          </div>
            
        </div>
    )
}