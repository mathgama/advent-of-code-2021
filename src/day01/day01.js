import { readInputNumeric } from '../utils.js'

const input = readInputNumeric('./src/day01/input.txt')

let counter = 0

// Part 1
for (let i = 0; i < input.length - 1; i++) {
  if(input[i] < input[i + 1])
    counter++
}

console.log('-- Part one --')
console.log('Counter:', counter)

// Part 2
counter = 0

const sumWindow = (array, index) => array[index] + array[index + 1] + array[index + 2]

for (let i = 0; i < input.length - 3; i++) {
  const current_window = sumWindow(input, i)
  const next_window = sumWindow(input, i + 1)

  if (next_window > current_window) counter++
}

console.log('-- Part two --')
console.log('Counter:', counter)