import { readInputString } from '../utils.js'

const input = readInputString('./src/day06/input.txt')

const partOne = () => {  
  let fishes = input.shift().split(',').map(number => parseInt(number))

  for (let i = 1; i <= 80; i++) {
    let startingLength = fishes.length
    for (let j = 0; j < startingLength; j++) {
      if (fishes[j] == 0) {
        fishes[j] = 6
        fishes.push(8)
      }
      else fishes[j]--
    }

    //console.log('Day ' + i + ': ' + fishes)
  }

  const result = fishes.length

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()