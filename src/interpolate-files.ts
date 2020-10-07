import * as fs from 'fs-extra'
import * as path from 'path'

import { processFile } from './process-file'

const interpolateRegex = /(<!-- ?start: ?([^ ]+) ?-->\n)[\S\s]*?(\n?<!-- ?end ?-->)/g

export async function interpolateFiles(
  file: string,
  rootDirectory: null | string
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
      rootDirectory === null
        ? path.resolve(path.dirname(file), match[2])
        : path.resolve(rootDirectory, match[2])
    result.push(await processFile(fileToInterpolate))
    result.push(match[3])
    startIndex = match.index + match[0].length
  }
  result.push(string.slice(startIndex))
  await fs.writeFile(file, result.join(''))
}
