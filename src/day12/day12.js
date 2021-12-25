import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day12/input.txt')

const navigate = (connections, currentCave, currentPath, paths) => {
  currentPath.push(currentCave)

  if (currentCave == 'end') return currentPath

  connections[currentCave].forEach(destination => {
    if (destination == 'start') return
    if (destination == destination.toLowerCase() && currentPath.includes(destination)) return
    paths.push(navigate(connections, destination, currentPath, paths))
  })

  //return paths
}

const partOne = () => {
  const connections = []

  originalInput.forEach(line => {
    const [origin, destination] = line.split('-')

    if (!connections[origin]) connections[origin] = []
    if (!connections[destination]) connections[destination] = []

    connections[origin].push(destination)
    connections[destination].push(origin)
  })


  const paths = []
  navigate(connections, 'start', [], paths)

  console.log(paths)
}

partOne()