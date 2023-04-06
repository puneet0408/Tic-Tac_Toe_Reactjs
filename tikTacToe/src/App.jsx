import { useState } from 'react'
import './App.css'

 function Square({value ,onSquareClick}) {
  return (
 <>
   <button onClick={onSquareClick}  className="Square" >{value}</button>
 </>
  )
}
  

 function Board( {squares , isNext , onPlay}){
  function handleClick(i){
    if(squares[i] || winningCalculaton(squares)){
    return;
    }
    const nextSquare = squares.slice();
    if(isNext){
      nextSquare[i] = "x";
    }else{
      nextSquare[i] = "0";
    }
    onPlay(nextSquare);
   
  }

  const winner  = winningCalculaton(squares);

  let status ;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isNext ? "X" : "O");
  }

return(
  <>
  <div>{status}</div>
    < div className='board'>
<Square onSquareClick = {()=>handleClick(0)} value={squares[0]} />
<Square onSquareClick = {()=>handleClick(1)}   value={squares[1]} />
<Square onSquareClick = {()=>handleClick(2)} value={squares[2]} />
<Square onSquareClick = {()=>handleClick(3)}   value={squares[3]} />
<Square onSquareClick = {()=>handleClick(4)}   value={squares[4]} />
<Square onSquareClick = {()=>handleClick(5)}   value={squares[5]} />
<Square onSquareClick = {()=>handleClick(6)}   value={squares[6]} />
<Square onSquareClick = {()=>handleClick(7)}   value={squares[7]} />
<Square onSquareClick = {()=>handleClick(8)}   value={squares[8]} />
  </div>
  </>

)
}

export default function Game(){

const [history, setHistory] = useState([Array(9).fill(null)]);
   const [currentMove, setCurrentMove] = useState(0); // need for jumpTo function
    const currentSquares = history[currentMove]; // for tking last mive from history 
       const isNext = currentMove % 2 === 0;


    function handlePlay (nextSquare){
      const nextHistory = [...history.slice(0,currentMove+1),nextSquare];
      setCurrentMove(nextHistory.length - 1);
      setHistory(nextHistory)
    }

    const Moves = history.map((squares,move)=>{
      let discription;
      if(move>0){
        discription = 'go to move #'+move;
      }else{
        discription = 'go to game start';
      }
      return(
        <li key={move} >
          <button onClick={()=>jumpTo(move)} >{discription}</button>
        </li>
      )
    })

   function jumpTo(nextMove){
setCurrentMove(nextMove);
   }

return(
  <div className='game' >
<div className='gameBoard' >
  <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
</div>
<div className='game-info' >
  <ol>
    {Moves}
  </ol>
</div>
  </div>
)
}

function winningCalculaton (squares){
 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i<lines.length; i++){
const [a,b,c] = lines[i] // array distructuring
   if(squares[a] && squares[a]===squares[b] &&squares[a]===squares[c] ){
return squares[a];
   }
  }
return null;
}