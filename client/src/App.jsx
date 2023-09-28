import './App.css';
import Game from './pages /Game';
import LeaderBoard from './pages /LeaderBoard';
import NavBar from './components/NavBar';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  


  

  




  return (
    <div>
      <div>
      <NavBar />

      </div>
       

      
      <Routes>
      <Route path='/' element={<Game />}/>
      <Route path='/leaderboard' element={<LeaderBoard />}/>
    </Routes>
    </div>
    
  )
}

export default App