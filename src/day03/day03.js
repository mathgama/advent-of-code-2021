import { readInputString } from '../utils.js'

const input = readInputString('./src/day03/input.txt')

const partOne = () => {
  let gamma = ''
  let epsilon = ''

  const positiveBitCount = new Array(input[0].length).fill(0)

  input.forEach(line => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] == '1') positiveBitCount[i]++
    }
  })

  positiveBitCount.forEach(counter => {
    if (counter >= Math.ceil(input.length / 2 )) {
      gamma += '1'
      epsilon += '0'
    } else {
      gamma += '0'
      epsilon += '1'
    }
  })

  gamma = parseInt(gamma, 2)
  epsilon = parseInt(epsilon, 2)

  console.log('-- Part one --')
  console.log('Gamma:', gamma)
  console.log('Epsilon:', epsilon)
  console.log('Power consumption:', gamma * epsilon)
}

const partTwo = () => {
  let oxy = [...input]
  let co2 = [...input]

  const findBitCriteria = (array, bit) => {
    let positiveBitCount = 0

    array.forEach(line => {
      if (line[bit] == '1') positiveBitCount++
    })

    return positiveBitCount >= Math.ceil(array.length / 2)
      ? '1'
      : '0'
  }

  let bitCriteria
  let bit

  bit = 0
  while (oxy.length > 1) {
    bitCriteria = findBitCriteria(oxy, bit)
    oxy = oxy.filter(number => number[bit] == bitCriteria)
    bit++
  }

  bit = 0
  while (co2.length > 1) {
    bitCriteria = findBitCriteria(co2, bit)
    co2 = co2.filter(number => number[bit] != bitCriteria)
    bit++
  }

  const oxyRating = parseInt(oxy[0], 2)
  const co2Rating = parseInt(co2[0], 2)

  console.log('-- Part two --')
  console.log('Oxygen Generator Rating:', oxyRating)
  console.log('CO2 Scrubber Rating:', co2Rating)
  console.log('Life Support Rating:', oxyRating * co2Rating)
}

partOne()
partTwo()