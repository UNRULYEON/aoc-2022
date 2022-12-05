import { getDayInput } from "../../utils/index.ts"

const rawInput = getDayInput(5)

const createStacks = (rawStacks: string[]) => {
  const stacks: string[][] = []

  rawStacks.reverse().map((line, index) => {
    if (index === 0) {
      line
        .split('')
        .filter(c => c !== ' ')
        .map(_ => stacks.push([]))
    } else {
      line
        .split('')
        .reduce<string[][]>((acc, curr, i) => {
          if (i % 4 === 3) return [...acc, ['']]

          const newAcc = [...acc]
          const last = newAcc.pop()

          return [...newAcc, [last![0] + curr]]
        }, [['']])
        .flat()
        .map(c => c.trim())
        .map((c, i) => {
          if (c.length > 0) stacks[i].push(c[1])
        })
    }
  })

  return stacks
}

const createCommands = (rawCommands: string[]) => rawCommands.map(c => {
  const [_move, amount, _from, source, _to, destination] = c.split(' ')

  return ({
    amount: Number(amount),
    source: Number(source) - 1,
    destination: Number(destination) - 1,
  })
})

const part1 = () => {
  const input = rawInput
    .split('\n\n')
    .map(i => i.split('\n'))

  const stacks = createStacks(input[0])
  const commands = createCommands(input[1])

  commands.map(c => {
    const { amount, destination, source } = c

    for (let i = 0; i < amount; i++) {
      const sourceStack = stacks[source]
      const destinationStack = stacks[destination]

      const crates = sourceStack.splice(sourceStack.length - 1, 1)

      destinationStack.push(...crates)
    }

  })

  const result = stacks.reduce((acc, stack) => acc + stack[stack.length - 1], '')

  console.log('Part 1 -', result)
}

const part2 = () => {
  const input = rawInput
    .split('\n\n')
    .map(i => i.split('\n'))

  const stacks = createStacks(input[0])
  const commands = createCommands(input[1])

  commands.map(c => {
    const { amount, destination, source } = c

    const sourceStack = stacks[source]
    const destinationStack = stacks[destination]

    const crates = sourceStack.splice(sourceStack.length - amount, amount)

    destinationStack.push(...crates)
  })

  const result = stacks.reduce((acc, stack) => acc + stack[stack.length - 1], '')

  console.log('Part 2 -', result)
}

const program = () => {
  part1()
  part2()
}

export default program