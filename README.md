# markdown-interpolate [![npm Version](https://img.shields.io/npm/v/markdown-interpolate?cacheSeconds=1800)](https://www.npmjs.com/package/markdown-interpolate) [![build](https://github.com/yuanqing/markdown-interpolate/workflows/build/badge.svg)](https://github.com/yuanqing/markdown-interpolate/actions?query=workflow%3Abuild)

> Interpolate the output of shell commands into Markdown

- Useful for inlining entire files (eg. `cat foo.md`) or inserting dynamically-generated documentation (eg. `ts-node bar.ts`) into Markdown

## Usage

Given the following toy `README.md` file:

```md
# Example

<!-- markdown-interpolate: cat foo.md -->
<!-- end -->

<!-- ```md markdown-interpolate: ts-node bar.ts -->
<!-- ``` end -->
```

…with the following `foo.md`:

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
$ npx markdown-interpolate README.md
```

This will execute each shell command marked by `markdown-interpolate`, and interpolate their `stdout` between each pair of `markdown-interpolate` and `end` HTML comments. `README.md` will then be updated as follows:

````md
# Example

<!-- markdown-interpolate: cat foo.md -->
foo
<!-- end -->

<!-- ``` markdown-interpolate: ts-node bar.ts -->
```
bar
```
<!-- ``` end -->
````

See that:

- To include a prefix before the shell command’s `stdout`, specify a string (eg. <code>```</code>) before `markdown-interpolate`.
- To include a suffix after the shell command’s `stdout`, specify a string (eg. <code>```</code>) before `end`.

Suppose if `foo.md` or `bar.ts` was changed, simply run the `markdown-interpolate` CLI again to automatically update `README.md`.

## CLI

```
$ npx markdown-interpolate --help

  Description
    Interpolate the output of shell commands into Markdown

  Usage
    $ markdown-interpolate <pattern> [options]

  Options
    -v, --version    Displays current version
    -h, --help       Displays this message

```

## License

[MIT](/LICENSE.md)
