import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day20/input.txt')

const initializeGrid = (size) => {
  const grid = new Array(size + 102)
  for (let i = 0; i < grid.length; i++) grid[i] = new Array(size + 102).fill('.')
  //grid.forEach(cell => cell = new Array(size + 4).fill('.'))
  return grid
}

const processInput = (input) => {
  const algorithm = input.shift()
  input.shift()

  let grid

  input.forEach((line, index) => {
    if (!grid) grid = initializeGrid(line.length)

    for (let i = 0; i < line.length; i++) {
      grid[index+51][i+51] = line[i]
    }
  })

  return [algorithm, grid]
}

const getSurroundingCoordinates = (i, j, gridLength) => {
  const square = []

  if (i == 0 || j == 0 || i == (gridLength - 1) || j == (gridLength - 1)) return

  square.push({x: i-1, y: j-1})
  square.push({x: i-1, y: j})
  square.push({x: i-1, y: j+1})

  square.push({x: i, y: j-1})
  square.push({x: i, y: j})
  square.push({x: i, y: j+1})

  square.push({x: i+1, y: j-1})
  square.push({x: i+1, y: j})
  square.push({x: i+1, y: j+1})

  return square
}

const imageEnhancement = (algorithm, grid) => {
  const result = initializeGrid(100)

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const square = getSurroundingCoordinates(i, j, grid.length) ?? []
      
      let binary = ''

      if (square.length > 0) {
        square.forEach(coord => binary += grid[coord.x][coord.y] == '#' ? '1' : '0')
        result[i][j] = algorithm[parseInt(binary, 2)]
      } else {
        result[i][j] = grid[i][j] == '.' ? '#' : '.'
      }
    }
  }

  return result
}

const countPixels = (grid) => {
  let pixels = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      pixels += grid[i][j] == '#' ? 1 : 0
    }
  }

  return pixels
}

const partOne = () => {
  let [algorithm, grid] = processInput([...originalInput])

  for (let i = 0; i < 2; i++) {
    grid = imageEnhancement(algorithm, grid)
  }

  //for (let i = 0; i < grid.length; i++) console.log(grid[i].join(''))

  const result = countPixels(grid)

  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {
  let [algorithm, grid] = processInput([...originalInput])

  for (let i = 0; i < 50; i++) {
    grid = imageEnhancement(algorithm, grid)
  }

  const result = countPixels(grid)

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()