
const Square = new SuperTable("#rect-block", "4", "4");
Square.drawTable();

const block = document.querySelector("#rect-block");
const btnCol = document.querySelector(".addCol");
const btnRow = document.querySelector(".addRow");
const rmRow = document.querySelector(".deleteRow");
const rmCol = document.querySelector(".deleteCol");
const square = document.getElementById("square");

btnCol.addEventListener("click", () => Square.btnAddCol());
btnRow.addEventListener("click", () => Square.btnAddRow());
rmRow.addEventListener("click", () => Square.deleteRow());
rmCol.addEventListener("click", () => Square.deleteCol());
block.addEventListener("mousemove", e => Square.removeCol(e, rmCol));
block.addEventListener("mousemove", e => Square.removeRow(e, rmRow));
square.addEventListener("mouseover", e => Square.colCount(e, rmCol, rmRow));
square.addEventListener("mouseout", e => Square.rowCount(e, rmCol, rmRow));