const pattern = [0, 0, 0, 0, 1, 0, 0, 0, 0];
let color = 1;
function show() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      var cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText =
        pattern[i * 3 + j] === 2 ? "❌" : pattern[i * 3 + j] === 1 ? "⭕️" : "";
      cell.addEventListener("click", () => useMove(j, i));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}

function useMove(x, y) {
  pattern[y * 3 + x] = color;
  if (check(pattern, color)) {
    alert(color === 2 ? "❌ is Winner" : "⭕️ is Winner");
  }
  color = 3 - color;
  console.log(bestChoice(pattern, color));
  show();
  if (willWin(pattern, color)) {
    console.log(color === 2 ? "❌ will Win" : "⭕️ will Win");
  }
  computerMove();
}
function computerMove() {
  let choice = bestChoice(pattern, color);
  if (choice.point) {
    pattern[choice.point[1] * 3 + choice.point[0]] = color;
  }
  if (check(pattern, color)) {
    alert(color === 2 ? "❌ is Winner" : "⭕️ is Winner");
  }
  color = 3 - color;
  show();
}

function check(pattern, color) {
  // 检查横行
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j] !== color) win = false;
    }
    if (win) return true;
  }
  // 检查列
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + i] !== color) win = false;
    }
    if (win) return true;
  }
  {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + j] !== color) win = false;
    }
    if (win) return true;
  }
  {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + 2 - j] !== color) win = false;
    }
    if (win) return true;
  }
  return false;
}
function clone(pattern) {
  return Object.create(pattern);
}
function willWin(pattern, color) {
  // 检查横行
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j]) continue;
      let tmp = clone(pattern);
      tmp[i][j] = color;

      if (check(tmp, color)) return true;
    }
  }
  return false;
}
function bestChoice(pattern, color) {
  let p;
  if ((p = willWin(pattern, color))) {
    return {
      point: p,
      result: 1,
    };
  }
  let result = -2;
  let point = null;
  for (let i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (pattern[i * 3 + j]) continue;
      let tmp = clone(pattern);
      tmp[i * 3 + j] = color;
      let r = bestChoice(tmp, 3 - color).result;
      if (-r > result) {
        result = -r;
        point = [j, i];
      }
    }
  }
  return {
    point,
    result: point ? result : 0,
  };
}

show();
