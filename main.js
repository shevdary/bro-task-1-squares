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
    this.rmCol = document.querySelector(".deleteCol");
    this.rmRow = document.querySelector(".deleteRow");
    this.addEvent();
    this.drawTable();
  }
  addEvent = () => {
    const rect = document.querySelector("#rect-block");
    const addCol = document.querySelector(".addCol");
    const addRow = document.querySelector(".addRow");
    const square = document.getElementById("square");
    rect.addEventListener("mousemove", e => this.dragNdrop(e));
    rect.addEventListener("mousemove", e => this.moveBtnCol(e));
    rect.addEventListener("mousemove", e => this.moveBtnRow(e));
    square.addEventListener("mouseover", e => this.colCount(e));
    square.addEventListener("mouseout", e => this.rowCount(e));
    addCol.addEventListener("click", () => this.btnAddCol());
    this.rmCol.addEventListener("click", () => this.deleteCol());
    addRow.addEventListener("click", () => this.btnAddRow());
    this.rmRow.addEventListener("click", () => this.deleteRow());
  };
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
  moveBtnCol = event => {
    const e = event;
    const rmCol = document.querySelector(".deleteCol");
    this.positionCol = e.target.getAttribute("position");
    this.mouseX = e.target.offsetLeft;
    const move = () => {
      rmCol.style.left = this.mouseX + 124 + "px";
    };
    move();
  };
  moveBtnRow = event => {
    const e = event;
    const rmRow = document.querySelector(".deleteRow");
    const tbodyChildren = this.tbody[0].children;
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

  dragNdrop = () => {
    const dataChild = document.querySelector("#rect-block"),
      taskElement = dataChild.querySelectorAll(".row");
    let selectedNodePos = 0,
      node = "",
      selectedNodePosNext = 0;
    for (const list of taskElement) {
      list.draggable = true;
    }
    let childrenBody = document.querySelectorAll("tbody")[0].children;
    dataChild.addEventListener("dragstart", e => {
      const target = e.target;
      setTimeout(() => {
        target.style.opacity = "35%";
        node = target;
      }, 0);
    });
    dataChild.addEventListener("dragover", e => {
      e.preventDefault();
      const target = e.target;
      currentPosition(e.clientY);
    });
    const currentPosition = positionY => {
      childrenPosition();
      let nodeAbove, nodeBelow;
      for (let i = 0; i < dataChild.children.length; i++) {
        if (dataChild.children[i].getAttribute("totalPosition") < positionY) {
          nodeAbove = dataChild.children[i];
          node.style.background = "red";
          selectedNodePos = i;
          selectedNodePosNext = i + 1;
        } else {
          if (!nodeBelow) {
            nodeBelow = dataChild.children[i];
          }
        }
      }
      if (typeof nodeAbove == "undefined") {
        selectedNodePos = 0;
      }
      if (typeof nodeBelow == "object") {
        nodeBelow.style.transition = "1.8s";
      }
    };
    const childrenPosition = () => {
      for (let i = 0; i < dataChild.children.length; i++) {
        let elements = dataChild.children[i];
        let bound = elements.getBoundingClientRect();
        let yTop = bound.top;
        let yBtm = bound.bottom;
        dataChild.children[i].setAttribute(
          "totalPosition",
          yTop + (yTop - yBtm) / 2
        );
      }
    };
    dataChild.addEventListener("dragenter", e => {
      const target = e.target;
      for (let list of taskElement[
        target.parentElement.getAttribute("position")
      ].children) {
        list.classList.add("red");
      }
    });
    dataChild.addEventListener("dragleave", e => {
      const target = e.target;
      for (let list of taskElement[
        target.parentElement.getAttribute("position")
      ].children) {
        list.classList.remove("red");
      }
    });
    dataChild.addEventListener("dragend", e => {
      const target = e.target;
      taskElement[target.getAttribute("position")].style.opacity = "100%";
    });
    dataChild.addEventListener("drop", e => {
      e.preventDefault();
      let target = e.target;
      for (let list of taskElement[target.getAttribute("position")].children) {
        setTimeout(() => {
          list.classList.remove("red");
          list.style.transition = "2s";
        }, 10);
      }
      dataChild.insertBefore(node, dataChild.children[selectedNodePosNext]);
    });
  };
}



