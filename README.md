# JSON Schema documentation generator

Basic tool used to generate human-readable [Markdown](https://daringfireball.net/projects/markdown/syntax) documentation
from a [JSON Schema](http://json-schema.org/) Validation file. Can be used as a standalone CLI-tool, or imported into
an existing JavaScript-project.

Currently, only a small part of the standard is supported.

## Preview

[Configuration.md](Configuration.md) is generated from `config.schema.json` in this repository.

## Installation

```
npm install -g json-schema-gendoc
```

## Usage

Use the following command to genearate a Markdown document from a [JSON Schema](http://json-schema.org/) Validation file.

```
json-schema-gendoc /path/to/json-schema-file.json
```

## Configuration

json-schema-gendoc can be configured using by creating a file named `.json-schema-gendoc.json` in the current working directory. The
default configuration is included below. All properties are optional. Use `translations` to translate standard messages into your
preferred language if it does not exist in the translations folder (or, even better, create a translation file and send me a PR),
and `schemaFile` to define which file you'd like to generate documentation from.

See [Configuration.md](Configuration.md) for details.

```json
{
    "schemaFile": null,
    "title": null,
    "outputFormat": "markdown",
    "language": "no",
    "translations": {
        "examples": "Examples",
        "properties": "Properties",
        "enum": "Possible values",
        "default": "Default value"
    }
}
```

## Usage without CLI

TODO Document this feature.

See `cli.js` for an example on how this can be used directly.
