const player = "p"
const meat = "m"
const cheese = "c"
const tomato = "t"
const lettuce = "l"
const topBun = "b"
const burger1 = "1"

const meat2 = "e"
const cheese2 = "h"
const tomato2 = "o"
const lettuce2 = "u"
const topBun2 = "n"

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
................` ],
  [ meat, bitmap`
................
................
................
................
................
................
...C0CC0CC03C...
..C0CC0CC0CC0C..
..0CC0C30CC0CC..
...C0CC0C30CC...
................
................
................
................
................
................`],
  [ cheese, bitmap`
................
................
................
................
................
.........66.....
.......666666...
.....666666666..
...666666666666.
..66666666666...
....6666666.....
......666.......
................
................
................
................`],
  [ tomato, bitmap`
................
................
................
................
................
................
................
....3333333333..
...339399939333.
...333939393933.
....3333333333..
................
................
................
................
................`],
  [ lettuce, bitmap`
................
................
................
................
.......DF..DD...
...DF.DDDDDD....
..DDDD44D4DDDF..
....FD4D4DD4DF..
..DDDDDDD4DDDD..
...FDD.DDDDD....
.......D..FF....
................
................
................
................
................`],
  [ topBun, bitmap`
................
....CC2C2CCC....
...C2CC2CCC2C...
..CCC2CC2C2C2C..
..CCCCCCCCCCCC..
................
................
................
................
................
................
................
................
................
................
................`],
  [ burger1, bitmap`
5555555555555555
5....C2CC2C....5
5..CC2C2CC2CC..5
5.CCCCCCCCCCCC.5
5..............5
5.666666666666.5
5...66666666...5
5......66......5
5..............5
5..C00CC00CC0..5
5.C00CC00CC00C.5
5..0CC00CC00C..5
5..............5
5.CCCCCCCCCCCC.5
5...CCCCCCCC...5
5555555555555555`],

  [ meat2, bitmap`
................
................
................
................
................
................
...C0CC0CC03C...
..C0CC0CC0CC0C..
..0CC0C30CC0CC..
...C0CC0C30CC...
................
................
................
................
................
................`],
  [ cheese2, bitmap`
................
................
................
................
................
.........66.....
.......666666...
.....666666666..
...666666666666.
..66666666666...
....6666666.....
......666.......
................
................
................
................`],
  [ tomato2, bitmap`
................
................
................
................
................
................
................
....3333333333..
...339399939333.
...333939393933.
....3333333333..
................
................
................
................
................`],
  [ lettuce2, bitmap`
................
................
................
................
.......DF..DD...
...DF.DDDDDD....
..DDDD44D4DDDF..
....FD4D4DD4DF..
..DDDDDDD4DDDD..
...FDD.DDDDD....
.......D..FF....
................
................
................
................
................`],
  [ topBun2, bitmap`
................
....CC2C2CCC....
...C2CC2CCC2C...
..CCC2CC2C2C2C..
..CCCCCCCCCCCC..
................
................
................
................
................
................
................
................
................
................
................`],
)

const foodMap = {
  m: 'e',
  c: 'h',
  t: 'o',
  l: 'u',
  b: 'n'
}

setSolids([player])

let level = 0
const levels = [
  map`
1....
.....
.....
.....
..p..`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

const level1burger = ['m', 'c', 'b'];
const burgerLevels = [level1burger];
let collectedFood1 = [];
let collectedFood2 = [];

onInput("a", () => {
  getFirst(player).x -= 1
  
  foodTypes2.forEach(type => {
    getAll(type).forEach(food => {
      food.x -= 1
    })
  })
})

onInput("d", () => {
  getFirst(player).x += 1

  foodTypes2.forEach(type => {
    getAll(type).forEach(food => {
      food.x += 1
    })
  })
})

const foodTypes = [meat, cheese, tomato, lettuce, topBun];
const foodTypes2 = [meat2, cheese2, tomato2, lettuce2, topBun2];

function randFood() {
  let num = Math.floor(Math.random() * 5);
  return foodTypes[num];
}

let foods = [];

function addFood() {
  let x = Math.floor(Math.random() * 5);
  let y
  if (x == 0)
    y = 1;
  else
    y = 0;
  let newFood = addSprite(x, y, randFood());
  foods.push(newFood);
}

function fallingFood() {
  foodTypes.forEach(type => {
    getAll(type).forEach(food => {
      setTimeout(() => {
        food.y += 1;
      }, 1000)
    }) 
  })
}

function removeFood() {
  foodTypes.forEach(type => {
    getAll(type).forEach(food => {
      if (food.y == 4 && !(food.x === getFirst(player).x)) {
        let x = food.x;
        let y = food.y;
        food.remove();
      }
    })
  })
}

let mapping;
let collectedFoodImage;

function stackingFood() {
  foodTypes.forEach(type => {
    getAll(type).forEach(food => {
      if (food.x === getFirst(player).x && food.y === getFirst(player).y) {
        mapping = foodMap[food.type];
        collectedFoodImage = addSprite(food.x, food.y, mapping);
        console.log(food.y)
        console.log(collectedFoodImage);
        collectedFood1.push(collectedFoodImage);
        collectedFood2.push(food.type);
        food.remove();
        //console.log(collectedFood1)
        
      }
    })
  })
}

let win = false;
function checkWin() {
  if (burgerLevels[level].length !== collectedFood1.length) {
    win = false;
  }
  // not working yet
  for (let i = 0; i < burgerLevels[level].length && collectedFood2.length; i++) {
    if (burgerLevels[level][i] === collectedFood2[i]) {
      win = true;
    }
    else {
      win = false;
      break;
    }
  }
  if (win) {
    addText("You Win", {
              x: 10,
              y: 0,
              color: color`black`
            });
  }
  else {
      addText("You Lose", {
              x: 10,
              y: 0,
              color: color`black`
            });
  }
  clearInterval(runGame);
}

var runGame = setInterval(() => {
  addFood();
  fallingFood();
  removeFood();
  stackingFood();
  // this works
  if (collectedFood2.includes(topBun)) {
    console.log("Finished")
    checkWin();
  }
}, 1000);
