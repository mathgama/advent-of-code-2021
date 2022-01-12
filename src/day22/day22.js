import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day22/input.txt')

const processInput = () => {
  const input = []

  originalInput.forEach(line => {
    const [operation, limits] = line.split(' ')
    const [x, y, z] = limits.split(',').map(el => el.split('=')[1]).map(el => {
      return el.split('..').map(el => +el)
    })
    input.push({
      turnOn: operation == 'on' ? true : false,
      x: x,
      y: y,
      z: z
    })
  })

  return input
}

const initializeGrid = (size) => {
  const grid = new Array(size)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(size)

    for (let j = 0; j < grid[i].length; j++) grid[i][j] = new Array(size).fill(false)
  }
  return grid
}

const isValidRange = (axis) => {
  if ((axis[0] < -50 || axis[0] > 50) && (axis[1] < -50 || axis[1] > 50))
    return false
  else {
    if (axis[0] < -50) axis[0] = -50
    if (axis[1] > 50) axis[1] = 50
    return true
  }
}

const limitRange = (step) => {
  if (!isValidRange(step.x)) return false
  if (!isValidRange(step.y)) return false
  if (!isValidRange(step.z)) return false

  return true
}

const partOne = () => {
  const rebootSteps = processInput()
  const grid = initializeGrid(101)

  rebootSteps.forEach(step => {
    if (!limitRange(step)) return

    for (let x = step.x[0]; x <= step.x[1]; x++) {
      for (let y = step.y[0]; y <= step.y[1]; y++) {
        for (let z = step.z[0]; z <= step.z[1]; z++) {
          grid[x+50][y+50][z+50] = step.turnOn
        }
      }
    }
  })

  const result = grid.flat(2).filter(el => el).length

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()