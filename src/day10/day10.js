import { readInputString } from '../utils.js'

const input = readInputString('./src/day10/input.txt')

const processLine = (line) => {
  const regex = new RegExp('[([{<]')
  const tagMatch = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  }

  const stack = []
  const illegalCharacters=[]

  while(line) {
    const char = line.slice(0,1)
    line = line.slice(1)

    if (regex.test(char)) // chunk openning
      stack.push(char)
    else { // chunk closing
      if (stack.pop() != tagMatch[char]) {
        return [stack, char]
      }
    }
  }

  return [stack, '']
}

const partOne = () => {
  let result = 0

  input.forEach(line => {
    const [stack, illegalChar] = processLine(line)

    switch (illegalChar) {
      case ')':
        result += 3
        break
      case ']':
        result += 57
        break
      case '}':
        result += 1197
        break
      case '>':
        result += 25137
        break
    }
  })

  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {
  let result = 0
  const lineScores = []

  input.forEach(line => {
    let score = 0

    const [stack, illegalChar] = processLine(line)

    if (illegalChar) return

    while (stack.length > 0) {
      score *= 5
      switch (stack.pop()) {
        case '(':
          score += 1
          break
        case '[':
          score += 2
          break
        case '{':
          score += 3
          break
        case '<':
          score += 4
          break
      }
    }

    lineScores.push(score)
  })

  lineScores.sort((a, b) => a - b)
  result = lineScores[Math.floor(lineScores.length / 2)]

  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()