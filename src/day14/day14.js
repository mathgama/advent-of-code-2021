import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day14/input.txt')

const countCharacters = (template) => {
  const counts = template.split('').reduce(
    (acc, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1
      return acc
    },
    []
  )

  const iterator = Object.keys(counts)

  let max = 0
  let min = Number.MAX_SAFE_INTEGER

  for (const key of iterator) {
    max = counts[key] > max ? counts[key] : max
    min = counts[key] < min ? counts[key] : min
  }

  return [max, min]
}

const processInput = () => {
  const template = originalInput.shift()
  const rules = []
  
  originalInput.shift() // remove empty line

  originalInput.forEach(line => {
    const [pair, insertion] = line.split(' -> ')
    rules[pair] = insertion
  })

  return [template, rules]
}

const partOne = () => {
  let [template, rules] = processInput()

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < template.length; j++) {
      const pair = template[j] + template[j+1]
      const insertion = rules[pair]
      if (insertion) {
        template = template.substring(0, j+1) + insertion + template.substring(j+1)
        j++
      }
    }
  }

  const [max, min] = countCharacters(template)

  console.log('-- Part one --')
  console.log('Result:', max - min)
}

partOne()