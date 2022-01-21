import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day25/input.txt')

const processInput = () => {
  const result = []
  originalInput.forEach(line => {
    result.push([...line.split('')])
  })
  return result
}

const getMoveCoord = (i, j, direction, state) => {
  let chkI = i
  let chkJ = j

  direction == 0 ? chkJ++ : chkI++

  const horizontalLength = state[0].length
  const verticalLength = state.length

  if (chkI > verticalLength - 1) chkI = 0
  if (chkJ > horizontalLength - 1) chkJ = 0

  return [chkI, chkJ]
}

const deepCopy = (array) => {
  return JSON.parse(JSON.stringify(array))
}

const printArray = (array) => {
  array.forEach(line => console.log(line.join('')))
}

const partOne = () => {
  let state = processInput()
  let newState 

  let step
  let stopLoop = false

  for (step = 1; !stopLoop; step++) {
    stopLoop = true

    for (let direction = 0; direction < 2; direction++) {
      newState = deepCopy(state)
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (state[i][j] == '.') continue
          if (state[i][j] == '>' && direction != 0) continue
          if (state[i][j] == 'v' && direction != 1) continue

          const [chkI, chkJ] = getMoveCoord(i, j, direction, state)

          if (state[chkI][chkJ] == '.') {
            newState[i][j] = '.'
            newState[chkI][chkJ] = state[i][j]
            stopLoop = false
          }
        }
      }
      state = deepCopy(newState)
    }
  }
  
  console.log()
  console.log('-- Part one --')
  console.log('Result:', step - 1)
}

partOne()