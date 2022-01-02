import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day16/input.txt')

const hex2bin = (hex) => {
  return parseInt(hex, 16).toString(2)
}

const partOne = () => {
  const bin = hex2bin(originalInput)

  const packetType = bin.substring(i, i+3)

  if (packetType == '100') {
    i += 3

    while (true) {
      const keepReading = bin.substring(i, i+1) == '1' ? true : false
      i += 5
      if (!keepReading) break
    }
  } else {
    i += 6
    const lengthType = bin.substring(i, i+1)

    i += 1

    if (lengthType = '0') {
      const totalLength = parseInt(bin.substring(i, i+15), 2)
    } else {
      const numberSubPackets = parseInt(bin.substring(i, i+11), 2)
    }
  }
}

partOne()