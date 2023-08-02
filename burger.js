const player = "p"
const meat = "m"
const cheese = "c"
const tomato = "t"
const lettuce = "l"

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
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
................
................
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
................`]
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
  [tomato, bitmap`
................
................
................
................
................
................
................
....3333333333..
...332322232333.
...333232323233.
....3333333333..
................
................
................
................
................`],
  [lettuce, bitmap`
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
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
...
...
.p.`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  
})
