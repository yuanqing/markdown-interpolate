#!/usr/bin/env node
import * as sade from 'sade'

import { markdownInterpolate } from './markdown-interpolate'

sade('markdown-interpolate <pattern>', true)
  .describe('Interpolate the output of shell commands into Markdown')
  .action(async function (pattern: string) {
    try {
      await markdownInterpolate(pattern)
    } catch (error) {
      console.error(`markdown-interpolate: ${error.message}`) // eslint-disable-line no-console
    }
  })
  .parse(process.argv)
