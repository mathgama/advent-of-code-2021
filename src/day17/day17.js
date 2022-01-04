import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day17/input.txt')

const nthTriangular = (number) => {
  return (number * (number + 1)) / 2
}

const partOne = () => {
  const [x1, x2] = originalInput[0].split('x=')[1].split(',')[0].split('..')
  const [y1, y2] = originalInput[0].split('y=')[1].split('..')

  let x = 0
  let xAccel = 0

  while (x <= x1) {
    xAccel++
    x += xAccel
  }

  const validTops = []

  for (let yAccel = 1; yAccel < 300; yAccel++) {
    let y = 0
    let higherY = 0

    let index = 0

    while (y >= y2) {
      index++
      y = yAccel * index + nthTriangular(index) * -1
      if (y > higherY) higherY = y
    }

    if (y >= y1) validTops.push(higherY)
  }

  console.log('-- Part one --')
  console.log('Result:', validTops[validTops.length - 1])
}

partOne()