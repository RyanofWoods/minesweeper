const tableBody = document.getElementById("minesweeper");
const table = document.querySelector("table");
const wrap = document.querySelector(".wrap");

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
  tableBody.innerHTML = "";
  // create rows based on given number (xTiles * xTiles)
  for (let step = 1; step <= xTiles; step += 1) {
    // Runs 5 times, with values of step 0 through 4.
    tableBody.insertAdjacentHTML("beforeend", tileRowHtml(xTiles));
  }
  wrap.style.width = xTiles * 24;
  table.style.maxWidth = xTiles * 24;
};

export { generateTiles };
