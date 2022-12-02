let day = Deno.args[0] as unknown as number | null

if (!day) {
  const promptDay = prompt('Day:')

  day = promptDay && parseInt(promptDay) || parseInt(Deno.args[0])
}

try {
  const module = await import(`./days/${day}/index.ts`)

  console.log(module.default())
} catch (e) {
  console.error(e)
}