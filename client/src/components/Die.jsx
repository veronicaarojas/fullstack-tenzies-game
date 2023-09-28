import React from 'react';

function Die({value, isHeld, id, holdDice}) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  }

  return (
    <div 
    className="die" style={styles}
    onClick={() => holdDice(id)}
    >
      <div>{value}</div>
      </div>
  )
}

export default Die