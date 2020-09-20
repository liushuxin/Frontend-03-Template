const trafficDOM = document.getElementById("traffic");
function turn_red() {
  const traffic = trafficDOM.getElementsByTagName("div");
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].classList.remove("light");
    document.getElementsByClassName("red")[0].classList.add("light");
  }
}

function turn_green() {
  const traffic = trafficDOM.getElementsByTagName("div");
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].classList.remove("light");
    document.getElementsByClassName("green")[0].classList.add("light");
  }
}
function turn_yellow() {
  const traffic = trafficDOM.getElementsByTagName("div");
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].classList.remove("light");
    document.getElementsByClassName("yellow")[0].classList.add("light");
  }
}

draw_light();
// function draw_light() {
//   turn_green();
//   sleep(10000)
//     .then(() => {
//       turn_yellow();
//       return sleep(2000);
//     })
//     .then(() => {
//       turn_red();
//       return sleep(5000);
//     })
//     .then(() => {
//       draw_light();
//     });
// }

async function draw_light() {
  turn_green();
  while (true) {
    await sleep(1000);

    turn_yellow();
    await sleep(2000);

    turn_red();
    await sleep(2000);
    draw_light();
  }
}
function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}
