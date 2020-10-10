# markdown-interpolate [![npm Version](https://img.shields.io/npm/v/markdown-interpolate?cacheSeconds=1800)](https://www.npmjs.com/package/markdown-interpolate) [![build](https://github.com/yuanqing/markdown-interpolate/workflows/build/badge.svg)](https://github.com/yuanqing/markdown-interpolate/actions?query=workflow%3Abuild)

> Interpolate the output of shell commands into Markdown

- Useful for inlining entire files (eg. `cat file.md`) or inserting dynamically-generated documentation (eg. `node script.js`) into Markdown

## Usage

Given the following toy `README.md` file:

```md
# Example

<!-- markdown-interpolate: cat file.md -->
<!-- end -->

<!-- ```json markdown-interpolate: node script.js -->
<!-- ``` end -->
```

…with the following `file.md`:

```md
foo
```

…and `script.js`:

```js
console.log('{ "bar": 42 }')
```

Do:

```
$ npx markdown-interpolate README.md
```

This will execute the shell commands marked by each **`markdown-interpolate:`** HTML comment, and interpolate the `stdout` between each corresponding pair of **`markdown-interpolate:`** and **`end`** HTML comments.

Our `README.md` will then be as follows:

````md
# Example

<!-- markdown-interpolate: cat file.md -->
foo
<!-- end -->

<!-- ```json markdown-interpolate: node script.js -->
```json
{ "bar": 42 }
```
<!-- ``` end -->
````

See that:

- Specify a string (eg. <code>```json</code>) before **`markdown-interpolate:`** to insert it *before* the shell command’s `stdout`.
- Specify a string (eg. <code>```</code>) before **`end`** to insert it *after* the shell command’s `stdout`.

If `file.md` or `script.js` was changed, simply execute `npx markdown-interpolate README.md` again to automatically update `README.md`.

## Installation

```
$ npm install --dev markdown-interpolate
```

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
