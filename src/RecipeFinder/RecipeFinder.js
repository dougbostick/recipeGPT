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
            const response = await axios.post('https://mise-server.vercel.app/gpt', {
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

      const removeIngredient = (target) => {
        const newIngredients = ingredients.filter((item) => item !== target)
        setIngedients(newIngredients)
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
          <li className='ingredientLi'>
            {item}
            <div onClick={() => removeIngredient(item)}>X</div>
            </li>
        )}) : <div className='message'>Enter some ingredients!</div>


    return(
        <div className='component'>
          <div className='fillerDiv'>
            <div className='fillerText'>
              <div className='cook'>DON'T KNOW WHAT TO EAT?</div>
              <div className='tell'>Tell me what you have!</div>
              <div className='exampleText'>Add some ingredients and I'll give you some recipe suggestions!</div>
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
                    <button type='submit' className='subBtn'>
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
                    {loading ? <div className='message'>Let me think about that, one moment!</div> : renderRecipeResponse}   
                </div>
                </div>}
                <div className='buttonDiv'>
                    
                    {view && 
                        <span onClick={fetchRecipe} className="material-symbols-outlined">
                          search
                        </span>
                      }
                      {view && 
                      <span onClick={clearIngredients} className="material-symbols-outlined">
                        delete_forever
                      </span>
                        }
                        {apiResponse.recipes || !view  ? <button onClick={toggleView} className='toggle'> 
                          {view ? 'Recipes' : 'Ingredients'}
                    </button>: null}
                </div>
            </div>
          </div>
        </div>
    )
}