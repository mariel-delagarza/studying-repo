// Solution


// size is the given height/width - it will look like a rectangle
// because the newlines are taller than the character spaces are wide
let size = 8

// the board starts as an empty string - you are writing
// a program to print one continuous string, that 
// calculates when to place newlines 
let board = "";

// y = y-axis (up-down), x = x-axis (left-right)
// the first lines are the counters - run
// until you hit the given size
// and each time, add one 
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {

    // if the sum of size+size is
    // even, put a space
    if ((x+y) % 2 == 0) {
      board += " ";

    // otherwise, put a hash
    } else {
      board += "#";
    }
  }
  // you calculate odd and even
  // so you can put them 
  // every other place, like 
  // a chess/checkerboard

  
  // at the end of each run, start a new
  // line
  board += "\n";
}

console.log(board);

// to execute on command line, run
// "node <filename>" and hit enter
// here, that would be
// node eloquentJS-2-3.js