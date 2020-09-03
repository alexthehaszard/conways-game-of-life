let rows = 50;
let cols = 100;

const appWrapper = document.querySelector("#app");

let blocks = [];

let runs = 0;

let frameRate = 10;
let interval;

let mouseDown = false;

createGrid();

function setup() {
  if (runs > 0) {
    clearInterval(interval);
    runs = 0;
    appWrapper.innerHTML = "";
    createGrid();
  } else {
    interval = setInterval(() => {
      gameLoop();
    }, 1000 / framerate);
  }
}

function gameLoop() {
  console.log("run:", runs);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      blocks[i][j].update();
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      blocks[i][j].on = blocks[i][j].next;
    }
  }
  runs++;
}

function createGrid() {
  for (let i = 0; i < rows; i++) {
    blocks[i] = [];
    for (let j = 0; j < cols; j++) {
      blocks[i].push(new Block(i, j));
      blocks[i][j].setup();
      // blocks[i][j].on = Math.floor(Math.random() * 15) == true;
    }
    const breaker = document.createElement("div");
    breaker.classList = "break";
    appWrapper.appendChild(breaker);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      blocks[i][j].update();
    }
  }
}

function updateFramerate(value) {
  framerate = value;
  clearInterval(interval);
  interval = setInterval(() => {
    gameLoop();
  }, 1000 / framerate);
}

document.body.onmousedown = () => {
  mouseDown = true;
  console.log("down");
};
document.body.onmouseup = () => {
  mouseDown = false;
  console.log("up");
};
