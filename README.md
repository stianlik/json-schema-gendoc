# JSON Schema documentation generator

Basic tool used to generate human-readable [Markdown](https://daringfireball.net/projects/markdown/syntax) documentation
from a [JSON Schema](http://json-schema.org/) Validation file. Can be used as a standalone CLI-tool, or imported into
an existing JavaScript-project.

Currently, only a small part of the standard is supported.

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
preferred language, and `schemaFile` to define which file you'd like to generate documentation from.

```
{
    "schemaFile": null,
    "outputFormat": 'markdown',
    "rendererPath": './src/renderer',
    "translations": {
        "examples": "Examples",
        'properties": "Properties",
        "enum": "Possible values"
    }
}
```

## Usage without CLI

TODO Document this feature.

See `cli.js` for an example on how this can be used directly.
