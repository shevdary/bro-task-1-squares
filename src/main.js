let block = document.querySelector("#rect-block");
let addColl = document.querySelector(".addCol");
let addRow = document.querySelector(".addRow");
let rmRow = document.querySelector(".deleteRow");
let rmCol = document.querySelector(".deleteCol");
let square= document.getElementById('square');
let tbody = document.querySelectorAll("tbody");

let mouseY = 0;
let positionRow = 0;
let mouseX = 0;
let positionCol = 0;

const pixel = "px";

for (let i = 0; i < 4; i++) {
  createElement("tr", block, "row", i);
  for (let j = 0; j < 4; j++) {
    let child = block.lastElementChild;
    createElement("td", child, "col", j);
  }
}

function createElement(tag, tagParent, className, index) {
  let tr = document.createElement(tag);
  tr.setAttribute("class", className);
  tr.setAttribute("id", index);
  tagParent.appendChild(tr);
}

addRow.addEventListener("click", addButtonRow);
function addButtonRow() {
  let addRow = document.querySelectorAll("tr");
  addRow.forEach(item => {
    createElement("td", item, "col");
  });
}

addColl.addEventListener("click", addButtonCol);
function addButtonCol() {
  let bodyChildren = tbody[0].children;
  let childrenLen = bodyChildren[0].children.length;
  createElement("tr", block, "row");
  for (let q = 0; q < childrenLen; q++) {
    let bodyRow = tbody[0].lastElementChild;
    createElement("td", bodyRow, "col", q);
  }
}

block.addEventListener("mousemove", removeRow);
function removeRow(event) {
  let e = event;
  positionRow = e.target.parentElement.id;
  mouseY = e.target.offsetTop;
  const move = () => {
    rmRow.style.marginTop = mouseY+1  + pixel;
  };
  move();
}

rmRow.addEventListener("click", deleteRow);
function deleteRow() {
  let getBody = document.querySelectorAll("tbody")[0].children;
  let childBody = getBody[positionRow];
  childBody==undefined?getBody.remove(childBody):childBody.parentNode.removeChild(childBody);
}

block.addEventListener("mousemove", removeCol);
function removeCol(event) {
  let e = event;
  positionCol = e.target.id;
  mouseX = e.target.offsetLeft;
  const move = () => {
    rmCol.style.left = mouseX+74+ pixel;
  };
  move();
}

rmCol.addEventListener("click", deleteCol);
function deleteCol() {
  let getBody = document.querySelectorAll("tbody")[0].children;
  for (let a of getBody) {
    let childRow = a.children[positionCol];
    childRow==undefined?getBody.remove(childRow):childRow.parentNode.removeChild(childRow);
  }
}

square.addEventListener("mouseover", colCount);
function colCount(event){
    rmCol.style.visibility='visible';
    rmRow.style.visibility='visible';
    oneLine();
}

square.addEventListener('mouseout',rowCount)
function rowCount(event) {
    rmRow.style.visibility='hidden';
    rmCol.style.visibility='hidden';
}

function oneLine() {
    let getBody = document.querySelectorAll("tbody")[0].children;
    let countCol=getBody[0].children.length;
    countCol<2?rmCol.style.visibility='hidden':rmCol.style.visibility='visible';
    let countRow=getBody.length;
    countRow<2?rmRow.style.visibility='hidden':rmRow.style.visibility='visible'
}
