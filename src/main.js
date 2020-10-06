let block = document.querySelector("#rect-block");
let addColl = document.querySelector(".addCol");
let addRow = document.querySelector(".addRow");
let rmRow = document.querySelector(".deleteRow");
let rmCol = document.querySelector(".deleteCol");
let parent = document.querySelector(".parent-table");
let tbody = document.querySelectorAll("tbody");

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
  let currentChildIndex = tbody[0].children;

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

let mouseY = 0;
let positionRow = 0;
let mouseX = 0;
let positionCol = 0;
block.addEventListener("mousemove", removeRow);
function removeRow(event) {
  let e = event;
  positionRow = e.target.parentElement.id;
  mouseY = e.pageY;
  const move = () => {
    const p = "px";
    rmRow.style.marginTop = mouseY - Number(120) + p;
  };
  move();
}

rmRow.addEventListener("click", deleteRow);
function deleteRow() {
  let getBody = document.querySelectorAll("tbody")[0].children;
  getBody[positionRow].style.display = "none";
}

block.addEventListener("mousemove", removeCol);
function removeCol(event) {
  let e = event;
  positionCol = e.target.id;
  mouseX = e.pageX;
  const move = () => {
    const p = "px";
    rmCol.style.left = mouseX + Number(-50) + p;
  };
  move();
}

rmCol.addEventListener("click", deleteCol);
function deleteCol() {
  let getBody = document.querySelectorAll("tbody")[0].children;
  for (let a of getBody) {
    let childRow = a.children[positionCol];
    childRow.parentNode.removeChild(childRow);
  }
}
