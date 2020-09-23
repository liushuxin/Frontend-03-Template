const map = localStorage["map"]
  ? JSON.parse(localStorage["map"])
  : Array(10000).fill(0);

function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}
const mapContainer = document.getElementById("map");
for (let y = 0; y < 100; y++) {
  for (let x = 0; x < 100; x++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(100 * y + x + 1);

    if (map[100 * y + x] == 1) {
      cell.style.backgroundColor = "black";
    }
    cell.addEventListener("mousemove", () => {
      if (mousedown) {
        if (clear) {
          cell.style.backgroundColor = "";
          map[100 * y + x] = 0;
        } else {
          cell.style.backgroundColor = "black";
          map[100 * y + x] = 1;
        }
      }
    });
    mapContainer.appendChild(cell);
  }
}

let mousedown = false;
let clear = false;
document.addEventListener("mousedown", (e) => {
  mousedown = true;
  clear = e.which === 3;
});
document.addEventListener("mouseup", () => {
  mousedown = false;
});
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.getElementById("btn").addEventListener("click", () => {
  localStorage["map"] = JSON.stringify(map);
});
async function findPath(map, start, end) {
  let table = Object.create(map);
  let queue = [start];
  async function insert(x, y, pre) {
    if (y < 0 || y >= 100 || x < 0 || x >= 100) {
      return;
    }
    if (table[y * 100 + x]) return;
    await sleep(30);
    mapContainer.children[y * 100 + x].style.backgroundColor = "lightgreen";
    table[y * 100 + x] = pre;
    queue.push([x, y]);
  }

  while (queue.length) {
    let [x, y] = queue.shift();
    console.log([x, y]);
    if (x === end[0] && y === end[1]) {
      let path = [];
      while (x !== start[0] || y != start[1]) {
        path.push(map[y * 100 + x]);
        [x, y] = table[y * 100 + x];

        mapContainer.children[y * 100 + x].style.backgroundColor = "red";
      }

      return path;
    }

    await insert(x - 1, y, [x, y]);
    await insert(x, y - 1, [x, y]);
    await insert(x + 1, y, [x, y]);
    await insert(x, y + 1, [x, y]);

    // 斜向

    await insert(x - 1, y - 1, [x, y]);
    await insert(x + 1, y - 1, [x, y]);
    await insert(x - 1, y + 1, [x, y]);
    await insert(x + 1, y + 1, [x, y]);
  }
  return null;
}
