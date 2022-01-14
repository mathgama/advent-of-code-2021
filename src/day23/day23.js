import { readInputString } from './utils.js'

const originalInput = readInputString('./src/day23/input.txt')

const doors = [2, 4, 6, 8]

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

const calculateCost = (hallway, origin, destiny) => {
  let moves = 0

  if (doors.includes(origin)) // moving out of a room
    moves += hallway[origin].length === 1 ? 2 : 1 // cost to get to the door

  if (doors.includes(destiny)) // moving into a room
    moves += hallway[destiny].length === 1 ? 1 : 2

  const diff = destiny - origin

  for (let i = 0; i !== diff;) {
    diff > 0 ? i++ : i--

    // if not empty and not a door, path is blocked
    if (hallway[origin + i] !== '.' && !doors.includes(origin + i)) return 0

    moves++
  }

  return moves * cost[hallway[origin]]
}

const getPossibleMoves = (hallway) => {
  const possibleMoves = []

  // room to hallway or to another room
  for (let i = 0; i < doors.length; i++) {
    const doorIndex = doors[i]
    if (hallway[doorIndex].length === 0) continue

    for (let j = 0; j < hallway.length; j++) {
      if (j == doorIndex) continue // do not move to the same place

      if (
          hallway[j] == "." ||
          (doors.includes(j) && !hallway[j].some(el => el != hallway[j][0]))
         ) {
        const cost = calculateCost(hallway, doorIndex, j);
        if (cost == 0) continue
        
        possibleMoves.push({
          from: doorIndex,
          to: j,
          cost
        })
      }
    }
  }
  
  // hallway to room
  for (let i = 0; i < hallway.length; i++) {
    const value = hallway[i]
    
    if (value == '.' || Array.isArray(value)) continue
    
    const doorIndex = targetRoom[value]

    if (!hallway[doorIndex].some(el => el != value)) {
      const cost = calculateCost(hallway, i, doorIndex)
      if (cost == 0) continue
      
      possibleMoves.push({
        from: i,
        to: doorIndex,
        cost
      })
    }
  }

  return possibleMoves
}

const shortestPath = (hallway) => {
  
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
}

partOne()