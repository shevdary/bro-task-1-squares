class SuperTable {
  constructor(selector, rowCount, colCount) {
    this.$el = document.querySelector(selector);
    this.col = colCount;
    this.row = rowCount;
    this.mouseX = 0;
    this.mouseY = 0;
    this.positionRow = 0;
    this.positionCol = 0;
    this.maxCountRow = 0;
    this.tbody = document.querySelectorAll("tbody");
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
    tr.setAttribute("position", index);
    tagParent.appendChild(tr);
  };
  btnAddCol = () => {
    const addCol = document.querySelectorAll("tr");
    let index = Number(addCol[0].lastElementChild.getAttribute("position"));
    this.visibleBtn(".deleteCol");
    for (const item of addCol) {
      this.createElements("td", item, "col", index + 1);
    }
  };
  btnAddRow = () => {
    const tbodyChildren = this.tbody[0].children;
    const childrenLen = tbodyChildren[0].children.length;

    const index = this.tbody[0].lastElementChild.getAttribute("position");
    if (index === this.maxCountRow) {
      this.createElements("tr", this.$el, "row", Number(index) + 1);
    } else if (index !== this.maxCountRow) {
      this.createElements("tr", this.$el, "row", Number(this.maxCountRow) + 1);
    }
    for (let q = 0; q < childrenLen; q++) {
      let bodyRow = this.tbody[0].lastElementChild;
      this.createElements("td", bodyRow, "col", q);
    }
    this.visibleBtn(".deleteRow");
  };
  deleteRow = () => {
    const styleBtn = document.querySelector(".deleteRow");
    for (let a of this.tbody) {
      const children =
        a.children[
          [...a.children].findIndex(
            row => row.getAttribute("position") === this.positionRow
          )
        ];
      /*console.log(children, a.lastElementChild);
      console.log("----------------------------");
      console.log(children === a.lastElementChild);
      children === a.lastElementChild
        ? styleBtn.classList.add("top")
        : styleBtn.classList.remove("top");*/
      children.remove();
      this.hiddenBtn(a.children, ".deleteRow");
    }
  };
  deleteCol = () => {
    const getBody = document.querySelectorAll("tr");
    for (let a of getBody) {
      const childCol =
        a.children[
          [...a.children].findIndex(
            col => col.getAttribute("position") === this.positionCol
          )
        ];
      childCol.remove();
      this.hiddenBtn(getBody[0].children, ".deleteCol");
    }
  };
  moveBtnCol = (event, rmCol) => {
    let e = event;
    this.positionCol = e.target.getAttribute("position");
    this.mouseX = e.target.offsetLeft;
    const move = () => {
      rmCol.style.left = this.mouseX + 124 + "px";
    };
    move();
  };
  moveBtnRow = (event, rmRow) => {
    const e = event;
    const tbodyChildren = this.tbody[0].children;
    /*rmRow.classList.add('hideLastElement')*/
    for (let index of tbodyChildren) {
      this.maxCountRow = Math.max(Number(index.getAttribute("position")));
    }
    this.positionRow = e.target.parentElement.getAttribute("position");
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
    col.style.display = "none";
    row.style.display = "none";
  };
  visibleBtn = className => {
    document.querySelector(className).style.visibility === "hidden"
      ? (document.querySelector(className).style.visibility = "visible")
      : "";
  };
  hiddenBtn = (parentElement, className) => {
    if (className === ".deleteRow") {
      parentElement.length < 2
        ? (document.querySelector(className).style.visibility = "hidden")
        : (document.querySelector(className).style.visibility = "visible");
    } else if (className === ".deleteCol") {
      parentElement.length < 2
        ? (document.querySelector(className).style.visibility = "hidden")
        : (document.querySelector(className).style.visibility = "visible");
    }
  };
}
