import { readInputString } from '../utils.js'

const originalInput = readInputString('./src/day13/input.txt')

const initializeGrid = (size) => {
  let grid = new Array(size).fill(false)

  for (let i = 0; i < grid.length; i++)
    grid[i] = new Array(size).fill(false)

  return grid
}

const processInput = () => {
  const paper = initializeGrid(1500)
  const folds = []

  originalInput.forEach(line => {
    if (line == '') return

    if (line.substring(0, 4) != 'fold') {
      const [col, row] = line.split(',')
      paper[row][col] = true
    } else {
      const [foldAxis, foldLine] = line.split(' ').pop().split('=')
      folds.push({axis: foldAxis, line: foldLine})
    }
  })

  return [paper, folds]
}

const foldPaper = (paper, fold) => {
  const iStart = fold.axis == 'x' ? 0 : +fold.line + 1
  const jStart = fold.axis == 'x' ? +fold.line + 1 : 0

  for (let i = iStart; i < paper.length; i++) {
    for (let j = jStart; j < paper.length; j++) {
      const iDest = fold.axis == 'x' ? i : fold.line - (i - fold.line)
      const jDest = fold.axis == 'x' ? fold.line - (j - fold.line) : j

      if (iDest < 0 || jDest < 0) break

      paper[iDest][jDest] = paper[i][j] || paper[iDest][jDest]
      paper[i][j] = false
    }
  }
}

const partOne = () => {
  const [paper, folds] = processInput()

  foldPaper(paper, folds[0])

  const result = paper.reduce((acc, curr) => acc + curr.filter(el => el).length, 0)

  console.log('-- Part one --')
  console.log('Result:', result)
}

const partTwo = () => {
  const [paper, folds] = processInput()

  folds.forEach(fold => foldPaper(paper, fold))

  console.log('-- Part two --')
  
  for (let i = 0; i < 6; i++) {
    let line = ''

    for (let j = 0; j < 40; j++) {
      line += paper[i][j] ? '#' : '.'
    }

    console.log(line)
  }
}

partOne()
partTwo()