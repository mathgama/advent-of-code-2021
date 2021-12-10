import { readInputString } from '../utils.js'

const input = readInputString('./src/day05/input.txt')

const partOne = () => {
  let result = 0
  
  let grid = new Array(999).fill(0)
  for (let i = 0; i < grid.length; i++)
    grid[i] = new Array(999).fill(0)

  input.forEach(line => {
    let [from, to] = line.split(' -> ')
    
    from = from.split(',')
    to = to.split(',')
    
    if (from[0] != to[0] && from[1] != to[1]) return 
    else if (to[0] < from[0]) [from[0], to[0]] = [to[0], from[0]]
    else if (to[1] < from[1]) [from[1], to[1]] = [to[1], from[1]]

    for (let i = from[1]; i <= to[1]; i++)
      for (let j = from[0]; j <= to[0]; j++)
        grid[i][j]++
  })

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++)
      if (grid[i][j] > 1) result++

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()