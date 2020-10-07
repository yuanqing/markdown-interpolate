#!/usr/bin/env node
import * as sade from 'sade'

import { markdownInterpolateFiles } from './markdown-interpolate-file'

sade('markdown-interpolate-files <pattern>', true)
  .describe('Interpolate files or the output of scripts into Markdown')
  .option('-r, --root', 'Directory to resolve included files')
  .example('--root scripts')
  .action(async function (
    pattern: string,
    options: {
      root: null | string
    }
  ) {
    await markdownInterpolateFiles(
      pattern,
      typeof options.root === 'undefined' ? null : options.root
    )
  })
  .parse(process.argv)
