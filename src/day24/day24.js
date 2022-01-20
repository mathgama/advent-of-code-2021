import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day24/input.txt')

const partOne = () => {
  input = [...originalInput]

  let w = 0, x = 0, y = 0, z = 0
  let varX, varY, varZ

  for (let i = 0; i < 14; i++) {
    const block = i * 18
    w = +input[0+block].split(' ')[1]
    varX = +input[5+block].split(' ')[2]
    varY = +input[15+block].split(' ')[2]
    varZ = +input[4+block].split(' ')[2]
    
    x = z % 26 + varX

    z = Math.trunc(z / varZ)

    if (x != w) {
      z *= 26
      z += w + varY
    }
  }

  console.log('-- Part one --')
  console.log('Result:', z)
}

partOne()