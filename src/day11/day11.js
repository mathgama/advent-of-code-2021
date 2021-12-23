import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day11/input.txt')

const logInput = (input, step) => {
  console.clear()
  console.log('Step', step + 1)
  let line = ''
  input.forEach((energy, index) => {
    if (index % 10 == 0) {
      console.log(line)
      line = ''
    }
    line += energy + ' '
  })
}

const logFlash = (input, flash) => {
  console.log()
  console.log('Flash', flash)
  let line = ''
  input.forEach((energy, index) => {
    if (index % 10 == 0) {
      console.log(line)
      line = ''
    }
    line += energy + ' '
  })
}

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
  //const input = [].concat(...originalInput.split(''))

  let result = 0

  //logInput(input, -1)

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
          //logInput(input, step)
          flashed.add(index)
          flash(input, index)
          //logFlash(input, index)
        }
      })

      //logInput(input, step)
    }

    flashed.forEach(index => {
      input[index] = 0
      result++
    })

    //logInput(input, step)
  }

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()