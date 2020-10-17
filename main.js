class SuperTable {
  constructor(selector, rowCount, colCount) {
    this.$el = document.getElementById("square");
    this.colCount = colCount;
    this.rowCount = rowCount;
    this.tbodyData = null;
    this.btnRmRow = null;
    this.btnRmCol = null;
    this.tableData=null;
    this.positionDelete = 0;
    this.targetElement = 0;
    this.drawTable();
    this.eventAction();
  }

  eventAction = () => {
    this.tbodyData = document.querySelector("tbody");
    this.btnRmRow = document.querySelector(".btn-rm-row");
    this.btnRmCol = document.querySelector(".btn-rm-col");
    const addRow = document.querySelector(".btn-add-row");
    const addCol = document.querySelector(".btn-add-col");
    addRow.addEventListener("click", this.addRow);
    addCol.addEventListener("click", this.addCell);
    this.btnRmRow.addEventListener("click", () => this.deleteRow());
    this.btnRmCol.addEventListener("click", () => this.deleteCell());
    this.$el.addEventListener("mousemove", e => this.showRemoveBtn(e));
    this.$el.addEventListener("mouseout", e => this.hideRemoveBtn(e));
    this.tbodyData.addEventListener("mouseover", e => this.mouseMoveY(e));
  };

  drawTable = () => {
    this.tableData = document.createElement("table");
    for (let i = 0; i < this.rowCount; i++) {
      const row = this.tableData.insertRow(i);
      row.setAttribute("class", "row-data");
      for (let j = 0; j < this.colCount; j++) {
        row.insertCell(j).setAttribute("class", "cell-data");
      }
    }
    this.drawButton("+", "btn-add-row", this.tableData);
    this.drawButton("+", "btn-add-col", this.tableData);
    this.drawButton("&minus;", "btn-rm-row", this.$el);
    this.drawButton("&minus;", "btn-rm-col", this.$el);

    this.$el.appendChild(this.tableData);
      this.tableData.setAttribute("class", "table");
  };

  drawButton = (textHTML, classListName, parentDiv) => {
    const btn = document.createElement("button");
    btn.innerHTML = textHTML;
    btn.classList.add(classListName);
    parentDiv.appendChild(btn);
  };

  addRow = () => {
    const newRow = this.tableData.children[0].insertRow();
    const cellCount = document.querySelector("tr").children.length;
    for (let i = 0; i < cellCount; i++) {
      newRow.insertCell(i).setAttribute("class", "row-data");
    }
  };

  addCell = () => {
    const newCellElement = this.tableData.children[0].children;
    for (let i = 0; i < newCellElement.length; i++) {
      newCellElement[i].insertCell().setAttribute("class", "cell-data");
    }
  };

  showRemoveBtn = e => {
    const targetTagName = e.target.tagName;
    if (targetTagName === "TD" || targetTagName === "TABLE" || targetTagName === "BUTTON") {
     this.btnRmRow.style.display = "block";
     this.btnRmCol.style.display = "block";
    }
  };

  hideRemoveBtn = e => {
    const targetElement = e.target.tagName;
    if (targetElement  !== "TD" && targetElement  !== "TABLE" && targetElement  !== "BUTTON") {
      document.querySelector(".btn-rm-row").style.display = "none";
      document.querySelector(".btn-rm-col").style.display = "none";
    }
    if (targetElement  === "TD") {
      const positionTR = e.target.parentNode;
      for (let i = 0; i < this.tbodyData.children.length; i++) {
        if (positionTR === this.tbodyData.children[i]) {
          this.positionDelete = positionTR;
        }
        for (let j = 0; j < this.tbodyData.children[i].children.length; j++) {
          const positionTD = this.tbodyData.children[i].children;
          if (positionTD[j] === e.target) {
            this.targetElement = j;
          }
        }
      }
    }
  };

  mouseMoveY = e => {
    const btnRow = document.querySelector(".btn-rm-row");
    const btnCol = document.querySelector(".btn-rm-col");
    const mousePositionTop = e.target.offsetTop;
    const mousePositionLeft = e.target.offsetLeft;
    btnRow.style.marginTop = mousePositionTop + 16 + "px";
    btnCol.style.marginLeft = mousePositionLeft + 16 + "px";
    btnCol.style.transition = "0.25s";
    btnRow.style.transition = "0.25s";
    this.visibleBtn();
  };

  deleteRow = () => {
    let rowCollection = this.tableData.children[0].children;
    for (let i = 0; i < this.tbodyData.children.length; i++) {
      if (this.positionDelete === rowCollection[i]) {
        rowCollection[i].parentElement.removeChild(rowCollection[i]);
      }
    }
    this.hiddenBtn();
  };

  deleteCell = () => {
    let tr = document.querySelectorAll("tr");
    for (let i = 0; i < tr.length; i++) {
      const currentChildren = tr[i].children;
      currentChildren[this.targetElement].remove();
    }
    this.hiddenBtn();
  };

  hiddenBtn = () => {
    const childTr = document.querySelectorAll("tr");
    this.btnRmRow.style.display = "none";
    this.btnRmCol.style.display = "none";
    childTr.forEach(tdChild => {
      if (tdChild.children.length < 2) {
        this.btnRmCol.style.visibility = "hidden";
      } else if (tdChild.children.length > 1) {
        this.btnRmCol.style.visibility = "visible";
      }
    });
    if (this.tbodyData.children.length < 2) {
      this.btnRmRow.style.visibility = "hidden";
    } else if (this.tbodyData.children.length > 1) {
      this.btnRmRow.style.visibility = "visible";
    }
  };

  visibleBtn = () => {
    const childTr = document.querySelectorAll("tr");
    childTr.forEach(tdChild => {
      if (tdChild.children.length > 1) {
        this.btnRmCol.style.visibility = "visible";
      }
    });
    if (this.tbodyData.children.length > 1) {
      this.btnRmRow.style.visibility = "visible";
    }
  };
}
