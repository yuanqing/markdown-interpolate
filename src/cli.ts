#!/usr/bin/env node
import * as sade from 'sade'

import { markdownInterpolate } from './markdown-interpolate'

sade('markdown-interpolate <pattern>', true)
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
      await markdownInterpolate(
        pattern,
        typeof options.base === 'undefined' ? null : options.base
      )
    } catch (error) {
      console.error(`markdown-interpolate: ${error.message}`) // eslint-disable-line no-console
    }
  })
  .parse(process.argv)
