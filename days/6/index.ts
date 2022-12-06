import { getDayInput } from "../../utils/index.ts"

const rawInput = getDayInput(6)

const getMarker = (input: string[], markerLength: number) => input
  .reduce<number>((acc, _, i) => {
    let chars = ''

    for (let k = 0; k < markerLength; k++) {
      if (input[k + i]) chars += input[k + i]
    }

    const repeated = /(.).*\1/.test(chars)

    return acc === 0 && !repeated ? i + markerLength : acc
  }, 0)


const part1 = () => {
  const input = rawInput
    .split('')

  const packetMarker = getMarker(input, 4)

  console.log('Part 1 -', packetMarker)
}

const part2 = () => {
  const input = rawInput
    .split('')

  const messageMarker = getMarker(input, 14)

  console.log('Part 2 -', messageMarker)
}

const program = () => {
  part1()
  part2()
}

export default program