import React from 'react'
import { useEffect, useState } from 'react';

function LeaderBoard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords();

  }, [records]);

  const getRecords = async () => {
    try {
      const response = await fetch('http://localhost:3001/leaderboard', {
        method: "GET"
      });
      const data = await response.json();
      setRecords(data);
    } catch(error) {
      console.log(error);
    }
  }
  return (
    <main>
      <div>
        leaderboard
      </div>
    </main>
  )
}

export default LeaderBoard