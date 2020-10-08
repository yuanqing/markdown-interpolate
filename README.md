# markdown-interpolate [![npm Version](https://img.shields.io/npm/v/markdown-interpolate?cacheSeconds=1800)](https://www.npmjs.com/package/markdown-interpolate) [![build](https://github.com/yuanqing/markdown-interpolate/workflows/build/badge.svg)](https://github.com/yuanqing/markdown-interpolate/actions?query=workflow%3Abuild)

> Interpolate the output of shell commands into Markdown

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
  console.log('# bar')
}
main()
```

Do:

```
$ npx markdown-interpolate README.md
```

This will execute the shell commands that follow each `markdown-interpolate:` comment in `README.md`, and insert their `stdout` between the respective pair of HTML comments.

So, our `README.md` will be updated as follows:

````md
# Example

<!-- markdown-interpolate: cat foo.md -->
foo
<!-- end -->

<!-- ```md markdown-interpolate: ts-node bar.ts -->
```md
# bar
```
<!-- ``` end -->
````

See that:

- To include a prefix/suffix line before/after the shell command’s `stdout`, specify a string before the `markdown-interpolate:` and corresponding `end` comment.

Suppose if `foo.md` or `bar.ts` was changed, we can simply run the `markdown-interpolate` CLI to automatically update `README.md`.

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
