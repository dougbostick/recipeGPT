import './index.scss'
import {useState} from 'react'
import axios from 'axios'

export default function Assistant(){
    const [apiResponse, setApiResponse] = useState({})
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)


    const fetchAdvice = async () => {
        setApiResponse({})
        setLoading(true)
        try{
          const response = await axios.post('http://localhost:3001/gptAssist', {
            input
          })
          console.log('assist response', response.data)
          setApiResponse(response.data)
        }catch(err){
          console.log(err)
        }
        setLoading(false)
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchAdvice()
        setInput('')
    }

    const renderAssistantResponse = apiResponse.response ? <p>{apiResponse.response}</p> : null

    return(
        <div>
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
                        <button type='submit'>
                            <span class="material-symbols-outlined">
                                contact_support
                            </span>
                        </button>
                    </form>
                </div>
            </div>
                <div className='assistantResDiv'>
                    <h1>Let's talk food!</h1>
                    <div className='message'>
                    {loading ? 'Asking our LLM friend your question, one moment!' : renderAssistantResponse}
                </div>
                 </div>
            <div className='responseDiv'>

            </div>
        </div>
        
    )
}