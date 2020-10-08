import * as fs from 'fs-extra'
import * as path from 'path'

import { executeFile } from './execute-file'

const interpolateRegex = /(<!-- ?(include|execute): ?([^ ]+) ?-->\n)[\S\s]*?(<!-- ?end ?-->)/g

export async function interpolateFiles(
  file: string,
  baseDirectory: null | string
): Promise<void> {
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
    const fileToInterpolate =
      baseDirectory === null
        ? path.resolve(path.dirname(file), match[3])
        : path.resolve(process.cwd(), baseDirectory, match[3])
    result.push(
      trimTrailingNewline(
        match[2] === 'include'
          ? await fs.readFile(fileToInterpolate, 'utf8')
          : await executeFile(fileToInterpolate)
      )
    )
    result.push('\n')
    result.push(match[4])
    startIndex = match.index + match[0].length
  }
  result.push(string.slice(startIndex))
  await fs.writeFile(file, result.join(''))
}

function trimTrailingNewline(string: string): string {
  return string.replace(/\n+$/, '')
}
