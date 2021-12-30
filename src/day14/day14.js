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
  const input = [...originalInput]
  const template = input.shift()
  const rules = []
  
  input.shift() // remove empty line

  input.forEach(line => {
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

const addCounter = (counterMap, key, times=1) => {
  const currentValue = counterMap.get(key) ?? 0
  counterMap.set(key, currentValue + times)
}

const partTwo = () => {
  let [template, rules] = processInput()
  let pairCounter = new Map()
  let letterCounter = new Map()

  for (let i = 0; i < template.length; i++) {
    addCounter(letterCounter, template[i])

    if (i == template.length - 1) break

    const pair = template[i] + template[i+1]
    addCounter(pairCounter, pair)
  }

  for (let i = 0; i < 40; i++) {
    let newPairCounter = new Map()

    for (const [pair, counter] of pairCounter) {
      const insertion = rules[pair]

      if (insertion) {
        const leftPair = pair.substring(0, 1) + insertion
        const rightPair = insertion + pair.substring(1, 2)

        addCounter(newPairCounter, leftPair, counter)
        addCounter(newPairCounter, rightPair, counter)

        addCounter(letterCounter, insertion, counter)
      } else {
        addCounter(newPairCounter, pair, counter)
      }
    }

    pairCounter = new Map(newPairCounter)
  }

  let max = 0
  let min = Number.MAX_SAFE_INTEGER

  for (const counter of letterCounter.values()) {
    max = counter > max ? counter : max
    min = counter < min ? counter : min
  }

  console.log('-- Part two --')
  console.log('Result:', max - min)
}

partOne()
partTwo()