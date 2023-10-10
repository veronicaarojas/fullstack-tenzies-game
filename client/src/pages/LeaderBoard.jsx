import React from 'react'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function LeaderBoard() {
  const [records, setRecords] = useState([]);
  const reformattedData = reformatDates(records);
  const [hoveredScores, setHoveredScores] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  


  
  const handleMouseOver = (RollID) => {
    setHoveredScores((prevHoveredScores) => ({
      ...prevHoveredScores,
      [RollID]: true
    }))
  }

  const handleMouseOut = (RollID) => {
    setHoveredScores((prevHoveredScores) => ( {
      ...prevHoveredScores, 
      [RollID]: false
    }))
  }
  

  useEffect(() => {
    getRecords();
  }, [currentPage]);

  useEffect(() => {
    reformatDates(records);
  }, [records]);

  const getRecords = async () => {
    try {
      const response = await fetch(`http://localhost:3001/leaderboard?page=${currentPage}&pageSize=5`, {
        method: "GET"
      });
      const data = await response.json();
      setRecords(data.records);
      setTotalPages(data.totalPages);
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

    return formattedDates;
  }

  function handleDelete(RollID) {
    deleteRecord(RollID);
  }

  const deleteRecord = async (RollID) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-roll/${RollID}`, {
        method: "DELETE"
      });
      if(!response.ok) console.log("an error occured")
      getRecords();
    } catch(err) {
      console.log(err);
    }

  }

  function previousPage() {
    setCurrentPage(prevPage => prevPage - 1)
  }

  function nextPage() {
    setCurrentPage(prevPage => prevPage + 1)
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
          <div
           key={item.RollID} 
           className='leaderboard--item'
           onMouseOver={() => handleMouseOver(item.RollID)}
           onMouseOut={() => handleMouseOut(item.RollID)}> 

          <div className='leaderboard--date'>
          {item.Date}
          </div>
          <div>
          {item.Rolls}
          </div>
          {hoveredScores[item.RollID] === true && 
          <button 
          className='delete--button'
          onClick={() => handleDelete(item.RollID)}>
          <FontAwesomeIcon icon={faTrashCan} />
          </button>
          }
          
          
          </div>
        )}
        <div className='pagination--section'>
          <div className='page--indicator'>
            {currentPage} of {totalPages}
          </div>
          <div
          className='pagination--buttons'>
          <button 
        onClick={previousPage}
        disabled={currentPage === 1}
        >
          -
        </button>
        <button
        onClick={nextPage}
        disabled={currentPage === totalPages}>
          +
        </button>
          </div>
        
        </div>

      
        </div>
      
      
    </main>
  )
}

export default LeaderBoard