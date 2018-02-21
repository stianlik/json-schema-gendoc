const SchemaType = require('./SchemaType');
const SyntaxType = require('./SyntaxType');

class SchemaTransformer {
    constructor(renderer, messages) {
        this.messages = messages;
        this.renderer = renderer;
    }

    transform(schema, propertyName, level = 0) {
        if (propertyName !== null) {
            this.renderer.propertyHeading(propertyName, schema[SchemaType.TYPE], schema[SchemaType.FORMAT], level);
            if (schema.hasOwnProperty(SchemaType.TITLE)) {
                this.renderer.summary(schema.title);
            }
        }

        if (schema.hasOwnProperty(SchemaType.DESCRIPTION)) {
            this.renderer.paragraph(schema.description);
        }

        if (schema.hasOwnProperty(SchemaType.ALL_OF)) {
            for (let key in schema.allOf) {
                this.transform(schema.allOf[key], null, level);
            }
        }

        if (schema.hasOwnProperty(SchemaType.ENUM)) {
            `${this.renderer.paragraph(this.messages.translate(SchemaType.ENUM) + ':')}${this.renderer.enumList(schema.enum)}`;
        }

        if (schema.hasOwnProperty(SchemaType.EXAMPLES)) {
            this.renderer.heading(this.messages.translate(SchemaType.EXAMPLES), level + 1);
            if (SchemaTransformer.shouldRenderInlineExample(schema)) {
                this.renderer.inlineExampleList(schema.examples);
            } else {
                this.renderer.exampleList(schema.examples, SyntaxType.JSON);
            }
        }

        if (schema.hasOwnProperty(SchemaType.PROPERTIES)) {
            this.renderer.heading(this.messages.translate(SchemaType.PROPERTIES), level + 1);
            for (let key in schema.properties) {
                this.transform(schema.properties[key], key, level + 2);
            }
        }

        if (schema.hasOwnProperty(SchemaType.REF)) {
            `[${schema.$ref}](${schema.$ref})\n\n`
        }

        if (schema.hasOwnProperty(SchemaType.DEFINITIONS)) {
            for (let key in schema.definitions) {
                this.transform(schema.definitions[key], key, level);
            }
        }

        return this.renderer.render();
    }

    static shouldRenderInlineExample(schema) {
        return schema.hasOwnProperty("type") && (schema.type === 'integer' || schema.type === 'number' || schema.type === 'boolean' || schema.type === 'null');
    }
}

module.exports = SchemaTransformer;
