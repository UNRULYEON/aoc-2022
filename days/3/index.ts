import { getDayInput } from "../../utils/index.ts"

const rawInput = getDayInput(3)

const sanitizeInput = (input: string): string[] => input.split('\n')

const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const uppercase = lowercase.map(char => char.toUpperCase())

const getPriority = (input: string): number => {
  const lower = lowercase.findIndex(char => char === input)
  const upper = uppercase.findIndex(char => char === input)

  return lower !== -1 ? lower + 1 : upper + 27
}

const part1 = () => {
  const input = sanitizeInput(rawInput)

  const priorities = input.map(contents => {
    const halfLength = contents.length / 2
    const compartement1 = contents.slice(0, halfLength).split('')
    const compartement2 = contents.slice(halfLength, contents.length).split('')

    const common = compartement1.reduce((acc, char) => {
      if (compartement2.includes(char)) return char
      return acc
    }, '')

    return getPriority(common)
  })

  const sum = priorities.reduce((acc, priority) => acc + priority, 0)

  console.log('Part 1 -', sum)
}

const part2 = () => {
  const input = sanitizeInput(rawInput)
  const groups: string[][] = [[]]

  for (let i = 0; i < input.length; i++) {
    const element = input[i]
    const isLastInGroup = Number.isInteger((i + 1) / 3)

    groups[groups.length - 1].push(element)

    if (isLastInGroup && !(i + 1 === input.length)) groups.push([])
  }

  const priorities = groups.map(group => {
    const common = group[0].split('').reduce((acc, curr) => {
      if (group[1].includes(curr) && group[2].includes(curr)) return curr
      return acc
    }, '')

    return getPriority(common)
  })

  const sum = priorities.reduce((acc, priority) => acc + priority, 0)

  console.log('Part 2 -', sum)
}

const program = () => {
  part1()
  part2()
}

// shzsFcPssFhjFssBz dpRcNHNZrpdJdJVJZ

export default program