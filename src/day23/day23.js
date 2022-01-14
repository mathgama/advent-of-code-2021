import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day23/input.txt')

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

const calculateCost = (state, origin, destiny) => {
  let moves = 0

  const pod = doors.includes(origin) ? state[origin][0] : state[origin]

  if (doors.includes(origin)) // moving out of a room
    moves += state[origin].length === 1 ? 2 : 1 // cost to get to the door

  if (doors.includes(destiny)) // moving into a room
    moves += state[destiny].length === 1 ? 1 : 2

  const diff = destiny - origin

  for (let i = 0; i !== diff;) {
    diff > 0 ? i++ : i--

    // if not empty and not a door, path is blocked
    if (state[origin + i] !== '.' && !doors.includes(origin + i)) return 0

    moves++
  }

  return moves * cost[pod]
}

const getPossibleMoves = (state) => {
  const possibleMoves = []
  let newState

  // room to hallway or to another room
  for (let i = 0; i < doors.length; i++) {
    const doorIndex = doors[i]
    if (state[doorIndex].length === 0) continue

    for (let j = 0; j < state.length; j++) {
      if (j == doorIndex) continue // do not move to the same place

      if (
          state[j] == "." ||
          (doors.includes(j) && !state[j].some(el => el != state[j][0]))
         ) {
        const cost = calculateCost(state, doorIndex, j);
        if (cost == 0) continue

        newState = JSON.parse(JSON.stringify(state))
        const pod = newState[doorIndex].shift()
        newState[doorIndex].unshift('.')
        doors.includes(j) ? newState[j].shift(pod) : newState[j] = pod
        
        possibleMoves.push({
          state: newState,
          cost: cost
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
      const cost = calculateCost(state, i, doorIndex)
      if (cost == 0) continue

      newState = JSON.parse(JSON.stringify(state))
      const pod = newState[i]
      newState[i] = '.'
      newState[doorIndex].unshift(pod)
      
      possibleMoves.push({
        state: newState,
        cost: cost
      })
    }
  }

  return possibleMoves
}

const isFinalState = (state) => {
  console.log(state.flat(2).join(''))
  for (let i = 0; i < doors.length; i++) {
    const door = doors[i]
    if (state[door].some(el => el != amphipods[i]))
      return false
  }
  return true
}

const shortestPath = (initialHallway) => {
  let queue = []
  const seen = new Set()

  queue.push({ state: initialHallway, cost: 0 })

  while(queue.length > 0) {
    queue.sort((a, b) => b.cost - a.cost)

    const {state, cost} = queue.shift()
    const stateString = state.flat(2).join('')

    if (!seen.has(stateString)) {
      seen.add(stateString)

      if(isFinalState(state))
        return cost
      else {
        const possibleMoves = getPossibleMoves(state)
        queue = queue.concat(possibleMoves)
      }
    }
  }
}

const partOne = () => {
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

  const result = shortestPath(hallway)
  console.log(result)
}

partOne()