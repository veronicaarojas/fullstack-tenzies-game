import React from 'react'
import { useState, useEffect } from 'react';
import Die from '../components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function Game() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);


  useEffect(() => {
    const allSame = dice.every(die => die.value === dice[0].value);
    const allHeld = dice.every(die => die.isHeld === true);
 
    if(allSame && allHeld) {
     setTenzies(true);
    }
    
   }, [dice]);
 
   
 
   function generateNewDie() {
     return {
       value: Math.ceil(Math.random() * 6),
         isHeld: false,
         id: nanoid()
     }
   }
 
   function allNewDice() {
     const diceArray = [];
     while(diceArray.length < 10) {
       diceArray.push(generateNewDie());
     }
     return diceArray;
   }
 
   
 
   function rollDice() {
     setRolls(prev => prev + 1);
     setDice(oldDice => oldDice.map((die) => {
       return die.isHeld ?  
       die 
       :
       generateNewDie()
     }));
   }
 
   function holdDice(id) {
    setDice(oldDice => oldDice.map((die) => {
     return die.id === id ? 
       {...die, isHeld: !die.isHeld} 
       : 
       die
    }))
   }
 
   function restartGame() {
     setDice(allNewDice());
     setTenzies(prev => !prev);
     setRolls(0);
   }
 
   
   const diceBlock = dice.map((die) => 
     <Die 
     key={die.id} 
     value={die.value} 
     isHeld={die.isHeld}
     id={die.id}
     holdDice={holdDice}/>
   )
 
   const button = tenzies ? 
   <button className="game--button" onClick={restartGame}>
     Restart Game
   </button>
   : 
   <button className="game--button" onClick={rollDice}>
     Roll
   </button>
 
   
 
  return (
    <main>

    {tenzies === true && 
    <Confetti
    width={1000}
    height={1000} /> }
      <h1 className='app--title'>Tenzies</h1>
      <p className='app--description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='roll--number'>No. of Rolls: {rolls}</div>
      <div className='dice--container'>
      {diceBlock}
      </div>
      {button}
      

    </main>
  )
}

export default Game