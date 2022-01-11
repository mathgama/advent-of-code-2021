import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day21/input.txt')

const partOne = () => {
  const input = [...originalInput]

  const players = []
  players.push(+input.shift().split(': ')[1])
  players.push(+input.shift().split(': ')[1])

  const score = [0, 0]

  let i = 0
  let turn = 0

  for (;i < 1000; i++) {
    const move = 6 + (9 * i)

    players[turn] += move
    score[turn] += players[turn] % 10 == 0 ? 10 : players[turn] % 10

    if (score[turn] >= 1000) break

    turn = turn == 0 ? 1 : 0
  }

  const looserScore = score[0] < score[1] ? score [0] : score[1]
  const timesDiceRolled = (i * 3) + 3 // account for i = 0

  console.log('-- Part one --')
  console.log('Result:', looserScore * timesDiceRolled)
}

const ROLL_FREQUENCIES = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1
}

const diracDice = (players, score, wins, times=1, turn=0) => {
  const nextTurn = turn == 0 ? 1 : 0

  // 3 = all dices rolled 1
  // 9 = all dices rolled 3
  for (let move = 3; move <= 9; move++) {
    const newPlayers = [...players]
    const newScore = [...score]

    const rollFrequency = ROLL_FREQUENCIES[move]

    newPlayers[turn] += move
    newScore[turn] += newPlayers[turn] % 10 == 0 ? 10 : newPlayers[turn] % 10

    if (newScore[turn] >= 21) {
      wins[turn] += times * rollFrequency
    } else {
      diracDice(newPlayers, newScore, wins, times * rollFrequency, nextTurn)
    }
  }
}

const partTwo = () => {
  const input = [...originalInput]

  const players = []
  players.push(+input.shift().split(': ')[1])
  players.push(+input.shift().split(': ')[1])

  const score = [0, 0]
  const wins = [0, 0]

  diracDice(players, score, wins)

  console.log('-- Part two --')
  console.log('Result:', wins)
}

partOne()
partTwo()