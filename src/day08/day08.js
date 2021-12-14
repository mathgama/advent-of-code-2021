import { readInputString } from '../utils.js'

const input = readInputString('./src/day08/input.txt')

const partOne = () => {
  let result = 0

  input.forEach(line => {
    let [patterns, output] = line.split('|')

    output = output.split(' ').filter(value => value.length > 0)

    output.map(value => {
      switch (value.length) {
        case 2:
        case 3:
        case 4:
        case 7:
          result++
          break
      }
    })
  })

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()