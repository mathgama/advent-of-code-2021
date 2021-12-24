import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day11/input.txt')

const flash = (input, index) => {
  // flash adjacent cells, including diagonals
  if(index-11 >= 0 && index%10 >= 1) input[index-11]++
  if(index-10 >= 0) input[index-10]++
  if(index-9 >= 0 && index%10 <= 8) input[index-9]++
  if(index-1 >= 0 && index%10 >= 1) input[index-1]++
  if(index+1 < input.length && index%10 <= 8) input[index+1]++
  if(index+9 < input.length && index%10 >= 1) input[index+9]++
  if(index+10 < input.length) input[index+10]++
  if(index+11 < input.length && index%10 <= 8) input[index+11]++
}

const partOne = () => {
  let input = []
  originalInput.forEach(line => input.push(...line.split('')))

  let result = 0

  for (let step = 0; step < 100; step++) {
    const flashed = new Set()

    input = input.map(element => {
      const energy = parseInt(element)
      return energy + 1
    })

    while (input.filter(energy => energy > 9).length > 0) {
      input.forEach((energy, index) => {
        if (energy <= 9) return

        input[index] = 0

        if (!flashed.has(index)) {
          flashed.add(index)
          flash(input, index)
        }
      })
    }

    flashed.forEach(index => {
      input[index] = 0
      result++
    })
  }

  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {
  let input = []
  originalInput.forEach(line => input.push(...line.split('')))

  let step = 0
  let flashed = new Set()

  while (flashed.size != input.length) {
    flashed = new Set()
    step++

    input = input.map(element => {
      const energy = parseInt(element)
      return energy + 1
    })

    while (input.filter(energy => energy > 9).length > 0) {
      input.forEach((energy, index) => {
        if (energy <= 9) return

        input[index] = 0

        if (!flashed.has(index)) {
          flashed.add(index)
          flash(input, index)
        }
      })
    }

    flashed.forEach(index => {
      input[index] = 0
    })
  }

  console.log('-- Part two --')
  console.log('Result:', step)
}

partOne()
partTwo()