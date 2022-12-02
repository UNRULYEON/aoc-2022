import { getDayInput } from "../../utils/index.ts"

const rawInput = getDayInput(1)

const sanitizeInput = (input: string): number[][] => {
  const sanitizedArray = input.split('\n')
    .map(calorie => {
      if (Number(calorie)) return parseInt(calorie)
      if (calorie !== '\r') return parseInt(calorie.slice(0, -1))
    })

  const arrayizedInput: number[][] = [[]]

  sanitizedArray.map((calorie) => {
    if (calorie) {
      arrayizedInput[arrayizedInput.length - 1].push(calorie)
    } else {
      arrayizedInput.push([])
    }
  })

  return arrayizedInput
}

const program = () => {
  const input = sanitizeInput(rawInput)

  const totals = input.map(calorieCollection => calorieCollection.reduce((prev, curr) => prev + curr, 0))

  console.log(totals.sort((a, b) => b - a)[0])
}

export default program