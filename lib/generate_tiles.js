const tableBody = document.getElementById("minesweeper");
const wrap = document.getElementById("table-wrap");
const header = document.getElementById("minesweeper-header");

const tileRowHtml = (xTiles) => {
  // create a row of cells html
  let rowHtml = "<tr>";

  for (let step = 1; step <= xTiles; step += 1) {
    rowHtml += '<td class="unopened"></td>';
  }
  rowHtml += "</tr>";
  return rowHtml;
};

const generateTiles = (xTiles) => {
  // clear inner table cells
  tableBody.innerHTML = "";
  // create rows based on given number (xTiles * xTiles)
  for (let step = 1; step <= xTiles; step += 1) {
    // Runs 5 times, with values of step 0 through 4.
    tableBody.insertAdjacentHTML("beforeend", tileRowHtml(xTiles));
  }
  header.style.width = `${xTiles * 24 + 6}px`;
  wrap.style.width = `${xTiles * 24 + 6}px`;
};

export { generateTiles };
