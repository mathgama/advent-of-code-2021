import { readInputString } from '../utils.js'
import { MinPriorityQueue } from 'datastructures-js'

const originalInput = readInputString('./src/day23/input.txt')

let roomMaximumSize

const doors = [2, 4, 6, 8]
const amphipods = ['A', 'B', 'C', 'D']

const targetRoom = {
  'A': doors[0],
  'B': doors[1],
  'C': doors[2],
  'D': doors[3],
}

const cost = {
  'A': 1,
  'B': 10,
  'C': 100,
  'D': 1000,
}

const processInput = () => {
  const input = [...originalInput]
  input.shift()
  input.shift()
  input.pop()

  const hallway = new Array(11).fill('.')

  input.forEach(line => {
    line.substring(3, 10).split('#').forEach((pod, index) => {
      const roomIndex = doors[index]
      if(hallway[roomIndex] == '.') hallway[roomIndex] = []
      hallway[roomIndex].push(pod)
    })
  })

  return hallway
}

const calculateCost = (state, origin, destiny) => {
  let moves = 0

  const pod = doors.includes(origin) ? state[origin][0] : state[origin]

  if (doors.includes(origin)) // moving out of a room
    moves += roomMaximumSize + 1 - state[origin].length
    //moves += state[origin].length === 1 ? 2 : 1 // cost to get to the door

  if (doors.includes(destiny)) // moving into a room
    moves += roomMaximumSize - state[destiny].length
    //moves += state[destiny].length === 1 ? 1 : 2

  const diff = destiny - origin

  for (let i = 0; i !== diff;) {
    diff > 0 ? i++ : i--

    // if not empty and not a door, path is blocked
    if (state[origin + i] !== '.' && !doors.includes(origin + i)) return 0

    moves++
  }

  return moves * cost[pod]
}

const getPossibleMoves = (state, cost) => {
  const possibleMoves = []
  let newState

  // room to hallway or to another room
  for (let i = 0; i < doors.length; i++) {
    const doorIndex = doors[i]
    if (state[doorIndex].length === 0) continue
    if (doorIndex == targetRoom[state[doorIndex][0]] &&
        state[doorIndex].every(el => el == state[doorIndex][0]))
      continue

    for (let j = 0; j < state.length; j++) {
      if (j == doorIndex) continue // do not move to the same place

      if (
          state[j] == "." ||
          (
            doors.includes(j) && 
            !state[j].some(el => el != state[doorIndex][0]) &&
            j == targetRoom[state[doorIndex][0]]
          )
         ) {
        const moveCost = calculateCost(state, doorIndex, j);
        if (moveCost == 0) continue

        newState = JSON.parse(JSON.stringify(state))
        const pod = newState[doorIndex].shift()
        doors.includes(j) ? newState[j].unshift(pod) : newState[j] = pod
        
        possibleMoves.push({
          state: newState,
          cost: cost + moveCost
        })
      }
    }
  }
  
  // hallway to room
  for (let i = 0; i < state.length; i++) {
    const value = state[i]
    
    if (value == '.' || Array.isArray(value)) continue
    
    const doorIndex = targetRoom[value]

    if (!state[doorIndex].some(el => el != value)) {
      const moveCost = calculateCost(state, i, doorIndex)
      if (moveCost == 0) continue

      newState = JSON.parse(JSON.stringify(state))
      const pod = newState[i]
      newState[i] = '.'
      newState[doorIndex].unshift(pod)
      
      possibleMoves.push({
        state: newState,
        cost: cost + moveCost
      })
    }
  }

  return possibleMoves
}

const isFinalState = (state) => {
  for (let i = 0; i < doors.length; i++) {
    const door = doors[i]
    if (state[door].length < roomMaximumSize || state[door].some(el => el != amphipods[i]))
      return false
  }
  return true
}

const createStateString = (state) => {
  let result = ''
  for (let i = 0; i < state.length; i++) {
    result += Array.isArray(state[i]) 
      ? '<' + state[i].join('') + '>'
      : state[i]
  }
  return result
}

const shortestPath = (initialHallway) => {
  const q = new MinPriorityQueue()
  const seen = new Set()

  const previous = new Map()

  q.enqueue({ state: initialHallway, cost: 0 }, 0)

  while(q.size()) {
    const cur = q.dequeue()
    const [state, cost] =   [cur.element.state, cur.element.cost]

    //const stateString = state.flat(2).join('')
    const stateString = createStateString(state)

    if (!seen.has(stateString)) {
      seen.add(stateString)

      if(isFinalState(state)) {
        let curr = {prevState: stateString, cost: cost}
        do {
          console.log(curr.prevState, curr.cost)
          const prev = previous.get(curr.prevState)
          curr = prev
        } while (curr)

        return cost
      }
      else {          
        getPossibleMoves(state, cost).forEach(move => {
          q.enqueue(move, move.cost)

          previous.set(createStateString(move.state), {prevState: stateString, cost: cost})
        })
      }
    }
  }
}

const partOne = () => {
  const input = processInput()

  roomMaximumSize = 2

  const result = shortestPath(input)
  
  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {
  const input = processInput()

  input.forEach((room, index) => {
    switch (index) {
      case 2:
        room.splice(1, 0, 'D')
        room.splice(1, 0, 'D')
        break
      case 4:
        room.splice(1, 0, 'B')
        room.splice(1, 0, 'C')
        break
      case 6:
        room.splice(1, 0, 'A')
        room.splice(1, 0, 'B')
        break
      case 8:
        room.splice(1, 0, 'C')
        room.splice(1, 0, 'A')
        break
    }
  })

  roomMaximumSize = 4

  const result = shortestPath(input)
  
  console.log('-- Part two --')
  console.log('Result:', result)
}

partOne()
partTwo()