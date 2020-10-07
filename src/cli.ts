#!/usr/bin/env node
import * as sade from 'sade'

import { markdownInterpolateFiles } from './markdown-interpolate-files'

sade('markdown-interpolate-files <pattern>', true)
  .describe('Interpolate files or the output of scripts into Markdown')
  .option('-b, --base', 'Base directory to resolve files or scripts')
  .example('--base scripts')
  .action(async function (
    pattern: string,
    options: {
      base: null | string
    }
  ) {
    try {
      await markdownInterpolateFiles(
        pattern,
        typeof options.base === 'undefined' ? null : options.base
      )
    } catch (error) {
      console.error(`markdown-interpolate-files: ${error.message}`) // eslint-disable-line no-console
    }
  })
  .parse(process.argv)
