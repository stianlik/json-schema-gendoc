# Configuration

You can use the configuration file `.json-schema-gendoc.json` to set project-specific default values for the generator.

## Properties

### schemaFile (`string` | `null`)

Schema file to process if the command is executed with no arguments.

#### Default value

```json
null
```

#### Examples

```json
"book.schema.json"
```

```json
"person.schema.json"
```

### title (`string`)

Override the document title. If this is unspecified, the filename (except `.json` is used).

#### Examples

```json
"Book"
```

```json
"Person"
```

### outputFormat (`string`)

Document type to generate. Currently we only support Markdown.

Possible values:

- `markdown`

#### Default value

```json
"markdown"
```

#### Examples

```json
"markdown"
```

### language (`string`)

Language or messages used in document

Possible values:

- `en`
- `no`

#### Default value

```json
"en"
```

#### Examples

```json
"en"
```

```json
"no"
```

### translations (`object`)

Translate messages used in the document by specifying a mapping.

#### Examples

```json
{
    "examples": "Look, we have examples!",
    "properties": "Available properties",
    "enum": "Possible values",
    "default": "Default value",
    "required": "cannot omit"
}
```

#### Properties

##### examples _required_ (`string`)

Examples heading

###### Default value

```json
"Examples"
```

##### properties _required_ (`string`)

Properties heading

###### Default value

```json
"Properties"
```

##### enum _required_ (`string`)

Enum heading

###### Default value

```json
"Possible values"
```

##### default _required_ (`string`)

Default value heading

###### Default value

```json
"Default value"
```

##### required _required_ (`string`)

Indicates that a property is required

###### Default value

```json
"required"
```

