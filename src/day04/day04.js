import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day04/input.txt')

const parseInput = () => {
  const input = [...originalInput]
  const drawOrder = input.shift().split(',')

  const boards = []
  let board = []

  input.forEach(line => {
    if (line.length == 0) return

    const row = line.split(' ').filter(value => value != '')
    board.push(row)

    if (board.length == 5) {
      boards.push(board)
      board = []
    }
  })

  return {
    drawOrder: drawOrder,
    boards: boards,
  }
}

const markNumber = (board, drawnNumber) => {
  let winner = false
  let unmarkedSum = 0
  let colComplete = new Array(5).fill(true)

  for (let row = 0; row < board.length; row++) {
    let rowComplete = true

    for (let col = 0; col < board[row].length; col++) {
      // remove the marked number
      if (board[row][col] == drawnNumber) {
        board[row][col] = ''
      }

      // if unmarked, sum it to the score
      unmarkedSum += +board[row][col]

      // if one unmarked value is found, row and column are not complete
      if (board[row][col] != '') {
        rowComplete = false
        colComplete[col] = false
      }
    }

    if (rowComplete) winner = true
  }
  
  if (colComplete.filter(col => col).length > 0) winner = true

  let score = 0
  if (winner)
    score = unmarkedSum * drawnNumber

  return score
}

const partOne = () => {
  const input = parseInput()

  while (true) {
    const drawnNumber = input.drawOrder.shift()
    let score = 0

    input.boards.every(board => {
      score = markNumber(board, drawnNumber)

      return score > 0
        ? false // continue the board loop
        : true // stop the board loop
    })

    if (score > 0) {
      console.log('-- Part one --')
      console.log('Score:', score)
      return
    }
  }
}

const partTwo = () => {
  const input = parseInput()

  while (input.boards.length > 0) {
    const drawnNumber = input.drawOrder.shift()
    let score = 0

    input.boards.forEach((board, index, array) => {
      score = markNumber(board, drawnNumber)

      if (score > 0) array.splice(index, 1)
    })

    if (input.boards.length == 0) {
      console.log('-- Part two --')
      console.log('Score:', score)
    }
  }
}

//partOne()
partTwo()