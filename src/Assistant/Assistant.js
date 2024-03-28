import './index.scss'
import {useState} from 'react'
import axios from 'axios'

export default function Assistant(){
    const [apiResponse, setApiResponse] = useState({})
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage ] = useState('')


    const fetchAdvice = async () => {
        setApiResponse({})
        setLoading(true)
        setMessage('Asking our LLM friend your question, one moment!')
        if(!input.length){
            setMessage('You forgot to ask a question!')
        } else {
            try{
                const response = await axios.post('http://localhost:3001/gptAssist', {
                  input
                })
                console.log('assist response', response.data)
                setApiResponse(response.data)
              }catch(err){
                console.log(err)
                setMessage('There was a problem reaching our LLM friend, try again later.')
              }
        }
        
        setLoading(false)
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchAdvice()
        setInput('')
    }

    const renderAssistantResponse = apiResponse.response ? <p>{apiResponse.response}</p> : message

    return(
        <div className='component'>
            <div className='fillerDiv'>
                <div className='fillerText'>
                <div className='topText'>ASK ME</div>
                <div className='midText'>ANYTHING</div>
                <div className='bottomText'>ABOUT FOOD</div>
                <div className='exampleText'>Need to know what temp to cook meat? Or how long it takes for dough to rise?</div>
                <div className='exampleText2'>Let me help!</div>
                </div>
            </div>
            <div className='apiDiv'>
                <div className='searchDiv'>
                    <div className='inputDiv'>
                        <form onSubmit={handleSubmit}>
                            <input 
                            type='input' 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus={true} 
                            placeholder={'Ask me a culinary question...'}
                            />
                            <button type='submit' className='subBtn'>
                                <span class="material-symbols-outlined">
                                    contact_support
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className='assistantResDiv'>
                    <div className='message'>
                        {loading ? message : renderAssistantResponse}
                    </div>
                </div>
            </div>  
        </div>
        
        
    )
}