const numRows = 7
const numCols = Math.round(window.innerWidth / 16)

const baseWaveAmplitude = 2.0
const waveFrequency = 0.08
const waveSpeed = 0.02

const waveElement = document.getElementById('wave')

let phaseShift = 0
let symbolGrid = Array(numRows)
  .fill()
  .map(() => Array(numCols).fill(' '))
let colorGrid = Array(numRows)
  .fill()
  .map(() => Array(numCols).fill(''))

function getRandomSymbol() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$%&!?:|*-+=<>§'
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

function updateWave() {
  let gridString = ''

  gridString += `<div style="color: #fff;">${'#'.repeat(numCols + 2)}</div>`

  for (let row = 0; row < numRows; row++) {
    let rowString = `<span style="color: #fff;">#</span>`

    for (let col = 0; col < numCols; col++) {
      let amplitudeVariation = Math.sin(col * 0.06 + phaseShift) * 1.2
      let waveValue = Math.cos(waveFrequency * (col + phaseShift)) * (baseWaveAmplitude + amplitudeVariation)
      let newColor = row <= Math.round(waveValue + baseWaveAmplitude) ? '#f7ff99' : '#66ccff'

      if (colorGrid[row][col] !== newColor) {
        colorGrid[row][col] = newColor
        symbolGrid[row][col] = getRandomSymbol()
      }

      rowString += `<span style="color: ${newColor};">${symbolGrid[row][col]}</span>`
    }

    rowString += `<span style="color: #fff;">#</span>`
    gridString += `<div>${rowString}</div>`
  }

  gridString += `<div style="color: #fff;">${'#'.repeat(numCols + 2)}</div>`

  waveElement.innerHTML = gridString
  phaseShift += waveSpeed

  requestAnimationFrame(updateWave)
}

window.addEventListener('resize', () => {
  symbolGrid = Array(numRows)
    .fill()
    .map(() => Array(numCols).fill(' '))
  colorGrid = Array(numRows)
    .fill()
    .map(() => Array(numCols).fill(''))
})

updateWave()
