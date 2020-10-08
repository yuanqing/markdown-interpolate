import * as globby from 'globby'

import { interpolateFiles } from './interpolate-files'

export async function markdownInterpolate(
  pattern: string,
  baseDirectory: null | string
): Promise<void> {
  const files = await globby(pattern)
  if (files.length === 0) {
    throw new Error(`No files matched by pattern: ${pattern}`)
  }
  for (const file of files) {
    await interpolateFiles(file, baseDirectory)
  }
  return
}
