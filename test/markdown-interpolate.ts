import * as fs from 'fs-extra'
import * as path from 'path'
import { test } from 'tap'

import { markdownInterpolate } from '../src/markdown-interpolate'

test('invalid pattern', async function (t) {
  t.plan(2)
  process.chdir(path.join(__dirname, 'fixtures', '1-invalid-pattern'))
  t.false(await fs.pathExists('foo'))
  try {
    await markdownInterpolate('foo')
    t.fail()
  } catch {
    t.pass()
  }
})

test('valid pattern', async function (t) {
  t.plan(4)
  process.chdir(path.join(__dirname, 'fixtures', '2-valid-pattern'))
  t.false(await fs.pathExists('README.md'))
  await fs.copy('README-original.md', 'README.md')
  t.true(await fs.pathExists('README.md'))
  await markdownInterpolate('README.md')
  t.equal(
    await fs.readFile('README.md', 'utf8'),
    await fs.readFile('README-expected.md', 'utf8')
  )
  await fs.remove('README.md')
  t.false(await fs.pathExists('README.md'))
})
