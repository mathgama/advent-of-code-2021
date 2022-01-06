import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day18/input.txt')

const add = (array, number) => {
  let result = []

  result.push('[')
  result = result.concat([...array])
  result.push(',')
  result = result.concat(number.split(''))
  result.push(']')

  return result
}

const partOne = () => {
  const input = [...originalInput]

  let result = []

  result = result.concat(input.shift().split(''))

  input.forEach(line => {
    result = add(result, line)

    
  })

  console.log(result)
}

partOne()