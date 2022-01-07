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

const checkForExplosion = (array) => {
  let bracketCount = 0
  let leftValueIndex
  let explodedItems = []

  for (let i = 0; i < array.length; i++) {
    switch (array[i]){
      case '[':
        bracketCount++
        break
      case ']':
        bracketCount--
        break
      case ',':
        break
      default:
        array[i] = +array[i]

        if (explodedItems.length > 0) {
          array[i] += +explodedItems[3]
          return true
        } 
        else
          leftValueIndex = i
    }

    if (bracketCount == 5 && explodedItems.length == 0) {
      explodedItems = explode(array, i)

      if (leftValueIndex)
        array[leftValueIndex] += +explodedItems[1]
    }
  }

  if (explodedItems.length > 0) return true
  else return false
}

const explode = (array, index) => {
  const explodedItems = array.splice(index, 5) // remove number to be exploded
  array.splice(index, 0, 0) // insert 0 in its place

  return explodedItems
}

const checkForSplitting = (array) => {
  for (let i = 0; i < array.length; i++) {
    switch (array[i]){
      case '[':
      case ']':
      case ',':
        break
      default:
        array[i] = +array[i]

          if (array[i] > 9) {
            const splittedNumber = ['[', Math.floor(array[i] / 2), ',', Math.ceil(array[i] / 2), ']']
            array.splice(i, 1, ...splittedNumber)
            return true
          }
    }
  }

  return false
}

const reduceNumber = (array) => {
  let splitting = false

  const explosion = checkForExplosion(array)

  if (!explosion)
    splitting = checkForSplitting(array)

  return explosion || splitting
}

const calculateMagnitude = (array) => {
  return eval(array.join('').replaceAll("[", "(3*").replaceAll(",", " + 2*").replaceAll("]", ")"))
}

const partOne = () => {
  const input = [...originalInput]

  let expression = []

  expression = expression.concat(input.shift().split(''))
  reduceNumber(expression)

  input.forEach(line => {
    expression = add(expression, line)

    do {
      if (!reduceNumber(expression)) break
    } while (true)
  })

  const result = calculateMagnitude(expression)

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()