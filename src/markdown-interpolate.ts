import * as execa from 'execa'
import * as fs from 'fs-extra'
import * as globby from 'globby'
import * as path from 'path'

export async function markdownInterpolate(pattern: string): Promise<void> {
  const files = await globby(pattern)
  if (files.length === 0) {
    throw new Error(`No files matched by pattern: ${pattern}`)
  }
  for (const file of files) {
    await interpolateFiles(file)
  }
}

const interpolateRegex = /(<!-- ?(?:([^\n]*?) )?markdown-interpolate: ?([^\n]*?) ?-->\n)[\S\s]*?(<!-- ?(?:([^\n]*?) )?end ?-->)/g

export async function interpolateFiles(file: string): Promise<void> {
  const directory = path.dirname(file)
  const string = await fs.readFile(file, 'utf8')
  const matches = string.matchAll(interpolateRegex)
  if (matches === null) {
    return
  }
  const result = []
  let startIndex = 0
  for (const match of matches) {
    if (typeof match.index === 'undefined') {
      throw new Error('Invariant violation')
    }
    result.push(string.slice(startIndex, match.index))
    result.push(match[1])
    if (typeof match[2] !== 'undefined') {
      result.push(`${match[2]}\n`)
    }
    result.push(
      `${ensureTrailingNewline(await executeCommand(match[3], directory))}`
    )
    if (typeof match[5] !== 'undefined') {
      result.push(`${match[5]}\n`)
    }
    result.push(match[4])
    startIndex = match.index + match[0].length
  }
  result.push(string.slice(startIndex))
  await fs.writeFile(file, result.join(''))
}

function ensureTrailingNewline(string: string): string {
  if (string[string.length - 1] === '\n') {
    return string
  }
  return `${string}\n`
}

export async function executeCommand(
  command: string,
  cwd: string
): Promise<string> {
  const { stdout } = await execa(command, { cwd, shell: true })
  return stdout
}
