import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day19/input.txt')

const processInput = () => {
  const scanners = []
  let beacons = []

  originalInput.forEach(line => {
    if (line.substring(0, 3) == '---') {
      if (beacons.length > 0) scanners.push(beacons)
      beacons = []
    } else {
      if (line != '') beacons.push(line.split(','))
    }
  })

  scanners.push(beacons)

  return scanners
}

const partOne = () => {
  const scanners = processInput()
  let distances = []

  scanners.forEach(scanner => {
    //let beaconsDiff = new Map()

    for (let i = 0; i < scanner.length; i++) {
      for (let j = i+1; j < scanner.length; j++) {
        const diffX = Math.abs(scanner[i][0] - scanner[j][0])
        const diffY = Math.abs(scanner[i][1] - scanner[j][1])
        const diffZ = Math.abs(scanner[i][2] - scanner[j][2])

        distances.push([diffX, diffY, diffZ])

        /* beaconsDiff.set({
          beacon1: i,
          beacon2: j,
        }, [diffX, diffY, diffZ]) */
      }
    }
    
    //distances.push(beaconsDiff)
  })

  distances.sort((a, b) => {
    if (a[0] < b[0]) return -1
    if (a[0] > b[0]) return 1
    if (a[1] < b[1]) return -1
    if (a[1] > b[1]) return 1
    if (a[2] < b[2]) return -1
    if (a[2] > b[2]) return 1
    return 0
  })

  console.log(distances.length)

  distances = distances.filter((el, i) => {
    if (!distances[i+1]) return true
    return el[0] == distances[i+1][0] 
        || el[1] == distances[i+1][1]
        || el[2] == distances[i+1][2]
  })

  console.log(distances.length)

  console.log('-- Part one --')
}

partOne()