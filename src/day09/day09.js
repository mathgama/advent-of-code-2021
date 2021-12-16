import { readInputString } from '../utils.js'

const input = readInputString('./src/day09/input.txt')

const partOne = () => {
  let result = 0

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const left = j-1 >= 0 ? +input[i][j-1] : 10
      const down = i+1 < +input.length ? input[i+1][j] : 10
      const right = j+1 < +input[i].length ? input[i][j+1] : 10
      const up = i-1 >= 0 ? +input[i-1][j] : 10

      const value = +input[i][j]

      if (value < left && 
          value < down && 
          value < right && 
          value < up)
        result += value + 1
    }
  }

  console.log('-- Part one --')
  console.log('Result:', result)
}

const mapBasin = (input, i, j, mappedCoords) => {
  if (!input[i]) return 0
  if (!input[i][j]) return 0
  if (input[i][j] == '9') return 0
  if (mappedCoords.has("" + i + j)) return 0

  mappedCoords.add("" + i + j)

  return 1
    + mapBasin(input, i, j+1, mappedCoords)
    + mapBasin(input, i+1, j, mappedCoords)
    + mapBasin(input, i, j-1, mappedCoords)
    + mapBasin(input, i-1, j, mappedCoords)
}

const partTwo = () => {
  let result = 0

  const mappedCoords = new Set()
  const basinSizes = []

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let size = 0
      
      if (!mappedCoords.has("" + i + j))
        size = mapBasin(input, i, j, mappedCoords)

      if (size > 0)
        basinSizes.push(size)
    }
  }

  basinSizes.sort((a, b) => b - a)
  console.log(basinSizes)

  result = basinSizes[0] * basinSizes[1] * basinSizes[2]

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()