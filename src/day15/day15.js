import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day15/input.txt')

const getNextNode = (unvisited) => {
  unvisited.sort((a, b) => a.distance - b.distance)
  return unvisited.shift()
}

const getUnvisitedNeighbors = (currentNode, unvisited) => {
  const [i, j] = [currentNode.i, currentNode.j]
  const unvisitedNeighbors = []
  let node

  node = unvisited.filter(el => el.i == i+1 && el.j == j)[0]
  if (node) unvisitedNeighbors.push(node)

  node = unvisited.filter(el => el.i == i-1 && el.j == j)[0]
  if (node) unvisitedNeighbors.push(node)

  node = unvisited.filter(el => el.i == i && el.j+1 == j)[0]
  if (node) unvisitedNeighbors.push(node)

  node = unvisited.filter(el => el.i == i && el.j-1 == j)[0]
  if (node) unvisitedNeighbors.push(node)
  
  return unvisitedNeighbors
}

const partOne = () => {
  let input = []
  originalInput.forEach(line => input.push(line.split('')))

  const visited = []
  const unvisited = []

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const node = {
        i: i,
        j: j,
        //coord: [i, j],
        distance: Number.MAX_SAFE_INTEGER,
        risk: +input[i][j],
        previous: null,
      }

      unvisited.push(node)
    }
  }
  
  unvisited[0].distance = 0
  unvisited[0].risk = 0

  let node = unvisited[0]

  while (unvisited.length > 0) {
    node = getNextNode(unvisited)
    const unvisitedNeighbors = getUnvisitedNeighbors(node, unvisited)

    for (const neighbor of unvisitedNeighbors) {
      const distance = node.distance + neighbor.risk

      if (distance < neighbor.distance) {
        neighbor.distance = distance
        neighbor.previous = [node.i, node.j]
      }
    }

    visited.push(node)
  }

  visited.sort((a, b) => (b.i + b.j) - (a.i + a.j))
  const finalNode = visited[0]

  console.log('-- Part one --')
  console.log('Result:', finalNode.distance)
}

partOne()