import { readInputString } from '../utils.js'

const input = readInputString('./src/day02/input.txt')

let horizontalPosition
let depth
let aim

// Part 1
horizontalPosition = 0
depth = 0

input.forEach(line => {
  const [movement, value] = line.split(' ')

  switch (movement) {
    case 'forward':
      horizontalPosition += +value
      break
    case 'up':
      depth -= +value
      break
    case 'down':
      depth += +value
      break
  }
})

console.log('-- Part one --')
console.log('Horizontal Position:', horizontalPosition)
console.log('Depth:', depth)
console.log('Result:', horizontalPosition * depth)

// Part 2
horizontalPosition = 0
depth = 0
aim = 0

input.forEach(line => {
  const [movement, value] = line.split(' ')

  switch (movement) {
    case 'forward':
      horizontalPosition += +value
      depth += aim * value
      break
    case 'up':
      aim -= +value
      break
    case 'down':
      aim += +value
      break
  }
})

console.log('-- Part two --')
console.log('Horizontal Position:', horizontalPosition)
console.log('Depth:', depth)
console.log('Result:', horizontalPosition * depth)