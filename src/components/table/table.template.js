import { toInlineStyles } from "@core/utils";
import { defaultStyles } from "@/constants";
import { parse } from "@core/parse";

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const width = getWidth(state.colState, col);
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    });

    return `
      <div 
        class="cell" 
        data-col="${col}" 
        data-id="${id}"
        data-type="cell"
        data-value="${data || ""}"
        style="${styles}; width: ${width}"
        contenteditable
      >${parse(data) || ""}</div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";

  const height = getHeight(state, index);

  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}" 
      style="height: ${height}"
    >
      <div class="row-info">
        ${index ? index : ""}
        ${resize}  
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(index + CODES.A);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    };
  };
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A;
  const rows = [];

  const cols = new Array(colsCount)
      .fill("")
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join("");

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
        .fill("")
        .map(toCell(state, row))
        .join("");

    rows.push(createRow(row + 1, cell, state));
  }

  return rows.join("");
}
