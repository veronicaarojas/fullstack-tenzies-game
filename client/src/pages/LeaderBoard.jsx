import React from 'react'
import { useEffect, useState } from 'react';

function LeaderBoard() {
  const [records, setRecords] = useState([]);
  const reformattedData = reformatDates(records);
  console.log(reformattedData);

  useEffect(() => {
    getRecords();

  }, []);

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

  function reformatDates(records) {
    return records.map(item => {
      const originalDate = new Date(item.Date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      return { ...item, Date: formattedDate };
    });
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