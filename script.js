///////////////////////////////////////////////
///////////////Global Variables/////////////////
///////////////////////////////////////////////
const board = document.querySelector("#gameCanvas");
const boardContext = board.getContext("2d");
const width = board.width;
const height = board.height;

///////////////////////////////////////////////
///////////////Functions/////////////////
///////////////////////////////////////////////
// let acornImg = new Image();
// acornImg.src = "./images/acorn.png";
// let stoneImg = new Image();
// stoneImg.src = "./images/stone.png";
// let leafImg = new Image();
// leafImg.src = "./images/leaf.png";
let areImgsLoaded = false;
let imgs = [];
let imgUrls = ["./images/acorn.png", "./images/stone.png", "./images/leaf.png"];

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
  let xMiddle = width / 2;
  let yMiddle = height / 2;
  for (let i = 0; i < imgs.length; i++) {
    boardContext.drawImage(imgs[i], xMiddle, yMiddle, 10, 10);
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
drawSun()
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
const rollBtn = document.querySelector("#rollDiceBtn");
rollBtn.addEventListener("click", function (event) {
  event.preventDefault();
  rollDice();
});

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

let hiker1 = new Hiker(20, 20, 0, "black");
let hiker2 = new Hiker(20, 40, 0, "white");
hiker2.isComputer = true;

///////////////////////////////////////////////
///////////////Event Listeners/////////////////
///////////////////////////////////////////////
