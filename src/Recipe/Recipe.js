import {useState} from 'react'
import './index.css'

export default function Recipe (props) {
    const [visible, setVisible] = useState(false)
    console.log('PROPS', props)
    const {recipe, ingredients, steps} = props.recipe
    const view = () => {
        setVisible(!visible)
    }
    return (
    <div >
        Recipe
        <h1>{recipe}</h1>
        {!visible && <h2 onClick={view}>Find out more...</h2>}
        {visible && <h2 onClick={view}>Find out less...</h2>}

        {visible && <div>
        <h2>Ingredients</h2>
        <ul>
            {ingredients.map((item) => {
            return <li>{item}</li>
            })}
        </ul>
        <h2>Steps</h2>
        <ol>
            {steps.map((step) => {
            return <li>{step}</li>
            })}
        </ol>
        </div>}
    
     </div>
    )
}