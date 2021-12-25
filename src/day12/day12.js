import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day12/input.txt')

const processInput = () => {
  const connections = []

  originalInput.forEach(line => {
    const [origin, destination] = line.split('-')

    if (!connections[origin]) connections[origin] = []
    if (!connections[destination]) connections[destination] = []

    connections[origin].push(destination)
    connections[destination].push(origin)
  })

  return connections
}

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

const navigateComplex = (connections, visitTwice, minorVisitedTwice, currentCave, currentPath, paths) => {
  const path = [...currentPath]

  path.push(currentCave)

  const duplicate = paths.filter((element) => arraysEqual(element, path))
  if (duplicate.length > 0) return

  if (currentCave == 'end') {
    paths.push(path)
    return
  }

  connections[currentCave].forEach(destination => {
    let visittedTwice = minorVisitedTwice

    if (destination == 'start') return
    if (destination == destination.toLowerCase() && path.includes(destination)) {
      if (!minorVisitedTwice && visitTwice)
        visittedTwice = true
      else
        return
    }

    if(!minorVisitedTwice)
      navigateComplex(connections, true, visittedTwice, destination, path, paths)

    navigateComplex(connections, false, visittedTwice, destination, path, paths)
  })
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const partOne = () => {
  const connections = processInput(originalInput)

  const paths = []
  navigate(connections, 'start', [], paths)

  console.log('-- Part one --')
  console.log('Result:', paths.length)
}

const partTwo = () => {
  const connections = processInput(originalInput)

  let paths = []
  navigateComplex(connections, false, false, 'start', [], paths)

  //paths.sort()
  //paths = paths.filter((element,index) => !arraysEqual(element, paths[index-1]))

  //console.log(paths)

  console.log('-- Part two --')
  console.log('Result:', paths.length)
}

partOne()
partTwo()