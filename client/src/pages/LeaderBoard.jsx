import React from 'react'
import { useEffect, useState } from 'react';

function LeaderBoard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    

  }, [records]);

  // const getRecords = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/leaderboard')
  //   }
  // }
  return (
    <main>
      <div>
        leaderboard
      </div>
    </main>
  )
}

export default LeaderBoard