import { readInputString } from '../utils.js'

const input = readInputString('./src/day05/input.txt')

const initializeGrid = (size) => {
  let grid = new Array(size).fill(0)

  for (let i = 0; i < grid.length; i++)
    grid[i] = new Array(size).fill(0)

  return grid
}

const parseInput = (line) => {
  let [from, to] = line.split(' -> ')
    
  from = from.split(',').map(numberString => parseInt(numberString))
  to = to.split(',').map(numberString => parseInt(numberString))

  return [from, to]
}

const calculateResult = (grid) => {
  let result = 0

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++)
      if (grid[i][j] > 1) result++

  return result
}

const partOne = () => {  
  let grid = initializeGrid(999)

  input.forEach(line => {
    let [from, to] = parseInput(line)
    
    if (from[0] != to[0] && from[1] != to[1]) return 
    else if ((to[0] < from[0]) || (to[1] < from[1])) [from, to] = [to, from]

    for (let i = from[1]; i <= to[1]; i++)
      for (let j = from[0]; j <= to[0]; j++)
        grid[i][j]++
  })

  const result = calculateResult(grid)

  console.log('-- Part one --')
  console.log('Result:', result)
}

const positiveIncrement = (index) => index + 1
const negativeIncrement = (index) => index - 1
const noIncrement = (index) => index

const partTwo = () => {
  let grid = initializeGrid(999)

  input.forEach(line => {
    let [from, to] = parseInput(line)
    let rowIncrement, colIncrement
    
    if (from[0] != to[0] && from[1] != to[1]) {
      if (to[0] < from[0] && to[1] < from[1]) { // reverse diagonal positive alpha
        [from, to] = [to, from]
        rowIncrement = positiveIncrement
        colIncrement = positiveIncrement
      }
      else if (to[0] < from[0] && to[1] > from[1]) { // reverse diagonal negative alpha
        [from, to] = [to, from]
        rowIncrement = negativeIncrement
        colIncrement = positiveIncrement
      }
      else if (from[0] < to[0] && from[1] < to[1]) { // diagonal positive alpha
        rowIncrement = positiveIncrement
        colIncrement = positiveIncrement
      }
      else if (from[0] < to[0] && from[1] > to[1]) { // diagonal negative alpha
        rowIncrement = negativeIncrement
        colIncrement = positiveIncrement
      }
    }
    else {
      if (to[0] < from[0]) { //reverse horizontal
        [from, to] = [to, from]
        rowIncrement = noIncrement
        colIncrement = positiveIncrement
      }
      else if (to[1] < from[1]) { //reverse vertical
        [from, to] = [to, from]
        rowIncrement = positiveIncrement
        colIncrement = noIncrement
      }
      else if (from[0] < to[0]) { // horizontal
        rowIncrement = noIncrement
        colIncrement = positiveIncrement
      }
      else if (from[1] < to[1]) { // vertical
        rowIncrement = positiveIncrement
        colIncrement = noIncrement
      }
    }

    let i = from[1]
    let j = from[0]

    while (true) {
      grid[i][j]++

      if (i == to[1] && j == to[0]) return

      i = rowIncrement(i)
      j = colIncrement(j)
    }
  })

  const result = calculateResult(grid)

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()