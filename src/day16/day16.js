import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day16/input.txt')

const hex2bin = (hex) => {
  return hex.split('').reduce(
    (acc, curr) => acc += parseInt(curr, 16).toString(2).padStart(4, '0'), 
    ''
  )
}

const getVersionSum = (bin, packetStartIndex) => {
  const i = packetStartIndex
  let j

  if (i > bin.length || bin.substring(i).replace('0', '') == '') return 0

  const versionNumber = parseInt(bin.substring(i, i+3), 2)
  const packetType = bin.substring(i+3, i+6)

  if (packetType == '100') {
    j = i + 6
    while (true) {
      const keepReading = bin.substring(j, j+1) == '1' ? true : false
      j += 5
      if (!keepReading) break
    }
  }
  else {
    const lengthType = bin.substring(i+6, i+7)

    j = i + 7

    if (lengthType == '0') {
      const totalLength = parseInt(bin.substring(i+7, i+22), 2)
      j += 15
    } else {
      const numberSubPackets = parseInt(bin.substring(i+7, i+18), 2)
      j += 11
    }
  }

  return versionNumber + getVersionSum(bin, j)
}

const partOne = () => {
  const bin = hex2bin(originalInput.shift())

  const result = getVersionSum (bin, 0)

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()