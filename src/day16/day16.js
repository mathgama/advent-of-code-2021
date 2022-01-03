import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day16/input.txt')

const hex2bin = (hex) => {
  return hex.split('').reduce(
    (acc, curr) => acc += parseInt(curr, 16).toString(2).padStart(4, '0'), 
    ''
  )
}

const getValue = (bin, packetStartIndex) => {
  const i = packetStartIndex
  let j

  const versionNumber = parseInt(bin.substring(i, i+3), 2)
  const packetType = parseInt(bin.substring(i+3, i+6), 2)
  j = i + 6

  if (packetType == 4) {
    let value = ''
    while (true) {
      const keepReading = bin.substring(j, j+1) == '1' ? true : false
      value += bin.substring(j+1, j+5)
      j += 5
      
      if (!keepReading) return {
        versionSum: versionNumber,
        value: parseInt(value, 2),
        packetFinish: j,
      }
    }
  } else {
    const lengthType = bin.substring(i+6, i+7)
    j += 1

    let subpacketValues = []
    let subpacketVersionSum = 0

    if (lengthType == '0') {
      const totalLength = parseInt(bin.substring(i+7, i+22), 2)
      j += 15

      let evaluatedLength = 0
      while (evaluatedLength < totalLength) {
        const {versionSum, value, packetFinish} = getValue(bin, j)
        subpacketVersionSum += versionSum
        subpacketValues.push(value)
        evaluatedLength += packetFinish - j
        j = packetFinish
      }
    } else {
      const numberSubpackets = parseInt(bin.substring(i+7, i+18), 2)
      j += 11

      for (let p = 0; p < numberSubpackets; p++) {
        const {versionSum, value, packetFinish} = getValue(bin, j)
        subpacketVersionSum += versionSum
        subpacketValues.push(value)
        j = packetFinish
      }
    }

    let value = 0

    switch (packetType) {
      case 0:
        value = subpacketValues.reduce((acc, curr) => acc + curr, 0)
        break
      case 1:
        value = subpacketValues.reduce((acc, curr) => acc * curr, 1)
        break
      case 2:
        subpacketValues.sort((a, b) => a - b)
        value = subpacketValues[0]
        break
      case 3:
        subpacketValues.sort((a, b) => b - a)
        value = subpacketValues[0]
        break
      case 5:
        value = subpacketValues[0] > subpacketValues[1] ? 1 : 0
        break
      case 6:
        value = subpacketValues[0] < subpacketValues[1] ? 1 : 0
        break
      case 7:
        value = subpacketValues[0] == subpacketValues[1] ? 1 : 0
        break
    }

    return {
      versionSum: versionNumber + subpacketVersionSum,
      value: value,
      packetFinish: j,
    }
  }
}

const partOne = () => {
  const bin = hex2bin(originalInput[0])

  const {versionSum} = getValue(bin, 0)

  console.log('-- Part one --')
  console.log('Result:', versionSum)
}

const partTwo = () => {
  const bin = hex2bin(originalInput[0])

  const {value} = getValue(bin, 0)

  console.log('-- Part two --')
  console.log('Result:', value)
}

partOne()
partTwo()