///////////////////////////////////////////////
///////////////Global Variables/////////////////
///////////////////////////////////////////////
const board = document.querySelector("#gameCanvas");
const startBtn = document.querySelector("#startBtn");
const rollBtn = document.querySelector("#rollDiceBtn");
const canteenBtn = document.querySelector("#canteenBtn");
const earnBadgeBtn = document.querySelector("#payForBadge");
const diceResults = document.querySelector("#diceResults");
const badgeListBtn = document.querySelector("#badgeListBtn");
const badgeInHandList = document.querySelector("#badgeInHandList");
const badgesEarnedList = document.querySelector("#badgesEarnedList");
const stats = document.querySelector("#stats");
const updateInfo = document.querySelector("#updatesInfo");
const finishTurnBtn = document.querySelector("#finishedTurn");

const boardContext = board.getContext("2d");
const width = 700;
const height = 500;
board.width = width;
board.height = height;
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

let dx = 140;
let sunPosition = 0;
const goingLeft = dx === -140;
const goingRight = dx === 140;
let extraSteps = 0;
let sunX = 70;
let backgroundImgsLoaded = false;
let compTurnFinished = false;

badgeInHandList.style.display = "none";
badgesEarnedList.style.display = "none";
stats.style.display = "none";
///////////////////////////////////////////////
///////////////Classes/////////////////
///////////////////////////////////////////////

//done
class Hiker {
  constructor(x, y, player, color) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.color = color;
    this.resources = [{ acorns: 1 }, { stones: 1 }, { leaves: 1 }];
    this.photos = 0;
    this.victoryPoints = 0;
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

let hiker1 = new Hiker(60, 200, 1, "gray");
let hiker2 = new Hiker(60, 300, 2, "black");
hiker2.isComputer = true;
let currentHiker = hiker1;
//acorn, stone, leaf

const acornBadgeDeck = [
  {
    name: "The Climber",
    cost: 5,
    costType: "acorns",
    badgeType: "acorn",
    rewardPoints: 6,
    otherRewards: null,
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "acorns",
    badgeType: "acorn",
    rewardPoints: 1,
    //   * currentHiker.badgesEarned.badgeType === 'acorn',
    otherRewards: null,
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "acorns/stones",
    badgeType: "acorn",
    rewardPoints: 3,
    otherRewards: null,
    // otherRewards: currentHiker.resources[2].leaves+=2
  },
  {
    name: "The Astronomer",
    cost: 4,
    costType: "acorns",
    badgeType: "acorn",
    rewardPoints: 1,
    otherRewards: null,
    //   otherRewards: `Earn another random badge card plus it's reward at no cost!`
  },
  {
    name: "The Cartographer",
    cost: 4,
    costType: "acorns/leaves",
    badgeType: "acorn",
    rewardPoints: 3,
    otherRewards: null,
    //otherRewards: currentHiker.resources[0].stones+=2
  },
  {
    name: "The Photographer",
    cost: 5,
    costType: "acorns/stones",
    badgeType: "acorn",
    rewardPoints: 4,
    otherRewards: null,
    //otherRewards: currentHiker.photos++
  },
  {
    name: "First Aid",
    cost: 2,
    costType: "acorns",
    badgeType: "acorn",
    rewardPoints: 1,
    otherRewards: null,
    //   otherRewards: 'Roll the dice three times!'
  },
];

const stoneBadgeDeck = [
  {
    name: "Rappeling",
    cost: 4,
    costType: "stones",
    badgeType: "stone",
    rewardPoints: 1 * currentHiker.badgesEarned.length,
    otherRewards: null,
  },
  {
    name: "First Aid",
    cost: 2,
    costType: "stones",
    badgeType: "stone",
    rewardPoints: 1,
    otherRewards: null,
    //   otherRewards: 'Roll the dice three times!'
  },
  {
    name: "The Photographer",
    cost: 5,
    costType: "stones/leaves",
    badgeType: "stone",
    rewardPoints: 4,
    otherRewards: null,
    // otherRewards: currentHiker.photos++
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "stones",
    badgeType: "stone",
    rewardPoints: 1,
    // for every ${this.badgeType} badge card earned by game end`,
    otherRewards: null,
  },
  {
    name: "The Climber",
    cost: 5,
    costType: "stones",
    badgeType: "stone",
    rewardPoints: 6,
    otherRewards: null,
  },
  {
    name: "The Cartographer",
    cost: 4,
    costType: "stones/acorns",
    badgeType: "stone",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[2].leaves+=2
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "stones/leaves",
    badgeType: "stone",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[0].acorns+=2
  },
];

const leafBadgeDeck = [
  {
    name: "The ShutterBug",
    cost: 4,
    costType: "leaves",
    badgeType: "leaf",
    rewardPoints: 2,
    otherRewards: null,
    //   otherRewards: currentHiker.photos+=2
  },
  {
    name: "First Aid",
    cost: 2,
    costType: "leaves",
    badgeType: "leaf",
    rewardPoints: 1,
    otherRewards: null,
    //   otherRewards: 'Roll the dice three times!'
  },
  {
    name: "The Photographer",
    cost: 5,
    costType: "leaves/acorns",
    badgeType: "leaf",
    rewardPoints: 4,
    otherRewards: null,
    // otherRewards: currentHiker.photos++
  },
  {
    name: "The Collector",
    cost: 3,
    costType: "leaves",
    badgeType: "leaf",
    rewardPoints: 1,
    //Victory Point for every ${this.badgeType} badge card earned by game end`,
    otherRewards: null,
  },
  {
    name: "The Climber",
    cost: 5,
    costType: "leaves",
    badgeType: "leaf",
    rewardPoints: 6,
    otherRewards: null,
  },
  {
    name: "The Cartographer",
    cost: 4,
    costType: "leaves/stones",
    badgeType: "leaf",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[0].acorns+=2
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "leaves/acorns",
    badgeType: "leaf",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[1].stones+=2
  },
];

//otherRewards need to be null in entire deck UNTIL they get pushed to badges earned array aka they're payed for so therefore the reward will become active

let badgeDeck = [];
badgeDeck = badgeDeck.concat(acornBadgeDeck, stoneBadgeDeck, leafBadgeDeck);

let backgroundImgs = [];
let backgroundUrls = [
  {
    url: "./images/mountains.jpg",
    points: 0,
    description:
      "Welcome to Trails: The Digital Reimagining. This starting photo is of the Swiss Alps, but every photo in gameplay is of a US State or National Park.\n Click Start button to begin playing",
  },
  {
    url: "./parks/startGameSmokyMountains.jpg",
    points: 0,
    description: `Use your left and right arrow keys. Hike the trail until the sun returns to its origin position.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/caddoLake.jpg",
    points: 2,
    description: `Caddo Lake State Park: A treasure of East Texas, this state park is home to a national wildlife refuge with a sprawling maze of bayou and one of the only natural lakes in Texas. This photo is worth 2 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/cathedralGorge.jpg",
    points: 2,
    description: `Cathedral Gorge State Park in Nevada is a huge geologic preserve featuring a dramatic landscape of eroded soft bentonite clay formed into columns and spires. This photo is worth 2 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/deadHorsePoint.jpg",
    points: 2,
    description: `With scarce water and extreme temperatures, Dead Horse Point State Park in Utah is sure to have earned its name. Despite that, the gorgeous overlook of the Colorado River and Canyonlands National Park make this photo is worth 2 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/eldorado.jpg",
    points: 3,
    description: `It's hard to beat the view from the high altitude trail of Eldorado National Forest, located in the central Sierra Nevada mountain range, in eastern California. This photo is worth 3 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/smokyMountains.jpg",
    points: 5,
    description: `This photo is worth 5 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/iaoValley.jpg",
    points: 4,
    description: `This photo is worth 4 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/kachemakBay.jpg",
    points: 3,
    description: `This photo is worth 3 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/paloDuro.jpg",
    points: 3,
    description: `This photo is worth 3 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/letchworth.jpg",
    points: 2,
    description: `This photo is worth 2 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/watkinsGlen.jpg",
    points: 2,
    description: `This photo is worth 2 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    url: "./parks/acadia.avif",
    points: 4,
    description: `This photo is worth 4 points!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
];

//Object > Properties (key value pairs, methods)

///////////////////////////////////////////////
///////////////Functions/////////////////
///////////////////////////////////////////////

//done
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

//done
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

//done
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

//done
function draw(X, Y, x, y) {
  boardContext.beginPath();
  boardContext.moveTo(X, Y);
  boardContext.lineTo(x, y);
  boardContext.strokeStyle = "white";
  boardContext.stroke();
}

//done
function drawSun() {
  boardContext.beginPath();
  boardContext.arc(sunX, 75, 20, 3.15, 2 * Math.PI);
  boardContext.closePath();
  boardContext.fillStyle = "yellow";
  boardContext.fill();
}

//done
function rollDice() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  if (diceNum === 1) {
    diceResults.innerHTML = "You get an acorn!";
    currentHiker.resources[0].acorns++;
    // return;
  } else if (diceNum === 2) {
    diceResults.innerHTML = "You get a stone!";
    currentHiker.resources[1].stones++;
    // return;
  } else if (diceNum === 3) {
    diceResults.innerHTML = "You get a leaf!";
    currentHiker.resources[2].leaves++;
    // return;
  } else if (diceNum === 4) {
    diceResults.innerHTML = "You get a photo!";
    currentHiker.photos++;
    clearBoard();
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

//done
function drawHiker(hiker) {
  boardContext.fillStyle = hiker.color;
  boardContext.strokeStyle = "chartreuse";
  boardContext.fillRect(hiker.x, hiker.y, 20, 20);
  boardContext.strokeRect(hiker.x, hiker.y, 20, 20);
}

//done?
function drawBackgroundImgs() {
  //console.log(currentHiker.photos)
  boardContext.drawImage(
    backgroundImgs[currentHiker.photos],
    0,
    0,
    width,
    height
  );

  if (backgroundUrls[0]) {
    updateInfo.innerText = backgroundUrls[currentHiker.photos].description;
  } else {
    updateInfo.innerText =
      backgroundUrls[currentHiker.photos].description +
      "\n" +
      backgroundUrls[currentHiker.photos].playerTurn;
  }
}

//not done
function activateCanteen() {
  currentHiker.canteenActivated === true;
  extraSteps = 2;
  //setting this to 2 for now
}

//done
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
    getBadgeCard();
  }
  gainResources();
  stats.style.display = "block";
  updateResourcesOnScreen();

  if (currentHiker.isComputer === true) {
    compTurnFinished = true;
  }
}
//^make new string literal with all the properties
//class display none
//element.style.display = 'none'

// not done but good enough for today
function updateResourcesOnScreen() {
  let currentResources = document.createElement("div");
  currentResources.style.border = "red";
  let acorns = currentHiker.resources[0].acorns;
  let stones = currentHiker.resources[1].stones;
  let leaves = currentHiker.resources[2].leaves;
  currentResources.innerHTML = `Player ${currentHiker.player} stats: \n
        Acorns: ${acorns},
        Stones: ${stones},
        Leaves: ${leaves},`;
  stats.appendChild(currentResources);
  //replaceChild?
}

//done
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

//done
function whoseTurn() {
  stats.style.display = "none";
  //function to find out which hikers turn it is
  if (compTurnFinished && currentHiker === hiker1) {
    currentHiker = hiker2;
  } else if (compTurnFinished && currentHiker === hiker2) {
    currentHiker = hiker1;
  } else if (currentHiker === hiker1) {
    currentHiker = hiker2;
  } else {
    currentHiker = hiker1;
  }
}

//done
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

//think this is done
function gainResources() {
  if (currentHiker.x == 60) {
    currentHiker.resources[1].stones++;
  } else if (currentHiker.x == 200) {
    currentHiker.resources[2].leaves++;
  } else if (currentHiker.x == 340) {
    currentHiker.resources[0].acorns++;
  } else if (currentHiker.x == 480) {
    console.log("user rolls dice at bear spot");
  } else if (currentHiker.x == 620) {
    currentHiker.photos++;
    clearBoard();
  }
}

//think this is done
function getBadgeCard() {
  if (
    currentHiker.x === 620 ||
    currentHiker.x === 60 ||
    (diceResults.innerHTML = "You get a badge card!") ||
    currentHiker.badgesEarned.contains("Astronomer")
  ) {
    let pickedCard = badgeDeck[Math.floor(Math.random() * badgeDeck.length)];
    //give user random badge card (push to badgesInHand array property)
    currentHiker.badgesInHand.push(pickedCard);
    let pickedCardIndex = badgeDeck.indexOf(pickedCard);
    badgeDeck.splice(pickedCardIndex, 1);
    //take used badge card and take out from initial badge card deck
    console.log(badgeDeck.length)
  }
}
console.log(badgeDeck.length)
console.log(['splice', 'this', 'word'].splice(1, 1))
//returns 'this'
//not done but coming along nicely
//not removing the correct badge from badges in hand, but pushing the correct one to badges earned???
function payForBadge() {
    // let splicedBadge
  for (let i = 0; i < currentHiker.badgesInHand.length; i++) {
    let type = currentHiker.badgesInHand[i].costType;
      console.log(currentHiker.badgesInHand[i].cost)
    if (type === "acorns") {
      if (
        currentHiker.resources[0].acorns >= currentHiker.badgesInHand[i].cost
      ) {
        currentHiker.badgesEarned.push(currentHiker.badgesInHand[i]);
          currentHiker.resources[0].acorns -= currentHiker.badgesInHand[i].cost
          currentHiker.points += currentHiker.badgesInHand[i].rewardPoints


          currentHiker.badgesInHand.splice(i, 1);
        //   splicedBadge = currentHiker.badgesInHand.splice(currentHiker.badgesInHand[i], -1);
          console.log(currentHiker.badgesInHand)
          console.log('you earned your badge!')
      }else console.log('sorry, you need more acorns to earn this badge.')
    } else if (type === "stones") {
      if (
        currentHiker.resources[1].stones >= currentHiker.badgesInHand[i].cost
      ) {
        currentHiker.badgesEarned.push(currentHiker.badgesInHand[i]);
          currentHiker.resources[1].stones -= currentHiker.badgesInHand[i].cost
          currentHiker.points += currentHiker.badgesInHand[i].rewardPoints


          currentHiker.badgesInHand.splice(i, 1);
        //   splicedBadge = currentHiker.badgesInHand.splice(currentHiker.badgesInHand[i], -1);
        console.log(currentHiker.badgesInHand)
          console.log('you earned your badge!')
      } else console.log('sorry, you need more stones to earn this badge.')
    } else if (type === "leaves") {
      if (
        currentHiker.resources[2].leaves >= currentHiker.badgesInHand[i].cost
      ) {
        currentHiker.badgesEarned.push(currentHiker.badgesInHand[i]);
          currentHiker.resources[2].leaves -= currentHiker.badgesInHand[i].cost
          currentHiker.points += currentHiker.badgesInHand[i].rewardPoints


          currentHiker.badgesInHand.splice(i, 1);
        //   splicedBadge = currentHiker.badgesInHand.splice(currentHiker.badgesInHand[i], -1);
          console.log(currentHiker.badgesInHand)
          console.log('you earned your badge!')
      } else console.log('sorry, you need more leaves to earn this badge.')
    } else console.log("change the type to just one type bro");
  }

  //or if player has astronomer, give badge for free
}

//not done
function calculateScore() {
    if (sunPosition === 9) {
        if (hiker1.points > hiker2.points) {
            console.log('Hiker 1 wins!')
        } else if (hiker2.points > hiker1.points) {
            console.log('Hiker 2 wins!')
        } else {
            console.log(hiker1.points + ' ' + hiker2.points)
            console.log('either it is a tie or an error')
        }
    }
}

//not done
function runGame() {
  //creating 5 sections on board with line drawings
  for (let i = 0; i < width; i += width / 5) {
    draw(i, 75, i, width);
  }
  drawHiker(hiker1);
  drawHiker(hiker2);
  drawSun();
  loadImgs();

    calculateScore()
  //     boardContext.drawImage(
  //     backgroundImgs[1],
  //     0,
  //     0,
  //     width,
  //     height
  // );
  // updateInfo.innerText =
  // backgroundUrls[1].description +
  // "\n" +
  // backgroundUrls[1].playerTurn;
}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////Event Listeners/////////////////
///////////////////////////////////////////////

startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  runGame();
});

//done
rollBtn.addEventListener("click", function (event) {
  event.preventDefault();
  rollDice();
});

//done
canteenBtn.addEventListener("click", function (event) {
  event.preventDefault();
  activateCanteen();
});

//done
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  moveHiker(event);
});

//not done
earnBadgeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  payForBadge();
});

// let clicked = false
//done
badgeListBtn.addEventListener("click", function (event) {
  event.preventDefault();
// clicked = true

    if (currentHiker.badgesInHand.length > 0) {
        console.log(currentHiker.badgesInHand)
        console.log(currentHiker.badgesEarned)
    for (let i = 0; i < currentHiker.badgesInHand.length; i++) {
      let badgeInHand = document.createElement("div");
        badgeInHand.style.border = "red";
        console.log(currentHiker.badgesInHand[i])
      let name = currentHiker.badgesInHand[i].name;
      let rewardPoints = currentHiker.badgesInHand[i].rewardPoints;
      let cost = currentHiker.badgesInHand[i].cost;
      let costType = currentHiker.badgesInHand[i].costType;
      let badgeType = currentHiker.badgesInHand[i].badgeType;
      badgeInHand.innerHTML = `Badges In Your Hand: \n Name: ${name},
        Cost: ${cost},
        Reward Points: ${rewardPoints},
        Cost Type: ${costType},
        Badge Type: ${badgeType}`;
      badgeInHandList.appendChild(badgeInHand);
    }
    badgeInHandList.style.display = "block";
  }

  if (currentHiker.badgesEarned.length > 0) {
    for (let i = 0; i < currentHiker.badgesEarned.length; i++) {
      let badgeEarned = document.createElement("div");
      badgeEarned.style.border = "red";
      let name = currentHiker.badgesEarned[i].name;
      let rewardPoints = currentHiker.badgesEarned[i].rewardPoints;
      let cost = currentHiker.badgesEarned[i].cost;
      let costType = currentHiker.badgesEarned[i].costType;
      let badgeType = currentHiker.badgesEarned[i].badgeType;
      badgeEarned.innerHTML = `Badges Earned: \n Name: ${name},
        Cost: ${cost},
        Reward Points: ${rewardPoints},
        Cost Type: ${costType},
        Badge Type: ${badgeType}`;
      badgesEarnedList.appendChild(badgeEarned);
    }
    badgesEarnedList.style.display = "block";
  }
    // badgeListBtn.disabled = true
});

//done
finishTurnBtn.addEventListener("click", function (event) {
  event.preventDefault();
    whoseTurn();
    diceResults.innerHTML = ''
    badgeInHandList.innerHTML = ''
    badgesEarnedList.innerHTML = ''
    stats.innerHTML = ''
    calculateScore();
});
