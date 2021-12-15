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

const diff = (string1, string2) => {
  const regex = new RegExp('[' + string2 + ']', 'gi')
  return string1.replace(regex, '').length
}

const decodePatterns = (patterns) => {
  let decode = []
  let patternNumber6

  decode[patterns[0]] = 1 // length 2
  decode[patterns[2]] = 4 // length 4
  decode[patterns[1]] = 7 // length 3
  decode[patterns[9]] = 8 // length 7
  
  for (let i = patterns.length - 1; i >= 0; i--) {
    if (patterns[i].length == 6) {
      if (diff(patterns[i], patterns[1]) == 4) {
        decode[patterns[i]] = 6
        patternNumber6 = patterns[i]
      }
      else if (diff(patterns[i], patterns[2]) == 3) 
        decode[patterns[i]] = 0
      else 
        decode[patterns[i]] = 9
    }
    else if (patterns[i].length == 5) {
      if (diff(patterns[i], patterns[0]) == 3) 
        decode[patterns[i]] = 3
      else if (diff(patterns[i], patternNumber6) == 0) 
        decode[patterns[i]] = 5
      else 
        decode[patterns[i]] = 2
    }
  }

  return decode
}

const partTwo = () => {
  let result = 0

  input.forEach(line => {
    let [patterns, output] = line.split('|')

    patterns = patterns.split(' ').filter(value => value.length > 0)
    patterns = patterns.map(el => [...el].sort().join(''))
    patterns = patterns.sort((a, b) => a.length - b.length)

    output = output.split(' ').filter(value => value.length > 0)
    output = output.map(el => [...el].sort().join(''))

    let decode = decodePatterns(patterns)

    for (let i = 0; i < output.length; i++) {
      output[i] = decode[output[i]]
    }

    result += +output.join('')
  })

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()