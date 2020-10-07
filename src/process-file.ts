import * as execa from 'execa'
import * as findUp from 'find-up'
import * as fs from 'fs-extra'
import * as path from 'path'

const jsRegex = /\.jsx?$/
const tsRegex = /\.tsx?$/

export async function processFile(file: string): Promise<string> {
  if (jsRegex.test(file) === true) {
    const { stdout } = await execa('node', [file])
    return trimTrailingNewline(stdout)
  }
  if (tsRegex.test(file) === true) {
    const tsNodePath = await findUp(
      path.join('node_modules', '.bin', 'ts-node')
    )
    if (typeof tsNodePath === 'undefined') {
      throw new Error('Cannot find `ts-node`')
    }
    const { stdout } = await execa(tsNodePath, [file])
    return trimTrailingNewline(stdout)
  }
  return trimTrailingNewline(await fs.readFile(file, 'utf8'))
}

function trimTrailingNewline(string: string): string {
  return string[string.length - 1] === '\n' ? string.slice(0, string.length - 1) : string
}
