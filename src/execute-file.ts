import * as execa from 'execa'
import * as findUp from 'find-up'
import * as path from 'path'

const jsRegex = /\.jsx?$/
const tsRegex = /\.tsx?$/

export async function executeFile(file: string): Promise<string> {
  if (jsRegex.test(file) === true) {
    const { stdout } = await execa('node', [file])
    return stdout
  }
  if (tsRegex.test(file) === true) {
    const tsNodePath = await findUp(
      path.join('node_modules', '.bin', 'ts-node')
    )
    if (typeof tsNodePath === 'undefined') {
      throw new Error('Cannot find `ts-node`')
    }
    const { stdout } = await execa(tsNodePath, [file])
    return stdout
  }
  const { stdout } = await execa(file)
  return stdout
}
