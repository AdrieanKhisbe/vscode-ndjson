# vscode-ndjson
> Vscode extension to support [NDJSON (newline delimited Json)](http://ndjson.org/) files

[![Version](https://vsmarketplacebadge.apphb.com/version/adrieankhisbe.vscode-ndjson.svg)](https://marketplace.visualstudio.com/items?itemName=adrieankhisbe.vscode-ndjson)
[![Build Status](https://travis-ci.com/AdrieanKhisbe/vscode-ndjson.svg?branch=master)](https://travis-ci.com/AdrieanKhisbe/vscode-ndjson)

This was forked from [NDJSON Colorizer](https://marketplace.visualstudio.com/items?itemName=buster.ndjson-colorizer)

## With :)

![With ndjson syntax highlight](./resources/screenshots/after.png)

## Without :(

![Without ndjson](./resources/screenshots/before.png)

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
