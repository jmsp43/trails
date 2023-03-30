///////////////////////////////////////////////
///////////////Global Variables/////////////////
///////////////////////////////////////////////
const board = document.querySelector("#gameCanvas");
const boardContext = board.getContext("2d");
const width = 700
const height = 500
board.width = width
board.height = height

//boardContext.imageSmoothingEnabled = false

let areImgsLoaded = false;
let imgs = [];
let imgUrls = [
  "./images/acorn.png",
  "./images/stone.png",
  "./images/leaf.png",
  "./images/bear.png",
  "./images/camera.png",
];

const rollBtn = document.querySelector("#rollDiceBtn");
const canteenBtn = document.querySelector("#canteenBtn");
const earnBadgeBtn = document.querySelector('#payForBadge')

let dx = 140;
let sunPosition = 0;

const goingLeft = dx === -140;
const goingRight = dx === 140;

let extraSteps = 0;

const diceResults = document.querySelector("#diceResults");

let sunX = 70;

const acornBadgeDeck = [
  {
    name: "The Climber",
    cost: 5,
    costType: "acorns",
    badgeType: "acorn",
        rewardPoints: 6,
    otherRewards: null
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "acorns",
    badgeType: "acorn",
    rewardPoints: 1,
          //* currentHiker.badgesEarned[].badgeType = 'acorn'
    otherRewards: null
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "acorns/stones",
    badgeType: "acorn",
      rewardPoints: 3,
    // otherRewards: currentHiker.resources[2].leaves+=2
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
  {
    name: "The Photographer",
    cost: 5,
    costType: "stones/leaves",
    badgeType: "stone",
    reward: `4 Victory Points and you get to take a new photo!`,
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "stones",
    badgeType: "stone",
    reward: `1 Victory Point for every ${this.badgeType} badge card earned by game end`,
  },
  {
    name: "The Climber",
    cost: 5,
    costType: "stones",
    badgeType: "stone",
    reward: `6 Victory Points`,
  },
  {
    name: "The Cartographer",
    cost: 4,
    costType: "stones/acorns",
    badgeType: "stone",
    reward: `3 Victory Points and 2 leaves`,
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "stones/leaves",
    badgeType: "stone",
    reward: `3 Victory Points and 2 acorns`,
  },
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
  {
    name: "The Photographer",
    cost: 5,
    costType: "leaves/acorns",
    badgeType: "leaf",
    reward: `4 Victory Points and you get to take a new photo!`,
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "leaves",
    badgeType: "leaf",
    reward: `1 Victory Point for every ${this.badgeType} badge card earned by game end`,
  },
  {
    name: "The Climber",
    cost: 5,
    costType: "leaves",
    badgeType: "leaf",
    reward: `6 Victory Points`,
  },
  {
    name: "The Cartographer",
    cost: 4,
    costType: "leaves/stones",
    badgeType: "leaf",
    reward: `3 Victory Points and 2 acorns`,
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "leaves/acorns",
    badgeType: "leaf",
    reward: `3 Victory Points and 2 stones`,
  },
];

let badgeDeck = [];
badgeDeck = badgeDeck.concat(acornBadgeDeck, stoneBadgeDeck, leafBadgeDeck);

const badgeListBtn = document.querySelector('#badgeListIcon')
const badgeInHandList = document.querySelector('#badgeInHandList')
const badgeEarnedList = document.querySelector('#badgeEarnedList')


const stats = document.querySelector("#stats")
///////////////////////////////////////////////
///////////////Classes/////////////////
///////////////////////////////////////////////

class Hiker {
  constructor(x, y, player, color) {
    this.x = x;
    this.y = y;
    this.player = player;
      this.color = color;
      this.resources = [{acorns: 1}, {stones: 1}, {leaves: 1}]
    this.photos = 0;
    this.badgesInHand = [];
    this.badgesEarned = [];
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
let backgroundImgs = [];
let backgroundUrls = [
//   { url: "./images/mountains.jpg", points: 0 },
    { url: "./parks/caddoLake.jpg", points: 2 },
    { url: "./parks/cathedralGorge.jpg", points: 2 },
    { url: "./parks/deadHorsePoint.jpg", points: 2 },
    { url: "./parks/eldorado.jpg", points: 3 },
    { url: "./parks/smokyMountains.jpg", points: 5 },
    { url: "./parks/iaoValley.jpg", points: 4 },
    { url: "./parks/kachemakBay.jpg", points: 2 },
    { url: "./parks/paloDuro.jpg", points: 3 },
    { url: "./parks/letchworth.jpg", points: 3 },
    { url: "./parks/watkinsGlen.jpg", points: 2 },
    { url: "./parks/acadia.avif", points: 4 }
];
let backgroundImgsLoaded = false;

function loadBackgroundImgs() {
  let count = 0;
  for (let i = 0; i < backgroundUrls.length; i++) {
    const img = new Image();
    img.src = backgroundUrls[i].url;
    //will only run when the img loads
    img.onload = () => {
      backgroundImgs.push(img);
      count++;
      if (count >= backgroundUrls.length) {
        backgroundImgsLoaded = true;
        drawBackgroundImgs();
      }
    };
  }
}
loadBackgroundImgs();

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
        clearBoard();
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
      x = 40;
    } else if (
      imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/leaf.png"
    ) {
      x = 180;
    } else if (
      imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/acorn.png"
    ) {
      x = 320;
    } else if (
      imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/bear.png"
    ) {
      x = 460;
    } else if (
      imgs[i].src === "http://127.0.0.1:5500/Week6/trails/images/camera.png"
    ) {
      x = 600;
    }
    boardContext.drawImage(imgs[i], x, 400, 70, 70);
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
  boardContext.arc(sunX, 75, 20, 3.15, 2 * Math.PI);
  boardContext.closePath();
  boardContext.fillStyle = "yellow";
  boardContext.fill();
}
drawSun();

function rollDice() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  if (diceNum === 1) {
      diceResults.innerHTML = "You get an acorn!";
      currentHiker.resources[0].acorns++
    // return;
  } else if (diceNum === 2) {
      diceResults.innerHTML = "You get a stone!";
      currentHiker.resources[1].stones++
    // return;
  } else if (diceNum === 3) {
    diceResults.innerHTML = "You get a leaf!";
    currentHiker.resources[2].leaves++
    // return;
  } else if (diceNum === 4) {
    diceResults.innerHTML = "You get a photo!";
    currentHiker.photos++;
    clearBoard()
    // return;
  } else if (diceNum === 5) {
    diceResults.innerHTML = "You get a badge card!";
    getBadgeCard();
    // return;
  } else {
    diceResults.innerHTML = "You get a bear!";
    console.log("figure out what bear means in this game");
    // return;
  }
    return;
}

function drawHiker(hiker) {
  boardContext.fillStyle = hiker.color;
  boardContext.strokeStyle = "chartreuse";
  boardContext.fillRect(hiker.x, hiker.y, 20, 20);
  boardContext.strokeRect(hiker.x, hiker.y, 20, 20);
}

let hiker1 = new Hiker(60, 200, 1, "gray");
let hiker2 = new Hiker(60, 300, 2, "black");
hiker2.isComputer = true;
let currentHiker = hiker2;
drawHiker(hiker1);
drawHiker(hiker2);
console.log(currentHiker.x)

function drawBackgroundImgs() {
  //console.log(currentHiker.photos)
  boardContext.drawImage(
    backgroundImgs[currentHiker.photos],
    0,
    0,
    width,
    height
  );
}

function activateCanteen() {
  currentHiker.canteenActivated === true;
  extraSteps = 2;
  //setting this to 2 for now
}

function moveHiker(event) {
  let keyPressed = event.key;

  //wrap entire following in an if and call moveSun if thats true
  if (currentHiker.canteenActivated === true) {
    if (keyPressed === left) {
      //&& goingRight === false
      dx = -140 * extraSteps;
      currentHiker.x += dx;
    }
    if (keyPressed === right) {
      //&& goingLeft === false
      dx = 140 * extraSteps;
      currentHiker.x += dx;
    }
    return;
  }
  if (keyPressed === "ArrowLeft") {
    //&& goingRight === false
    dx = -140;
    currentHiker.x += dx;
    clearBoard();
    drawHiker(currentHiker);
  }
  if (keyPressed === "ArrowRight") {
    //&& goingLeft === false
    dx = 140;
    currentHiker.x += dx;
    clearBoard();
    drawHiker(currentHiker);
  }
  if (currentHiker.x === 620 || currentHiker.x === 60) {
      moveSun();
      getBadgeCard()
  }
    gainResources();

    stats.innerText = JSON.stringify(currentHiker.resources)
    console.log(currentHiker.x)
}

function moveSun() {
  if (sunPosition <= 4) {
    sunPosition++;
    sunX += 140;
    clearBoard();
  }
  //trying to make it go backwards
  if (sunPosition >= 5) {
    sunPosition++;
    sunX -= 140;
    clearBoard();
  }
}

function whoseTurn() {
  //function to find out which hikers turn it is
}

function clearBoard() {
  //redraw everything
  //clearRect deletes while fill rect only draws
  boardContext.clearRect(0, 0, width, height);
  drawBackgroundImgs();
  for (let i = 0; i < width; i += width / 5) {
    draw(i, 75, i, width);
  }
  drawSun();
  drawHiker(hiker1);
  drawHiker(hiker2);
  drawImgs();
}

function gainResources() {
  if (currentHiker.x == 60) {
    currentHiker.resources[1].stones++
  } else if (currentHiker.x == 200) {
    currentHiker.resources[2].leaves++
  } else if (currentHiker.x == 340) {
    currentHiker.resources[0].acorns++
  } else if (currentHiker.x == 480) {
    console.log("user rolls dice at bear spot");
  } else if (currentHiker.x == 620) {
    currentHiker.photos++;
    clearBoard();
  }
}

function getBadgeCard() {
  if (
    currentHiker.x === 620 ||
    currentHiker.x === 60 ||
    (diceResults.innerHTML = "You get a badge card!")
  ) {
      let pickedCard = badgeDeck[Math.floor((Math.random() * 21))]
   //give user random badge card (push to badgesInHand array property)
      currentHiker.badgesInHand.push(pickedCard)
      let pickedCardIndex = badgeDeck.indexOf(pickedCard)
      badgeDeck.splice(pickedCardIndex, 1)
      console.log(badgeDeck.length)
      console.log(currentHiker.badgesInHand)
    //take used badge card and take out from initial badge card deck
      
    //if user wants to pay for it on the spot, they can if they have the resources (if resource needed is greater than or equal to what they have, payforBadge)
  }
}

function payForBadge() {
    for (let i = 0; i < currentHiker.resources.length; i++){
        
    }
  //(push to badges earned, pop from badges inHand, and decrement resources accordingly, and give whatever additional reward earned by paying for badge)
}

function calculateScore() {}

function runGame() {}
console.log(currentHiker);
///////////////////////////////////////////////
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

earnBadgeBtn.addEventListener("click", function (event) {
    event.preventDefault()
    payForBadge()
})


badgeListBtn.addEventListener("click", function (event) {
    event.preventDefault()

    badgeInHandList.innerText = JSON.stringify(currentHiker.badgesInHand)
    badgeEarnedList.innerHTML = JSON.stringify(currentHiker.badgesEarned)
    //clear results shown onscreen at end of turn somehow

})


// const acornBadgeDeck = [
//     {
//       name: "The Climber",
//       cost: 5,
//       costType: "acorns",
//       badgeType: "acorn",
//           rewardPoints: 6,
//       otherRewards: null
//     },
//     {
//       name: "The Collector",
//       cost: 3,
//       costType: "acorns",
//       badgeType: "acorn",
//       rewardPoints: 1,
//             //* currentHiker.badgesEarned[].badgeType = 'acorn'
//       otherRewards: null
//     },
//     {
//       name: "The Navigator",
//       cost: 4,
//       costType: "acorns/stones",
//       badgeType: "acorn",
//         rewardPoints: 3,
//       otherRewards: currentHiker.resources[2].leaves+=2
//     },
//     {
//       name: "The Astronomer",
//       cost: 4,
//       costType: "acorns",
//       badgeType: "acorn",
//       reward: `1 Victory Point and you get to earn another random badge card plus it's reward at no cost!`,
//     },
//     {
//       name: "The Cartographer",
//       cost: 4,
//       costType: "acorns/leaves",
//       badgeType: "acorn",
//       reward: `3 Victory Points and 2 stones`,
//     },
//     {
//       name: "The Photographer",
//       cost: 5,
//       costType: "acorns/stones",
//       badgeType: "acorn",
//       reward: `4 Victory Points and you get to take a new photo!`,
//     },
//     {
//       name: "First Aid",
//       cost: 2,
//       costType: "acorns",
//       badgeType: "acorn",
//       reward: `1 Victory Point and 1 resource of your choosing (any type)`,
//     },
//   ];