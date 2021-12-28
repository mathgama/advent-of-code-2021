import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day13/input.txt')

const initializeGrid = (size) => {
  let grid = new Array(size).fill(false)

  for (let i = 0; i < grid.length; i++)
    grid[i] = new Array(size).fill(false)

  return grid
}

const foldPaper = (paper, fold) => {
  const iStart = fold.axis == 'y' ? 0 : fold.line
  const jStart = fold.axis == 'y' ? fold.line : 0

  for (let i = iStart; i < paper.length; i++) {
    for (let j = jStart; j < paper.length; j++) {
      const iDest = fold.axis == 'y' ? i : fold.line - (i - fold.line)
      const jDest = fold.axis == 'y' ? fold.line - (j - fold.line) : j

      if (iDest < 0 || jDest < 0) return

      paper[iDest][jDest] = paper[i][j] || paper[iDest][jDest]
      paper[i][j] = false
    }
  }
}

const partOne = () => {
  const paper = initializeGrid(1500)
  const folds = []

  originalInput.forEach(line => {
    if (line == '') return

    if (line.substring(0, 4) != 'fold') {
      const [x, y] = line.split(',')
      paper[x][y] = true
    } else {
      const [foldAxis, foldLine] = line.split(' ').pop().split('=')
      folds.push({axis: foldAxis, line: foldLine})
    }
  })

  const fold = folds[0]
  foldPaper(paper, fold)

  const result = paper.reduce((acc, curr) => acc + curr.filter(el => el).length, 0)

  console.log('-- Part one --')
  console.log('Result:', result)
}

partOne()