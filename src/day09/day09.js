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

partOne()