class SuperTable {
  constructor(selector, rowCount, colCount) {
    this.$el = document.querySelector(selector);
    this.col = colCount;
    this.row = rowCount;
    this.positionRow = 0;
    this.positionCol = 0;
    this.mouseX = 0;
    this.mouseY = 0;
  }
  drawTable = () => {
    for (let i = 0; i < this.row; i++) {
      this.createElements("tr", this.$el, "row", i);
      for (let j = 0; j < this.col; j++) {
        let child = this.$el.lastElementChild;
        this.createElements("td", child, "col", j);
      }
    }
  };
  createElements = (tag, tagParent, className, index) => {
    const tr = document.createElement(tag);
    tr.setAttribute("class", className);
    tr.setAttribute("id", index);
    tagParent.appendChild(tr);
  };

  btnAddCol = () => {
    const addCol = document.querySelectorAll("tr");
    for (const item of addCol) {
      this.createElements("td", item, "col");
    }
  };
  btnAddRow = () => {
    const tbody = document.querySelectorAll("tbody");
    const tbodyChildren = tbody[0].children;
    const childrenLen = tbodyChildren[0].children.length;
    let index = tbodyChildren.length;
    this.createElements("tr", this.$el, "row", index);
    for (let q = 0; q < childrenLen; q++) {
      let bodyRow = tbody[0].lastElementChild;
      this.createElements("td", bodyRow, "col", q);
    }
  };
  deleteRow = () => {
    const getBody = document.querySelectorAll("tbody")[0].children;
    let childBody = getBody[this.positionRow];
    childBody == undefined
      ? getBody.remove(childBody)
      : childBody.parentNode.removeChild(childBody);
  };
  deleteCol = () => {
    const getBody = document.querySelectorAll("tbody")[0].children;
    for (let a of getBody) {
      let childRow = a.children[this.positionCol];
      childRow.parentNode.removeChild(childRow);
    }
  };
  removeCol = (event, rmCol) => {
    let e = event;
    this.positionCol = e.target.id;
    this.mouseX = e.target.offsetLeft;
    const move = () => {
      rmCol.style.left = this.mouseX + 124 + "px";
    };
    move();
  };
  removeRow = (event, rmRow) => {
    let e = event;
    this.positionRow = e.target.parentElement.id;
    this.mouseY = e.target.offsetTop;
    const move = () => {
      rmRow.style.marginTop = this.mouseY + 2 + "px";
    };
    move();
  };
  colCount = event => {
    let row = document.querySelector(".deleteRow");
    let col = document.querySelector(".deleteCol");
    col.style.display = "inline-block";
    row.style.display = "inline-block";
  };

  rowCount = event => {
    let row = document.querySelector(".deleteRow");
    let col = document.querySelector(".deleteCol");
    col.style.display = "inline-block";
    row.style.display = "inline-block";
  };
}
