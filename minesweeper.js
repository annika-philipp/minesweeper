document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
/*
var board = {
  cells: [
    {row: 0, col: 1, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 0, col: 2, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 0, col: 3, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 0, col: 4, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 1, col: 1, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 1, col: 2, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 1, col: 3, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 1, col: 4, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 2, col: 1, isMine: assignMines(), hidden: true, isMarked: false},
    {row: 2, col: 2, isMine: assignMines(), hidden: true, isMarked: false},
    {row: 2, col: 3, isMine: assignMines(), hidden: true, isMarked: false},
    {row: 2, col: 4, isMine: assignMines(), hidden: true, isMarked: false}, 
    {row: 3, col: 1, isMine: assignMines(), hidden: true, isMarked: false},
    {row: 3, col: 2, isMine: assignMines(), hidden: true, isMarked: false},
    {row: 3, col: 3, isMine: assignMines(), hidden: true, isMarked: false},
    {row: 3, col: 4, isMine: assignMines(), hidden: true, isMarked: false}, 
  ]
}
*/


//Defining board
var board = {
  cells: [

  ]
};

//Adding cells to board 

function createBoard () {
  board.cells = [];
  var boardWidth = document.getElementById("difficultyLevel").value;  //3, 5, 6
//  var boardWidth = 6;
    for (var x = 0; x < boardWidth; x++) { //loops rows
      for (var y = 0; y < boardWidth; y++) { //loops cols
        board.cells.push({row: x, col: y, isMine: assignMines(), hidden: true, isMarked: false, surroundingMines: 0}); //adds objects to array cells
      }
    } 
};



// randomly assign mines

function assignMines() {
  return (Math.random () < 0.2) //returns either true or false
}



function startGame () {
  // Don't remove this function call: it makes the game work!

  //adding create board into startGame
  createBoard();

  document.getElementById("difficultyLevel").onchange = resetBoard;
  document.getElementById("reset").onclick = resetBoard;
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  for (var i = 0; i < board.cells.length; i++){
    board.cells[i]['surroundingMines'] = countSurroundingMines(board.cells[i])

  }

  lib.initBoard()
}


//resets board
function resetBoard () {
  document.getElementsByClassName('board')[0].innerHTML = ''; //reassigns board to empty
  startGame();
}



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?


function checkForWin () {

  for (var i = 0; i < board.cells.length; i++){
    var cell = board.cells[i];

    if (cell.isMine &&  !cell.isMarked) {
      return;
    } 
    
    if (!cell.isMine && cell.hidden) {
      return;
    } 
  }
  lib.displayMessage('You win!')

}

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //lib.displayMessage('You win!')
 



// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  
  var count = 0
  for (var j = 0; j < surroundingCells.length; j++) {
    if (surroundingCells[j].isMine === true) {
      count++
    } 
  }
  return count;



}

