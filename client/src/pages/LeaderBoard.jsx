import React from 'react'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function LeaderBoard() {
  const [records, setRecords] = useState([]);
  const reformattedData = reformatDates(records);
  

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    reformatDates(records);
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

  function reformatDates(records) {
    const formattedDates = records.map(item => {
      const originalDate = new Date(item.Date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      return { ...item, Date: formattedDate };
    });

    formattedDates.sort((a, b) => {
      const scoreA = a.Rolls;
      const scoreB = b.Rolls;
      return scoreA - scoreB;
    })

    return formattedDates;
  }

  return (
    <main>
      <div className='leaderboard--titles'>
    <div>
      Date
    </div>
    <div>
      Rolls
    </div>
      </div>

      <div className='leaderboard' >

      
        {reformattedData.map((item) => 
          <div key={item.RollID} className='leaderboard--item'> 

          <div className='leaderboard--date'>
          {item.Date}
          </div>
          <div>
          {item.Rolls}
          </div>

          <button className='delete--button'>
          <FontAwesomeIcon icon={faTrashCan} />
          </button>
          
          
          </div>
        )}
        </div>
      
      
    </main>
  )
}

export default LeaderBoard