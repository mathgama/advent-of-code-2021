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

const partTwo = () => {
  const [x1, x2] = originalInput[0].split('x=')[1].split(',')[0].split('..')
  const [y1, y2] = originalInput[0].split('y=')[1].split('..')

  const result = []

  let step

  for (let xAccel = 1; xAccel < 179; xAccel++) {
    let x = 0
    step = 0

    while (true) {
      step++

      if (xAccel > step)
        x += xAccel - (step - 1)

      if (xAccel > step && x < x1) continue
      else if (x < x1) break
      else if (x > x2) break

      let doNextStep = false

      for (let yAccel = -100; yAccel < 100; yAccel ++) {
        let y = 0
        
        y = yAccel * step - nthTriangular(step - 1)

        if (y > y1) doNextStep = true
        
        if (y <= y2 && y >= y1) {
          if (result.filter(el => el[0] == xAccel & el[1] == yAccel).length == 0)
            result.push([xAccel, yAccel])
        }
      }

      if (!doNextStep) 
        break
    }
  }

  console.log('-- Part two --')
  console.log('Result:', result.length)
}

partOne()
partTwo()