import { getDayInput } from "../../utils/index.ts"

const rawInput = getDayInput(4)

const sanitizeInput = (input: string): string[] => input.split('\n')

const getSections = (pair: string) => pair.split(',')
  .map(sections => sections.split('-'))
  .map(sections => [Number(sections[0]), Number(sections[1])])

const part1 = () => {
  const input = sanitizeInput(rawInput)

  const sum = input.map(pair => {
    const [section1, section2] = getSections(pair)

    if (section1[0] >= section2[0] && section1[1] <= section2[1] ||
      section2[0] >= section1[0] && section2[1] <= section1[1]) {
      return true
    }

    return false
  }).reduce((acc, curr) => curr ? acc + 1 : acc, 0)

  console.log('Part 1 -', sum)
}

const part2 = () => {
  const input = sanitizeInput(rawInput)

  const sum = input.map(pair => {
    const [section1, section2] = getSections(pair)

    if (
      section1[0] >= section2[0] && section1[0] <= section2[1] ||
      section1[1] >= section2[0] && section1[1] <= section2[1] ||
      section2[0] >= section1[0] && section2[0] <= section1[1] ||
      section2[1] >= section1[0] && section2[1] <= section1[1]
    ) return true

    return false
  }).reduce((acc, curr) => curr ? acc + 1 : acc, 0)

  console.log('Part 2 -', sum)
}

const program = () => {
  part1()
  part2()
}

export default program