# markdown-interpolate-files [![npm Version](https://img.shields.io/npm/v/markdown-interpolate-files?cacheSeconds=1800)](https://www.npmjs.com/package/markdown-interpolate-files) [![build](https://github.com/yuanqing/markdown-interpolate-files/workflows/build/badge.svg)](https://github.com/yuanqing/markdown-interpolate-files/actions?query=workflow%3Abuild) ![stability experimental](https://img.shields.io/badge/stability-experimental-red)

> Interpolate files or the output of scripts into Markdown

## Usage

Given the following toy `README.md` file:

```md
# Example

<!-- execute: foo.md -->
<!-- end -->

<!-- include: bar.ts -->
<!-- end -->
```

…with `foo.md`:

```md
foo
```

…and `bar.ts`:

```ts
async function main () {
  console.log('bar')
}
main()
```

Do:

```
$ npx markdown-interpolate-files README.md
```

This will:

1. Execute `foo.ts` and interpolate its `stdout` into `README.md`.
2. Interpolate the contents of `bar.md` into `README.md`.

`README.md` will then be updated as follows:

```md
# Example

<!-- execute: foo.ts -->
foo
<!-- end -->

<!-- include: bar.md -->
bar
<!-- end -->
```

Run `markdown-interpolate-files` again to update the content between each pair of opening/closing HTML comments.

Note that files/scripts are always resolved *relative to the Markdown file*. Use the `--base` flag to set the base directory to resolve files/scripts.

## CLI

```
$ npx markdown-interpolate-files --help

  Description
    Interpolate files or the output of scripts into Markdown

  Usage
    $ markdown-interpolate-files <pattern> [options]

  Options
    -b, --base       Base directory to resolve files or scripts
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ markdown-interpolate-files --root scripts

```

## License

[MIT](/LICENSE.md)
