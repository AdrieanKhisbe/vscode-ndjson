# vscode-ndjson
> Vscode extension to support [NDJSON (newline delimited Json)](http://ndjson.org/) files

[![Version](https://vsmarketplacebadge.apphb.com/version/AdrieanKhisbe.vscode-ndjson.svg)](https://marketplace.visualstudio.com/items?itemName=AdrieanKhisbe.vscode-ndjson.svg)

This was forked from [NDJSON Colorizer](https://marketplace.visualstudio.com/items?itemName=buster.ndjson-colorizer)

## With :)

![](./images/after.png)

## Without :(

![](./images/before.png)

## Configuration

* By default only `*.ndjson` files are colorized.
* You can update your settings file(s) as needed, using `"files.associations"`:

```json
{
  // ...

  "files.associations": {
    "*.db": "ndjson",
    "*.jsonl": "ndjson",
    "*.njson": "ndjson"
  }
}
```
