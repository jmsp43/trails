///////////////////////////////////////////////
///////////////Global Variables/////////////////
///////////////////////////////////////////////
const board = document.querySelector("#gameCanvas");
const boardContext = board.getContext("2d");
const width = board.width;
const height = board.height;

let areImgsLoaded = false;
let imgs = [];
let imgUrls = ["./images/acorn.png", "./images/stone.png", "./images/leaf.png"];

const rollBtn = document.querySelector("#rollDiceBtn");
const canteenBtn = document.querySelector('#canteenBtn')

let dx = 50;
let changingDirection = false;

//set keycodes that already exist for pressing arrow keys
const left = 37;
const right = 39;

let extraSteps = 0
///////////////////////////////////////////////
///////////////Functions/////////////////
///////////////////////////////////////////////

function loadImgs() {
  let count = 0;
  for (let i = 0; i < imgUrls.length; i++) {
    const img = new Image();
    img.src = imgUrls[i];
    //will only run when the img loads
    img.onload = () => {
      imgs.push(img);
      count++;
      if (count >= imgUrls.length) {
        areImgsLoaded = true;
        drawImgs();
      }
    };
  }
  //console.log(areImgsLoaded);
}
loadImgs();

function drawImgs() {
  let x;
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/stone.png") {
      x = 25;
    } else if (
      imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/leaf.png"
    ) {
      x = 86;
    } else if (
      imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/acorn.png"
    ) {
      x = 147;
    }
    boardContext.drawImage(imgs[i], x, 130, 10, 10);
  }
}

//drawing a line
function draw(X, Y, x, y) {
  boardContext.beginPath();
  boardContext.moveTo(X, Y);
  boardContext.lineTo(x, y);
  boardContext.strokeStyle = "white";
  boardContext.stroke();
}
//creating 5 sections on board with line drawings
for (let i = 0; i < width; i += width / 5) {
  draw(i, 75, i, width);
}

function drawSun() {
  boardContext.beginPath();
  boardContext.arc(30, 60, 10, 3.1, 2 * Math.PI);
  boardContext.closePath();
  boardContext.fillStyle = "yellow";
  boardContext.fill();
}
drawSun();
const diceResults = document.querySelector("#diceResults");

function rollDice() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  if (diceNum === 1) {
    diceResults.innerHTML = "You get an acorn!";
    return;
  } else if (diceNum === 2) {
    diceResults.innerHTML = "You get a stone!";
    return;
  } else if (diceNum === 3) {
    diceResults.innerHTML = "You get a leaf!";
    return;
  } else if (diceNum === 4) {
    diceResults.innerHTML = "You get a photo!";
    return;
  } else if (diceNum === 5) {
    diceResults.innerHTML = "You get a badge card!";
    return;
  } else {
    diceResults.innerHTML = "You get a bear!";
    return;
  }
}

function drawHiker(hiker) {
  boardContext.fillStyle = hiker.color;
  boardContext.strokeStyle = "chartreuse";
  boardContext.fillRect(hiker.x, hiker.y, 10, 10);
  boardContext.strokeRect(hiker.x, hiker.y, 10, 10);
}

let hiker1 = new Hiker(25, 80, 0, "black");
let hiker2 = new Hiker(25, 100, 0, "white");
hiker2.isComputer = true;

drawHiker(hiker1);
drawHiker(hiker2);

function activateCanteen(hiker) {
    hiker.canteenActivated === true
    extraSteps = 2
    //setting this to 2 for now
}

function moveHiker(hiker, event) {
  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;

  const goingLeft = dx === -50;
  const goingRight = dx === 50;
    if (hiker.canteenActivated === true){
        if (keyPressed === left && goingRight === false) {
            dx = -50 * extraSteps;
          }
          if (keyPressed === right && goingLeft === false) {
            dx = 50 * extraSteps;
          }
}
  if (keyPressed === left && goingRight === false) {
    dx = -50 * extraSteps;
  }
  if (keyPressed === right && goingLeft === false) {
    dx = 50 * extraSteps;
  }
}

// //this works but isn't feasible for all the images i need to load
// acornImg.onload = function () {
//   boardContext.drawImage(acornImg, 5, 5, 20, 20);
// //   boardContext.drawImage(stoneImg, 5, 5, 5, 5);
// //   boardContext.drawImage(leafImg, 5, 5, 5, 5);
// }

///////////////////////////////////////////////
///////////////Classes/////////////////
///////////////////////////////////////////////

class Hiker {
  constructor(x, y, player, color) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.color = color;
    this.isComputer = false;
    this.canteenActivated = false;
  }
  move1() {
    //move one space to the right
  }
  activateCanteen() {
    //move more than 1 space
  }
  gatherResources() {
    //choose resource
  }
  takePhoto() {
    //collect photo card
  }
  collectBadge() {
    //collect badge card
  }
}

///////////////////////////////////////////////
///////////////Event Listeners/////////////////
///////////////////////////////////////////////

rollBtn.addEventListener("click", function (event) {
  event.preventDefault();
  rollDice();
});

canteenBtn.addEventListener('click', function (event){
    event.preventDefault();

})

