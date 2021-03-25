import generateTiles from './generate_tiles';
import { loadGame, tileClick } from './check_tiles';

const table = document.querySelector('table');
const face = document.getElementById('face');
const difficultyElem = document.getElementById('difficulty');
let tiles;
let xTiles = 5;
let yTiles = 10;
let mines = 10;

const initiate = () => {
  const difficulty = difficultyElem.value;

  if (difficulty === 'beginner') {
    xTiles = 9;
    yTiles = 9;
    mines = 10;
  } else if (difficulty === 'intermediate') {
    xTiles = 16;
    yTiles = 16;
    mines = 40;
  } else if (difficulty === 'expert') {
    xTiles = 30;
    yTiles = 16;
    mines = 99;
  }

  loadGame({ xTiles, yTiles, mines });
  generateTiles(xTiles, yTiles);

  // The tiles must be captured after initiation!!
  tiles = document.querySelectorAll('#minesweeper td');

  tiles.forEach((tile) => {
    tile.addEventListener('mouseup', (event) => {
      face.classList.remove('facesuprised');
      tileClick(event);
    });
  });

  // imitate tile pressed
  tiles.forEach((tile) => {
    tile.addEventListener('mousedown', (event) => {
      if (event.button === 0) {
        tile.classList.add('pressed');
        face.classList.add('facesuprised');
      }
    });
  });
  tiles.forEach((tile) => {
    tile.addEventListener('mouseleave', () => {
      tile.classList.remove('pressed');
    });
  });
};

table.addEventListener('contextmenu', (event) => {
  event.preventDefault();
}, false);

// clicking the face
face.addEventListener('click', (event) => {
  // restart the game
  if (event.button === 0) {
    face.classList.remove('facepressed');
    initiate();
  }
});
face.addEventListener('mousedown', (event) => {
  if (event.button === 0) {
    face.classList.add('facepressed');
  }
});
face.addEventListener('mouseleave', (event) => {
  if (event.button === 0) {
    face.classList.remove('facepressed');
  }
});

initiate();

// TO DO:
// refactoring: including remove huge if statement mess on search adjacent
// split methods into seperate files or have one big one
// prettyify the counters and fix incorrect negative format (0-1)
// Tile pressed should work with dragging over other tiles
