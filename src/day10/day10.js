import { readInputString } from '../utils.js'

const input = readInputString('./src/day10/input.txt')

const partOne = () => {
  const regex = new RegExp('[([{<]')
  const tagMatch = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  }

  let result = 0
  const illegalCharacters = []

  input.forEach(line => {
    const stack = []

    while(line) {
      const char = line.slice(0,1)
      line = line.slice(1)

      if (regex.test(char)) // chunk openning
        stack.push(char)
      else { // chunk closing
        if (stack.pop() != tagMatch[char]) {
          illegalCharacters.push(char)
          return
        }
      }
    }
  })

  illegalCharacters.forEach(char => {
    switch (char) {
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

partOne()