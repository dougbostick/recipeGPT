import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'
import portfolio from '../assets/portfolio.png'

export default function About(){

    return(
        <div className='about'>
            <h1>About Mise...</h1>
            <div className='aboutText'>
             <p>Mise is a service inspired by the surge in AI powered technology designed to modernize the way you search for recipes!</p>
             <p>It leverages the OpenAI API to and formats questions to interact with Large Language Models.</p>
             <p>Go ahead and ask the Culinary Assistant mode some questions about ANYTHING food related!</p>
             <p>Generate some recipes based on whatever ingredients you want using the Recipe Generator!</p>
             <p>Follow the links below to find out more about Doug Bostick, the engineer who designed Mise.</p>
            </div>
            <div className='aboutLinks'>
                <a href='https://dougbosticktech.com' >
                    <img className='port' src={portfolio} />
                </a>
                <a href='https://dougbosticktech.com'>
                <img className='linkedin'src={linkedin} />
                </a>
                <a href='https://dougbosticktech.com'>
                <img className='git'src={github} />
                </a>

            </div>
        </div>
    )
}