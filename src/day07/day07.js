import { readInputString } from '../utils.js'

const input = readInputString('./src/day07/input.txt')

const calculateMedian = arr => {
  const mid = Math.floor(arr.length / 2)  
  const sortedArr = [...arr].sort((a, b) => a - b)

  return arr.length % 2 !== 0 
    ? sortedArr[mid] 
    : (sortedArr[mid - 1] + sortedArr[mid]) / 2
}

const calculateMean = arr => {
  return arr.reduce((a, b) => a + b) / arr.length
}

const nthTriangular = number => {
  return (Math.pow(number, 2) + number) / 2
}

const partOne = () => {
  const crabs = input[0].split(',').map(number => parseInt(number))

  let result = 0
  const median = calculateMedian(crabs)

  crabs.forEach(crab => result += Math.abs(crab - median))

  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {
  const crabs = input[0].split(',').map(number => parseInt(number))

  let result = 0
  const mean = Math.floor(calculateMean(crabs))

  crabs.forEach(crab => result += nthTriangular(Math.abs(crab - mean)))

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()