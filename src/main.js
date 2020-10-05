let block = document.querySelector("#rect-block");
let addColl = document.querySelector(".addCol");
let addRow = document.querySelector(".addRow");

for (let i = 0; i < 5; i++) {
  createElement("tr", block, "row", i);
  for (let j = 0; j < 5; j++) {
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
  let getBody = document.querySelectorAll("tbody");

  let bodyChildren = getBody[0].children;
  let childrenLen = bodyChildren[0].children.length;

  createElement("tr", block, "row");

  for (let q = 0; q < childrenLen; q++) {
    let bodyRow = getBody[0].lastElementChild;
    createElement("td", bodyRow, "col", q);
  }
}




