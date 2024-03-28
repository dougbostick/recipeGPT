import './App.scss';
import {useState, useEffect} from 'react';
import Assistant from './Assistant/Assistant';
import logo from './assets/logo.png'
import RecipeFinder from './RecipeFinder/RecipeFinder';
import About from './About/About';
import Burger from './Burger/Burger';

function App() {
  const [view, setView] = useState('recipe')
  const [burger, setBurger] = useState(false)

  const handleView = (option) => {
    setView(option)
    // setBurger(true)
    console.log(view, burger)
  }

  useEffect(() => {
    setBurger(!burger)
  }, [view])

  return (
    <div className="App">
      <div className='header'>
        <img src={logo} />
        <Burger handleView={handleView} burger={burger} setBurger={setBurger}/>
      </div>
      <div className='main'>
        {view === 'assistant' ? <Assistant /> : null}
        {view === 'recipe' ? <RecipeFinder /> : null}
        {view === 'about' ? <About /> : null}
      </div>
    </div>
  );
}

export default App;
