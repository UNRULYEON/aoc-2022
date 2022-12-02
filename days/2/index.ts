import { getDayInput } from "../../utils/index.ts"

const rawInput = getDayInput(2)

const sanitizeInput = (input: string): string[][] => input.split('\n').map(round => {
  if (round.length !== 3) return round.slice(0, -1)
  return round
}).map(round => round.split(' '))

enum RPS {
  ROCK = 'Rock',
  PAPER = 'Paper',
  SCISSORS = 'Scissors'
}

enum RPS_RESULT {
  DRAW = 'DRAW',
  LOSS = 'LOSS',
  WIN = 'WIN'
}

const OPPONENT = {
  'A': RPS.ROCK,
  'B': RPS.PAPER,
  'C': RPS.SCISSORS
}

const PLAYER = {
  'X': RPS.ROCK,
  'Y': RPS.PAPER,
  'Z': RPS.SCISSORS
}

const RPS_RULES = {
  [RPS.ROCK]: RPS.PAPER,
  [RPS.PAPER]: RPS.SCISSORS,
  [RPS.SCISSORS]: RPS.ROCK,
}

const OUTCOME = {
  'X': RPS_RESULT.LOSS,
  'Y': RPS_RESULT.DRAW,
  'Z': RPS_RESULT.WIN
}

const shapeScore = (shape: RPS): number => shape === RPS.ROCK ? 1 : shape === RPS.PAPER ? 2 : 3

const SimulateRound = (player: RPS, opponent: RPS): number => {
  const shapeResult = shapeScore(player)

  let result = 0

  if (player === opponent) result += 3

  if (
    player === RPS.ROCK && opponent === RPS.SCISSORS ||
    player === RPS.PAPER && opponent === RPS.ROCK ||
    player === RPS.SCISSORS && opponent === RPS.PAPER
  ) result += 6

  return result + shapeResult
}

const SimulateOutcome = (opponent: RPS, expected: RPS_RESULT) => {
  const shape = expected === RPS_RESULT.WIN
    ? RPS_RULES[opponent]
    : expected === RPS_RESULT.LOSS
      ? RPS_RULES[RPS_RULES[opponent]]
      : opponent

  return SimulateRound(shape, opponent)
}

const program = () => {
  const input = sanitizeInput(rawInput)

  const results = input.map(round => {
    const [opp, player] = (round as [keyof typeof OPPONENT, keyof typeof PLAYER])

    const gameResult = SimulateRound(PLAYER[player], OPPONENT[opp])
    const outcomeResult = SimulateOutcome(OPPONENT[opp], OUTCOME[player])

    return [gameResult, outcomeResult]
  })

  const reducedResults = results.reduce((prev, curr) => [prev[0] + curr[0], prev[1] + curr[1]], [0, 0])

  console.log('Part 1 -', reducedResults[0])
  console.log('Part 2 -', reducedResults[1])
}

export default program