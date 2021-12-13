import { readInputString } from '../utils.js'

const input = readInputString('./src/day06/input.txt')

const partOne = () => {  
  let fishes = input[0].split(',').map(number => parseInt(number))

  for (let i = 1; i <= 80; i++) {
    let startingLength = fishes.length
    for (let j = 0; j < startingLength; j++) {
      if (fishes[j] == 0) {
        fishes[j] = 6
        fishes.push(8)
      }
      else fishes[j]--
    }
  }

  const result = fishes.length

  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {  
  const fishes = input[0].split(',').map(number => parseInt(number))
  const timers = new Array(10).fill(0)

  fishes.forEach(fish => timers[fish]++)

  for (let i = 1; i <= 256; i++) {
    for (let j = 0; j < timers.length; j++) {
      if (j == 0) {
        timers[9] = timers[0] // new fish
        timers[7] += timers[0] // reset current fish
      }
      
      timers[j] = timers[j + 1]
    }
  }

  timers[9] = 0
  const result = timers.reduce((accum, curr) => accum += curr)

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()