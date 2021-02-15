// pre-initialise all variables
let xTiles = 0;
let mines = 0;
let mineArray = [];
let running = false;
let flags = 99;
let seconds = 0;
let tilesClicked = 0;

const table = document.querySelector("table");
const flagsElem = document.getElementById("flags_left");
const timerElem = document.getElementById("timer");
const face = document.getElementById("face");

const updateFlagCounter = () => {
  flagsElem.innerText = flags.toString(10).padStart(3, '0');
};

const displayTimer = () => {
  if (running === true && seconds < 999) {
    seconds += 1;
  }
  const time = seconds.toString(10).padStart(3, '0');
  timerElem.innerText = time;
};

const loadGame = (data) => {
  // reset all variables
  mines = data.mines;
  xTiles = data.xTiles;
  flags = mines;
  running = false;
  seconds = 0;
  tilesClicked = 0;
  mineArray = [];
  displayTimer();
  updateFlagCounter();
  face.classList.add("facesmile");
  face.classList.remove("facewin");
  face.classList.remove("facedead");
};

const generateMines = (tile) => {
  const noBombOnTileRow = tile.parentNode.rowIndex;
  const noBombOnTileCol = tile.cellIndex;

  // initialise an an array of xTiles * xTiles array with no mines
  for (let row = 0; row < xTiles; row += 1) {
    mineArray[row] = [];
    for (let col = 0; col < xTiles; col += 1) {
      mineArray[row].push(false);
    }
  }

  let minesLeft = mines;

  do {
    const randRow = Math.floor(Math.random() * xTiles);
    const randCol = Math.floor(Math.random() * xTiles);

    // if the random tile does not equal our clicked tile
    // check if there is a bomb there already
    if (randRow !== noBombOnTileRow || randCol !== noBombOnTileCol) {
      if (mineArray[randRow][randCol] === false) {
        mineArray[randRow][randCol] = true;
        minesLeft -= 1;
      }
    }
  } while (minesLeft > 0);
};

const markOpened = (tile) => {
  tile.classList.remove("unopened");
  tile.classList.add("opened");
};

const toggleFlag = (tile) => {
  // if it's unopened add the flag class
  if (tile.classList.contains("unopened")) {
    if (tile.classList.contains("flagged")) {
      flags += 1;
    } else {
      flags -= 1;
    }
    tile.classList.toggle("flagged");
  }
  updateFlagCounter();
};

const showMines = (isWin) => {
  // iterate over every tile
  for (let row = 0; row < xTiles; row += 1) {
    for (let col = 0; col < xTiles; col += 1) {
      // if there is a bomb there
      if (mineArray[row][col] === true) {
        // add a flag if won, otherwise show the mines on loss
        if (isWin) {
          table.rows[row].cells[col].classList.add("flagged");
          flags = 0;
          updateFlagCounter();
        } else {
          table.rows[row].cells[col].classList.add("mine");
        }
      }
    }
  }
};

const gameOver = () => {
  running = false;
  face.classList.remove("facesmile");
  face.classList.add("facedead");
  showMines(false);
};

const countNearbyMines = (tile) => {
  if (tile.classList.contains("opened")) return false;

  let count = 0;
  const row = tile.parentNode.rowIndex;
  const col = tile.cellIndex;

  // search the surrounding 8 tiles (search includes clicked tile)
  for (let rowOffset = -1; rowOffset < 2; rowOffset += 1) {
    for (let colOffset = -1; colOffset < 2; colOffset += 1) {
      // given tile offsetted by loop
      const checkRow = row + rowOffset;
      const checkCol = col + colOffset;

      // prevent errors by skipping rows/cols less than 0 and more than xTiles - 1
      if (checkRow >= 0 && checkRow <= xTiles - 1 && checkCol >= 0 && checkCol <= xTiles - 1) {
        // if there is a bomb there, increment the count
        if (mineArray[checkRow][checkCol]) {
          count += 1;
        }
      }
    }
  }
  return count;
};

const searchAdjacent = (tile) => {
  const nearbyMines = countNearbyMines(tile);
  if (nearbyMines === false) return;

  if (nearbyMines === 0) {
    markOpened(tile);

    const row = tile.parentNode.rowIndex;
    const col = tile.cellIndex;
    // cascade zeros by recursion
    // prevent searching in non existant cells
    if (row >= 0 && row < xTiles - 1) {
      if (col >= 0 && col < xTiles - 1) {
        searchAdjacent(table.rows[row + 1].cells[col + 1]); // down right
      }
      if (col >= 0 && col <= xTiles - 1) {
        searchAdjacent(table.rows[row + 1].cells[col]); // down
      }
      if (col > 0 && col <= xTiles - 1) {
        searchAdjacent(table.rows[row + 1].cells[col - 1]); // down left
      }
    }
    if (row >= 0 && row <= xTiles - 1) {
      if (col >= 0 && col < xTiles - 1) {
        searchAdjacent(table.rows[row].cells[col + 1]); // right
      }
      if (col > 0 && col <= xTiles - 1) {
        searchAdjacent(table.rows[row].cells[col - 1]); // left
      }
    }
    if (row > 0 && row <= xTiles - 1) {
      if (col >= 0 && col <= xTiles - 1) {
        searchAdjacent(table.rows[row - 1].cells[col]); // up
      }
      if (col > 0 && col <= xTiles - 1) {
        searchAdjacent(table.rows[row - 1].cells[col - 1]); // up left
      }
      if (col >= 0 && col < xTiles - 1) {
        searchAdjacent(table.rows[row - 1].cells[col + 1]); // up right
      }
    }
    // otherwise display number
  } else {
    tile.classList.add(`mine-neighbour-${nearbyMines}`);
    tile.classList.remove("unopened");
  }
};

const checkForWin = () => {
  let win = true;

  // iterate over every row and then cell
  // based on xtiles
  for (let row = 0; row < xTiles; row += 1) {
    for (let col = 0; col < xTiles; col += 1) {
      // every tile should be not unopened unless there is a bomb there
      if (mineArray[row][col] === true) continue;  
      if (table.rows[row].cells[col].classList.contains("unopened")) {
        win = false;
      }
      if (win === false) break;
    }
    if (win === false) break;
  }
  // if won, stop timer and put shades on
  if (win) {
    running = false;
    face.classList.remove("facesmile");
    face.classList.add("facewin");
    showMines(true);
  }
};

const checkTile = (tile) => {
  const row = tile.parentNode.rowIndex;
  const col = tile.cellIndex;

  // check for a bomb
  if (mineArray[row][col] === true) {
    tile.classList.add("mine");
    gameOver();
  } else {
    searchAdjacent(tile);
  }
};

const tileClick = (event) => {
  // start the game
  if (tilesClicked === 0) running = true;

  // on loss stop actions
  if (!running) return;

  const tile = event.currentTarget;

  // left click
  if (event.button === 0) {
    tilesClicked += 1;

    if (tilesClicked === 1) {
      // mines should be generated after first click to guarantee first move
      generateMines(tile);
      searchAdjacent(tile);
    } else {
      checkTile(tile);
    }
  // right click
  } else if (event.button === 2) {
    // right click
    toggleFlag(tile);
  }

  checkForWin();
};

document.addEventListener("DOMContentLoaded", () => {
  setInterval(displayTimer, 1000); // Every 1 second, update the timer
});

export { loadGame, tileClick };
