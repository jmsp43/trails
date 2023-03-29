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
const canteenBtn = document.querySelector("#canteenBtn");

let dx = 50;
let changingDirection = false;

// //set keycodes that already exist for pressing arrow keys
// const left = 37;
// const right = 39;

const goingLeft = dx === -50;
const goingRight = dx === 50;

let extraSteps = 0;

const diceResults = document.querySelector("#diceResults");

const acornBadgeDeck = [
  {
    name: "The Climber",
    cost: 5,
    costType: "acorns",
    badgeType: "acorn",
    reward: `6 Victory Points`,
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "acorns",
    badgeType: "acorn",
    reward: `1 Victory Point for every ${this.badgeType} badge card earned by game end`,
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "acorns/stones",
    badgeType: "acorn",
    reward: `3 Victory Points and 2 leafs`,
  },
  {
    name: "The Astronomer",
    cost: 4,
    costType: "acorns",
    badgeType: "acorn",
    reward: `1 Victory Point and you get to earn another random badge card plus it's reward at no cost!`,
  },
  {
    name: "The Cartographer",
    cost: 4,
    costType: "acorns/leaves",
    badgeType: "acorn",
    reward: `3 Victory Points and 2 stones`,
  },
  {
    name: "The Photographer",
    cost: 5,
    costType: "acorns/stones",
    badgeType: "acorn",
    reward: `4 Victory Points and you get to take a new photo!`,
  },
  {
    name: "First Aid",
    cost: 2,
    costType: "acorns",
    badgeType: "acorn",
    reward: `1 Victory Point and 1 resource of your choosing (any type)`,
  },
];

const stoneBadgeDeck = [
  {
    name: "Rappeling",
    cost: 4,
    costType: "stones",
    badgeType: "stone",
    reward: `1 Victory Point for each badge you have earned so far`,
  },
  {
    name: "First Aid",
    cost: 2,
    costType: "stones",
    badgeType: "stone",
    reward: `1 Victory Point and 1 resource of your choosing (any type)`,
  },
  {    name: "The Photographer",
  cost: 5,
  costType: "stones/leaves",
  badgeType: "stone",
  reward: `4 Victory Points and you get to take a new photo!`,},
  {    name: "The Collector",
  cost: 3,
  costType: "stones",
  badgeType: "stone",
  reward: `1 Victory Point for every ${this.badgeType} badge card earned by game end`,},
  {    name: "The Climber",
  cost: 5,
  costType: "stones",
  badgeType: "stone",
        reward: `6 Victory Points`,
    },
    {    name: "The Cartographer",
    cost: 4,
    costType: "stones/acorns",
    badgeType: "stone",
    reward: `3 Victory Points and 2 leaves`,},
  {    name: "The Navigator",
  cost: 4,
  costType: "stones/leaves",
  badgeType: "stone",
  reward: `3 Victory Points and 2 acorns`,}
];

const leafBadgeDeck = [
    {
      name: "The ShutterBug",
      cost: 4,
      costType: "leaves",
      badgeType: "leaf",
      reward: `2 Victory Points and you get 2 photos!`,
    },
    {
      name: "First Aid",
      cost: 2,
      costType: "leaves",
      badgeType: "leaf",
      reward: `1 Victory Point and 1 resource of your choosing (any type)`,
    },
    {    name: "The Photographer",
    cost: 5,
    costType: "leaves/acorns",
    badgeType: "leaf",
    reward: `4 Victory Points and you get to take a new photo!`,},
    {    name: "The Collector",
    cost: 3,
    costType: "leaves",
    badgeType: "leaf",
    reward: `1 Victory Point for every ${this.badgeType} badge card earned by game end`,},
    {    name: "The Climber",
    cost: 5,
    costType: "leaves",
    badgeType: "leaf",
          reward: `6 Victory Points`,
      },
      {    name: "The Cartographer",
      cost: 4,
      costType: "leaves/stones",
      badgeType: "leaf",
      reward: `3 Victory Points and 2 acorns`,},
    {    name: "The Navigator",
    cost: 4,
    costType: "leaves/acorns",
    badgeType: "leaf",
    reward: `3 Victory Points and 2 stones`,}
  ];

let badgeDeck = []
badgeDeck = badgeDeck.concat(acornBadgeDeck, stoneBadgeDeck, leafBadgeDeck)
///////////////////////////////////////////////
///////////////Classes/////////////////
///////////////////////////////////////////////

class Hiker {
  constructor(x, y, player, color) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.color = color;
    this.acorns = 1;
    this.stones = 1;
    this.leafs = 1;
    this.photos = 0;
    this.badges = 0;
    this.isComputer = false;
    this.canteenActivated = false;
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
    boardContext.drawImage(imgs[i], x, 130, 7, 7);
  }
}
//25 is stone, 86 is leaf, 147 is acorn

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
  boardContext.arc(30, 60, 7, 3.1, 2 * Math.PI);
  boardContext.closePath();
  boardContext.fillStyle = "yellow";
  boardContext.fill();
}
drawSun();

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
  //   boardContext.strokeStyle = "chartreuse";
  boardContext.fillRect(hiker.x, hiker.y, 7, 7);
  boardContext.strokeRect(hiker.x, hiker.y, 7, 7);
}

let hiker1 = new Hiker(25, 80, 0, "chocolate");
let hiker2 = new Hiker(25, 100, 1, "black");
hiker2.isComputer = true;
drawHiker(hiker1);
drawHiker(hiker2);

function activateCanteen() {
  Hiker.canteenActivated === true;
  extraSteps = 2;
  //setting this to 2 for now
}

function moveHiker(event) {
  let keyPressed = event.key;

  if (Hiker.canteenActivated === true) {
    if (keyPressed === left && goingRight === false) {
      dx = -50 * extraSteps;
      Hiker.x += dx;
    }
    if (keyPressed === right && goingLeft === false) {
      dx = 50 * extraSteps;
      Hiker.x += dx;
    }
    return;
  }
  if (keyPressed === "ArrowLeft" && goingRight === false) {
    dx = -50;
    hiker.x += dx;
    drawHiker(hiker);
  }
  if (keyPressed === "ArrowRight" && goingLeft === false) {
    dx = 50;
    hiker.x += dx;
    drawHiker(hiker);
  }
}

function whoseTurn() {
  //function to find out which hikers turn it is
}

function clearBoard() {
  //redraw everything
}

//25 is stone, 86 is leaf, 147 is acorn
function gainResources() {
  if (Hiker.x === 25) {
    Hiker.stones++;
  } else if (Hiker.x === 86) {
    Hiker.leafs++;
  } else if (Hiker.x === 147) {
    Hiker.acorns++;
  }
}

function payForBadge() {
  //
}

///////////////////////////////////////////////
///////////////Event Listeners/////////////////
///////////////////////////////////////////////

rollBtn.addEventListener("click", function (event) {
  event.preventDefault();
  rollDice();
});

canteenBtn.addEventListener("click", function (event) {
  event.preventDefault();
  activateCanteen();
});

document.addEventListener("keydown", function (event) {
  event.preventDefault();
  moveHiker(event);
});
