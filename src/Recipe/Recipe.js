import {useState} from 'react'
import './index.scss'

export default function Recipe (props) {
    const [visible, setVisible] = useState(false)
    console.log('PROPS', props)
    const {recipe, ingredients, steps} = props.recipe
   
    const view = () => {
        setVisible(!visible)
    }
    return (
    <div className='singleRecipeDiv'>
        <h1 className='recipeTitle'>{recipe}</h1>
        {!visible && <h3 onClick={view} style={{fontStyle: 'italic'}}>Find out more...</h3>}
        {visible && <h3 onClick={view} style={{fontStyle: 'italic'}}>Find out less...</h3>}

        {visible && 
        <div className='recipeInfo'>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((item) => {
                return <li>{item}</li>
                })}
            </ul>
            <h2>Steps</h2>
            <ul className='stepsList'>
                {steps.map((step) => {
                return <li>{step}</li>
                })}
            </ul>
        </div>}
    
     </div>
    )
}