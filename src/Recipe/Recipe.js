import {useState} from 'react'

export default function Recipe (props) {
    const [visible, setVisible] = useState(false)
    console.log('PROPS', props)
    const view = () => {
        setVisible(!visible)
    }
    return (
    <div>
        Recipe
        {/* <h1>{gptResponse.recipe}</h1>
        {!visible && <h2 onClick={view}>Find out more...</h2>}
        {visible && <div>
        <h2>Ingredients</h2>
        <ul>
            {gptResponse.ingredients.map((item) => {
            return <li>{item}</li>
            })}
        </ul>
        <h2>Steps</h2>
        <ul>
            {gptResponse.steps.map((step) => {
            return <li>{step}</li>
            })}
        </ul>
        </div>} */}
    
     </div>
    )
}