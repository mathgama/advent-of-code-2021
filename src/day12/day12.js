import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day12/input.txt')

const navigate = (connections, currentCave, currentPath, paths) => {
  const path = [...currentPath]
  path.push(currentCave)

  if (currentCave == 'end') {
    paths.push(path)
    return
  }

  connections[currentCave].forEach(destination => {
    if (destination == 'start') return
    if (destination == destination.toLowerCase() && path.includes(destination)) return
    navigate(connections, destination, path, paths)
  })
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

  console.log(paths.length)
}

partOne()