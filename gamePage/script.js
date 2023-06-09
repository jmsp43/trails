///////////////////////////////////////////////
///////////////Global Variables/////////////////
///////////////////////////////////////////////
let gameOver = false;

const board = document.querySelector("#gameCanvas");
const startBtn = document.querySelector("#startBtn");
const rulesBtn = document.querySelector("#rulesBtn");
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
const badgesInHandBox = document.querySelector("#badgesInHandBox");
const badgesEarnedBox = document.querySelector("#badgesEarnedBox");
const restartBtn = document.querySelector("#restartBtn");
const purchaseResults = document.createElement("p");
const badgeBox = document.querySelector("#badgeBox");
const updatesBox = document.querySelector('#updatesBox')
const win = document.querySelector('#winner')
win.style.display = 'none'



const boardContext = board.getContext("2d");
const width = 700;
const height = 500;
board.width = width;
board.height = height;

let areImgsLoaded = false;
let imgs = [];
let imgUrls = [
  { name: "stone", url: "./images/stone.png" },
  { name: "leaf", url: "./images/leaf.png" },
  { name: "acorn", url: "./images/acorn.png" },
  { name: "dice", url: "./images/dice.png" },
  { name: "camera", url: "./images/camera.png" },
];

let usedImgs = [];
let needsPhotoUpdate = false;

let dx = 140;
let sunPosition = 0;
const goingLeft = dx === -140;
const goingRight = dx === 140;
let extraSteps = 0;
let sunX = 70;
let backgroundImgsLoaded = false;
let compTurnFinished = false;
let currentResources = document.createElement("div");

badgeInHandList.style.display = "none";
badgesEarnedList.style.display = "none";
stats.style.display = "none";
badgesEarnedBox.style.display = "none";
badgesInHandBox.style.display = "none";
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
    this.photoCollection = [];
    this.victoryPoints = 0;
    this.badgesInHand = [];
    this.badgesEarned = [];
    this.isComputer = false;
    this.canteenActivated = false;
  }
}

let hiker1 = new Hiker(60, 200, 1, "gray");
let hiker2 = new Hiker(60, 300, 2, "black");
hiker2.isComputer = true;
let currentHiker = hiker1;

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
    costType: "acorns",
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
    costType: "acorns",
    badgeType: "acorn",
    rewardPoints: 3,
    otherRewards: null,
    //otherRewards: currentHiker.resources[0].stones+=2
  },
  {
    name: "The Photographer",
    cost: 5,
    costType: "acorns",
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
    costType: "stones",
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
    costType: "stones",
    badgeType: "stone",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[2].leaves+=2
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "stones",
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
    costType: "leaves",
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
    costType: "leaves",
    badgeType: "leaf",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[0].acorns+=2
  },
  {
    name: "The Navigator",
    cost: 4,
    costType: "leaves",
    badgeType: "leaf",
    rewardPoints: 3,
    otherRewards: null,
    //   otherRewards: currentHiker.resources[1].stones+=2
  },
];

let badgeDeck = [];
badgeDeck = badgeDeck.concat(acornBadgeDeck, stoneBadgeDeck, leafBadgeDeck);

let backgroundImgs = [];
let backgroundUrls = [
  {
    name: "yosemite",
    url: "../parks/yosemite.jpg",
    points: 0,
    description:
      "Welcome to Trails: The Digital Reimagining. Every photo in gameplay is of a US State or National Park (including this one! Yosemite National Park in California).\nUse your left and right arrow keys. Hike the trail until the sun returns to its origin position.\nClick Start button to begin playing",
  },
  {
    name: "caddo lake",
    url: "../parks/caddoLake.jpg",
    points: 2,
    description: `Caddo Lake State Park: A treasure of East Texas, this state park is home to a national wildlife refuge with a sprawling maze of bayou and one of the only natural lakes in Texas.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "cathedral gorge",
    url: "../parks/cathedralGorge.jpg",
    points: 2,
    description: `Cathedral Gorge State Park in Nevada is a huge geologic preserve featuring a dramatic landscape of eroded soft bentonite clay formed into columns and spires.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "dead horse point",
    url: "../parks/deadHorsePoint.jpg",
    points: 2,
    description: `With scarce water and extreme temperatures, Dead Horse Point State Park in Utah is sure to have earned its name. Despite that, the gorgeous overlook of the Colorado River and Canyonlands National Park make this photo worth the trip.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "eldorado",
    url: "../parks/eldorado.jpg",
    points: 3,
    description: `It's hard to beat the view from the high altitude trail of Eldorado National Forest, located in the central Sierra Nevada mountain range, in eastern California.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "smoky mountains",
    url: "../parks/smokyMountains.jpg",
    points: 5,
    description: `It's no surprise that the Great Smoky Mountains are the most visited National Park in the US, with it's fresh "smoky" air (which is actually created by the millions of plants giving off organic compounds that create a blueish vapor!) and FREE entry.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "iao valley",
    url: "../parks/iaoValley.jpg",
    points: 4,
    description: `Iao Valley is a lush, stream-cut valley in West Maui, Hawaii, located in dense rainforest with an extinct volcano as it's peak. In 1972, this island oasis was designated a National Natural Landmark.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "kachemak bay",
    url: "../parks/kachemakBay.jpg",
    points: 3,
    description: `Kachemak Bay State Park is a whopping 400,000 acres and the only designated state park in Alaska. With no road access, albeit it is a harder visit than most, but the incredible biodiversity of this critical habitat area makes up for the hard journey.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "palo duro",
    url: "../parks/paloDuro.jpg",
    points: 3,
    description: `As the second largest canyon system in the United States, Palo Duro is 120 miles long with a maximum width of 20 miles. Pictured here is a particularly famous rock formation lovingly referred to as The Lighthouse.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "letchworth",
    url: "../parks/letchworth.jpg",
    points: 2,
    description: `Located in Western New York State 60 miles south of Buffalo is the hidden treasure of Letchworth State Park, known for it's 3 large waterfalls that flow into a deep gorge beneath that winds through the park. It's no wonder this place is called the Grand Canyon of the East!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "watkins glen",
    url: "../parks/watkinsGlen.jpg",
    points: 2,
    description: `In the Finger Lakes region of New York State hides the geological and historical wonder that is Watkins Glen State Park. Cut through by a glacier in the last ice age, this very narrow gorge is even climbable from May to November!`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: "acadia",
    url: "../parks/acadia.avif",
    points: 4,
    description: `Along Maine's beautiful coast lies Acadia National Park, housing the highest mountains on the Atlantic coast, cobble beaches, granite domes, and more. Acadia boasts rich bioversity, crisp air and water, and abundance human history dating back to over 10,000 years ago with the Wabanaki people.`,
    playerTurn: `It's player ${currentHiker.player}'s turn!`,
  },
  {
    name: 'badlands',
    url: '../parks/badlands.jpg',
    points: null,
    description: 'Badlands National Park in southwestern South Dakota is nearly 250,000 acres of sharply eroded buttes and pinnacles,along with the United States largest undisturbed mixed grass prairie. It is managed by the Oglala Lakota tribe in addition to the National Park Service.',
  playerTurn: `It's player ${currentHiker.player}'s turn!`
  },
  {
    name: 'capitol reef',
    url: '../parks/capitolReef.jpg',
    points: null,
    description: 'Located in south-central Utah in the heart of red rock country, Capitol Reef National Park is a hidden treasure filled with cliffs, canyons, domes, and bridges in the Waterpocket Fold, a geologic monocline (a wrinkle on the earth) extending almost 100 miles.',
  playerTurn: `It's player ${currentHiker.player}'s turn!`
  },
  {
    name: 'yoho',
    url: '../parks/yoho.jpg',
    points: null,
    description: 'Yoho National Park is located within the Rocky Mountains along the Continental Divide of the Americas, where glaciers and waterfalls cling to towering peaks. Ancient marine life and geological wonder are huge draws to this park.',
  playerTurn: `It's player ${currentHiker.player}'s turn!`
  },
  {
    name: 'mirror lake',
    url: '../parks/mirrorLake.jpg',
    points: null,
    description: 'Mirror Lake State Park in Wisconsin offers a smaller, less secluded experiece than some of these other parks, but instead extends the opportunity to dive into a 20+ feet deep, glassy, clear blue fresh water lake surrounded by sandstone bluffs.',
  playerTurn: `It's player ${currentHiker.player}'s turn!`
  },  {
    name: 'zion',
    url: '../parks/zion.jpg',
    points: null,
    description: 'Zion National Park is located in southern Utah near the city of Springdale, not far from Las Vegas, Salt Lake City, or St. George. Averaging 2,000 feet deep, Zion Canyon offers hiking opportunities along its floor in the 20 to 30 foot wide area known as The Narrows and the challenging area known as The Subway.',
  playerTurn: `It's player ${currentHiker.player}'s turn!`
  }
];


///////////////////////////////////////////////
///////////////Functions/////////////////
///////////////////////////////////////////////


function loadBackgroundImgs() {
  let count = 0;
  for (let i = 0; i < backgroundUrls.length; i++) {
    const img = new Image();
    img.src = backgroundUrls[i].url;
    img.place = backgroundUrls[i].name;
    img.points = backgroundUrls[i].points;
    //will only run when the img loads
    backgroundImgs.push(img);
    img.onload = () => {
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
    img.src = imgUrls[i].url;
    img.icon = imgUrls[i].name;
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
}


function drawImgs() {
  let x = 100;
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].icon === "stone") {
      x = 40;
    } else if (imgs[i].icon === "leaf") {
      x = 180;
    } else if (imgs[i].icon === "acorn") {
      x = 320;
    } else if (imgs[i].icon === "dice") {
      x = 460;
    } else if (imgs[i].icon === "camera") {
      x = 600;
    }
    boardContext.drawImage(imgs[i], x, 400, 70, 70);
  }
}


function draw(X, Y, x, y) {
  boardContext.beginPath();
  boardContext.moveTo(X, Y);
  boardContext.lineTo(x, y);
  boardContext.strokeStyle = "white";
  boardContext.stroke();
}


function drawSun() {
  boardContext.beginPath();
  boardContext.arc(sunX, 75, 20, 3.15, 2 * Math.PI);
  boardContext.closePath();
  boardContext.fillStyle = "yellow";
  boardContext.fill();
}


function rollDice() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  if (diceNum === 1) {
    diceResults.innerHTML = "You get an acorn!";
    currentHiker.resources[0].acorns++;
    stats.innerHTML = "";
    updateResourcesOnScreen();
  } else if (diceNum === 2) {
    diceResults.innerHTML = "You get a stone!";
    currentHiker.resources[1].stones++;
    stats.innerHTML = "";
    updateResourcesOnScreen();
  } else if (diceNum === 3) {
    diceResults.innerHTML = "You get a leaf!";
    currentHiker.resources[2].leaves++;
    stats.innerHTML = "";
    updateResourcesOnScreen();
  } else if (diceNum === 4) {
    diceResults.innerHTML = "You get a photo!";
    currentHiker.photos++;
    needsPhotoUpdate = true;
    clearBoard();
    updateResourcesOnScreen();
  } else if (diceNum === 5) {
    diceResults.innerHTML = "You get a badge card!";
    getBadgeCard();
  } else {
    diceResults.innerHTML = "You encountered a bear!";
    let bearResults = document.createElement("p");
    if (Math.round(Math.random() + 1) === 1) {
      console.log("You barely escaped with your life!");
      if (currentHiker.resources[0].acorns > 0) {
        currentHiker.resources[0].acorns--;
        bearResults.innerHTML =
          "You barely escaped with your life! You lost an acorn in the process.";
        diceResults.appendChild(bearResults);
        stats.innerHTML = "";
        updateResourcesOnScreen();
      } else if (currentHiker.resources[2].leaves > 0) {
        currentHiker.resources[2].leaves--;
        bearResults.innerHTML =
          "You barely escaped with your life! You lost a leaf in the process.";
        diceResults.appendChild(bearResults);
        stats.innerHTML = "";
        updateResourcesOnScreen();
      } else if (currentHiker.resources[1].stones > 0) {
        currentHiker.resources[1].stones--;
        bearResults.innerHTML =
          "You barely escaped with your life! You lost a stone in the process.";
        diceResults.appendChild(bearResults);
        stats.innerHTML = "";
        updateResourcesOnScreen();
      } else {
        diceResults.appendChild(bearResults);
        bearResults.innerHTML =
          "Game over, you had no resources to distract the angry bear.";
        endGame();
      }
    } else {
      diceResults.appendChild(bearResults);
      bearResults.innerHTML =
        "It was a friendly bear, you even got a photo out of it!";
      currentHiker.photos++;
      needsPhotoUpdate = true;
      clearBoard();
      updateResourcesOnScreen();
    }
  }
}


function drawHiker(hiker) {
  boardContext.fillStyle = hiker.color;
  boardContext.strokeStyle = "black";
  boardContext.fillRect(hiker.x, hiker.y, 20, 20);
  boardContext.strokeRect(hiker.x, hiker.y, 20, 20);
}


function drawBackgroundImgs() {
  // if (gameOver === false && needsPhotoUpdate === true) {
  //   updatePhotoCaptionAndPoints();
  // } else {
  //   boardContext.drawImage(
  //     backgroundImgs[currentHiker.photos],
  //     0,
  //     0,
  //     width,
  //     height
  //   );
  //   updateInfo.innerText = backgroundUrls[currentHiker.photos].description;
  // }

      boardContext.drawImage(
      backgroundImgs[currentHiker.photos],
      0,
      0,
      width,
      height
    );
    updateInfo.innerText = backgroundUrls[currentHiker.photos].description;
    if (gameOver === false && needsPhotoUpdate === true) {
    updatePhotoCaptionAndPoints();
  } 

}


function updatePhotoCaptionAndPoints() {
  console.log('update photo func is running')
  currentHiker.photoCollection.push(backgroundImgs[currentHiker.photos]);
  boardContext.drawImage(
    backgroundImgs[currentHiker.photos],
    0,
    0,
    width,
    height
  );
    updateInfo.innerText =
      backgroundUrls[currentHiker.photos].description +
      "\n" +
      backgroundUrls[currentHiker.photos].playerTurn;
    currentHiker.victoryPoints +=3
    backgroundUrls.splice(backgroundImgs[currentHiker.photos], 1);
    backgroundImgs.splice(backgroundImgs[currentHiker.photos], 1);
    needsPhotoUpdate = false;
    updateResourcesOnScreen()
}


function moveHiker(event) {
  let keyPressed = event.key;

  if (currentHiker.canteenActivated === true) {
    console.log("canteen activated");
    if (keyPressed === "ArrowLeft") {
      dx = -280;
      currentHiker.x += dx;
      clearBoard();
      drawHiker(currentHiker);
    }
    if (keyPressed === "ArrowRight") {
      dx = 280;
      currentHiker.x += dx;
      clearBoard();
      drawHiker(currentHiker);
    }

    if (currentHiker.x === 620) {
      currentHiker.photos++;
      needsPhotoUpdate = true;
      clearBoard()
      updateResourcesOnScreen()
    }
    if (currentHiker.x === 620 || currentHiker.x === 60) {
      moveSun();
      getBadgeCard();
    }
    gainResources();
    stats.innerHTML = "";
    stats.style.display = "block";
    updateResourcesOnScreen();
    if (currentHiker.isComputer === true) {
      compTurnFinished = true;
    }
    currentHiker.canteenActivated = false;
    return;
  }
  if (keyPressed === "ArrowLeft") {
    dx = -140;
    currentHiker.x += dx;
    clearBoard();
    drawHiker(currentHiker);
  }
  if (keyPressed === "ArrowRight") {
    dx = 140;
    currentHiker.x += dx;
    clearBoard();
    drawHiker(currentHiker);
  }

  if (currentHiker.x === 620) {
    currentHiker.photos++;
    needsPhotoUpdate = true;
    clearBoard()
    updateResourcesOnScreen()
  }
  if (currentHiker.x === 620 || currentHiker.x === 60) {
    moveSun();
    getBadgeCard();
  }
  gainResources();
  stats.innerHTML = "";
  stats.style.display = "block";
  updateResourcesOnScreen();
  if (currentHiker.isComputer === true) {
    compTurnFinished = true;
  }
}


function updateResourcesOnScreen() {
  let acorns = currentHiker.resources[0].acorns;
  let stones = currentHiker.resources[1].stones;
  let leaves = currentHiker.resources[2].leaves;
  currentResources.innerHTML = `Player ${currentHiker.player} stats: \n
        Acorns: ${acorns},
        Stones: ${stones},
        Leaves: ${leaves},
        Points: ${currentHiker.victoryPoints}`;
  stats.appendChild(currentResources);
}


function moveSun() {
  if (sunPosition <= 4) {
    sunPosition++;
    sunX += 140;
    clearBoard();
  }

  if (sunPosition >= 5) {
    sunPosition++;
    sunX -= 140;
    clearBoard();
  }
  if (sunPosition > 9) {
    endGame();
  }
}


function whoseTurn() {
  stats.style.display = "none";
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
    currentHiker.resources[1].stones++;
  } else if (currentHiker.x == 200) {
    currentHiker.resources[2].leaves++;
  } else if (currentHiker.x == 340) {
    currentHiker.resources[0].acorns++;
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
    let pickedCard = badgeDeck[Math.floor(Math.random() * badgeDeck.length)];
    currentHiker.badgesInHand.push(pickedCard);
    let pickedCardIndex = badgeDeck.indexOf(pickedCard);
    badgeDeck.splice(pickedCardIndex, 1);
  }
}


function updateBadges() {
  if (currentHiker.badgesInHand.length > 0) {
    for (let i = 0; i < currentHiker.badgesInHand.length; i++) {
      let badgeInHand = document.createElement("div");
      badgeInHand.style.border = "red";
      let name = currentHiker.badgesInHand[i].name;
      let rewardPoints = currentHiker.badgesInHand[i].rewardPoints;
      let cost = currentHiker.badgesInHand[i].cost;
      let costType = currentHiker.badgesInHand[i].costType;
      let badgeType = currentHiker.badgesInHand[i].badgeType;

      badgeInHand.innerHTML = "";

      badgeInHand.innerHTML = `Name: ${name}, \n
            Cost: ${cost}, \n
            Reward Points: ${rewardPoints}, \n
            Cost Type: ${costType}, \n
            Badge Type: ${badgeType}`;
      badgeInHand.style.backgroundColor = "antiquewhite";
      badgeInHand.style.borderRadius = "15px";
      badgeInHand.style.padding = "5px";
      badgeInHand.style.margin = "5px";
      badgeInHandList.appendChild(badgeInHand);
    }
    badgesInHandBox.style.display = "block";
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

      badgeEarned.innerHTML = "";

      badgeEarned.innerHTML = `Name: ${name}, \n
            Cost: ${cost}, \n
            Reward Points: ${rewardPoints}, \n
            Cost Type: ${costType}, \n
            Badge Type: ${badgeType}`;
      badgeEarned.style.backgroundColor = "antiquewhite";
      badgeEarned.style.borderRadius = "15px";
      badgeEarned.style.padding = "5px";
      badgeEarned.style.margin = "5px";
      badgesEarnedList.appendChild(badgeEarned);
    }
    badgesEarnedBox.style.display = "block";
    badgesEarnedList.style.display = "block";
  }
}


function payForBadge() {
  for (let i = 0; i < currentHiker.badgesInHand.length; i++) {
    let type = currentHiker.badgesInHand[i].costType;
    if (type === "acorns") {
      if (
        currentHiker.resources[0].acorns >= currentHiker.badgesInHand[i].cost
      ) {
        currentHiker.badgesEarned.push(currentHiker.badgesInHand[i]);
        currentHiker.resources[0].acorns -= currentHiker.badgesInHand[i].cost;
        currentHiker.victoryPoints += currentHiker.badgesInHand[i].rewardPoints;

        currentHiker.badgesInHand.splice(i, 1);
        purchaseResults.style.display = "block";
        purchaseResults.innerHTML = "you earned your badge!";
        badgeBox.appendChild(purchaseResults);

      } else {
        purchaseResults.style.display = "block";
        purchaseResults.innerHTML =
          "Sorry, you need more acorns to earn this badge.";
        badgeBox.appendChild(purchaseResults);
      }
    } else if (type === "stones") {
      if (
        currentHiker.resources[1].stones >= currentHiker.badgesInHand[i].cost
      ) {
        currentHiker.badgesEarned.push(currentHiker.badgesInHand[i]);
        currentHiker.resources[1].stones -= currentHiker.badgesInHand[i].cost;
        currentHiker.victoryPoints += currentHiker.badgesInHand[i].rewardPoints;

        currentHiker.badgesInHand.splice(i, 1);
        purchaseResults.style.display = "block";
        purchaseResults.innerHTML = "you earned your badge!";
        badgeBox.appendChild(purchaseResults);
      } else {
        purchaseResults.style.display = "block";
        purchaseResults.innerHTML =
          "Sorry, you need more stones to earn this badge.";
        badgeBox.appendChild(purchaseResults);
      }
    } else if (type === "leaves") {
      if (
        currentHiker.resources[2].leaves >= currentHiker.badgesInHand[i].cost
      ) {
        currentHiker.badgesEarned.push(currentHiker.badgesInHand[i]);
        currentHiker.resources[2].leaves -= currentHiker.badgesInHand[i].cost;
        currentHiker.victoryPoints += currentHiker.badgesInHand[i].rewardPoints;

        currentHiker.badgesInHand.splice(i, 1);

        purchaseResults.style.display = "block";
        purchaseResults.innerHTML = "you earned your badge!";
        badgeBox.appendChild(purchaseResults);
      } else {
        purchaseResults.style.display = "block";
        purchaseResults.innerHTML =
          "Sorry, you need more leaves to earn this badge.";
        badgeBox.appendChild(purchaseResults);
      }
    } else
      console.log(
        "why is this happening, i got rid of all the multiple-type cards"
      );
  }

}


function whoWon() {
  if (hiker1.victoryPoints > hiker2.victoryPoints) {
    console.log(hiker1);
    return hiker1;
  } else if (hiker2.victoryPoints > hiker1.victoryPoints) {
    console.log(hiker2);
    return hiker2;
  }
}


function runGame() {
  //creating 5 sections on board with line drawings
  for (let i = 0; i < width; i += width / 5) {
    draw(i, 75, i, width);
  }
  drawHiker(hiker1);
  drawHiker(hiker2);
  drawSun();
  loadImgs();
}


function endGame() {
  //trigger end game

  gameOver = true;
  whoWon();
  document.body.style.backgroundColor = "#F96F5D";
  stats.innerHTML = "";
  win.style.display = 'block'
  if (whoWon() === hiker1) {
    //updateInfo.innerText = ''
    //updateInfo.innerText = `Player 1 wins with ${hiker1.victoryPoints} points! Player 2 loses with ${hiker2.victoryPoints} points. I hope ya'll enjoyed the trails!`;
    win.innerHTML = `Player 1 wins with ${hiker1.victoryPoints} points! Player 2 loses with ${hiker2.victoryPoints} points. I hope ya'll enjoyed the trails!`
    updatesBox.appendChild(win)
    //gameOver = true;
  } else if (whoWon() === hiker2) {
    //updateInfo.innerText = ''
    //updateInfo.innerText = `Player 2 wins with ${hiker2.victoryPoints} points! Player 1 loses with ${hiker1.victoryPoints} points. I hope ya'll enjoyed the trails!`;
    win.innerHTML = `Player 2 wins with ${hiker2.victoryPoints} points! Player 1 loses with ${hiker1.victoryPoints} points. I hope ya'll enjoyed the trails!`
    updatesBox.appendChild(win)
    //gameOver = true;
  } else {
    //updateInfo.innerText = ''
    win.innerHTML = `It's a tie! Player 1 has ${hiker1.victoryPoints} points and player 2 has ${hiker2.victoryPoints} points.`;
    updatesBox.appendChild(win)
    //gameOver = true
  }
}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////Event Listeners/////////////////
///////////////////////////////////////////////


startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  runGame();
  startBtn.style.display = "none";
});


rollBtn.addEventListener("click", function (event) {
  event.preventDefault();
  rollDice();
});


canteenBtn.addEventListener("click", function (event) {
  event.preventDefault();
  currentHiker.canteenActivated = true;
});


document.addEventListener("keydown", function (event) {
  event.preventDefault();
  moveHiker(event);
});


earnBadgeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  payForBadge();
  badgeInHandList.innerHTML = "";
  badgesEarnedList.innerHTML = "";
  updateBadges();
  currentResources.innerHTML = "";
  updateResourcesOnScreen();
});


badgeListBtn.addEventListener("click", function (event) {
  event.preventDefault();
  updateBadges();
  badgeListBtn.style.display = "none";
});


restartBtn.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});


finishTurnBtn.addEventListener("click", function (event) {
  event.preventDefault();
  whoseTurn();
  diceResults.innerHTML = "";
  badgeInHandList.innerHTML = "";
  badgesEarnedList.innerHTML = "";
  stats.innerHTML = "";
  badgeListBtn.style.display = "block";
  badgesInHandBox.style.display = "none";
  badgesEarnedBox.style.display = "none";
  purchaseResults.style.display = "none";
});
