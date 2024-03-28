

export default function Burger(props){

    const toggleBurger = () => {
        setBurger(false)
    }
   
    const {handleView, burger, setBurger} = props
        return(
            <div className="burgerDiv">
               {burger && <span onClick={toggleBurger} class="material-symbols-outlined">
                    menu
                </span>}
               {!burger && <div onClick={toggleBurger} className='options'>
                    <div onClick={() => handleView('recipe')}>Recipe</div>
                    <div onClick={() => handleView('assistant')}>Assistant</div>
                    <div onClick={() => handleView('about')}>About</div>
                </div>}
            </div>         
        )
}