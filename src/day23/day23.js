import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day23/input.txt')

const partOne = () => {
  const input = [...originalInput]
  input.shift()
  input.shift()
  input.pop()

  const hallway = new Array(7).fill('.')
  const rooms = new Array(4)

  input.forEach(line => {
    line.substring(3, 10).split('#').forEach((pod, index) => {
      if(!rooms[index]) rooms[index] = []
      rooms[index].push(pod)
    })
  })

  
}

partOne()