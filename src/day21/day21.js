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

    //console.log(`Player ${turn + 1}, score: ${score[turn]}`)

    if (score[turn] >= 1000) break

    turn = turn == 0 ? 1 : 0
  }

  const looserScore = score[0] < score[1] ? score [0] : score[1]
  const timesDiceRolled = (i * 3) + 3 // account for i = 0

  console.log('-- Part one --')
  console.log('Result:', looserScore * timesDiceRolled)
}

partOne()