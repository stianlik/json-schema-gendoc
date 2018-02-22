const SchemaType = require('./SchemaType');
const SyntaxType = require('./SyntaxType');

class SchemaTransformer {
    constructor(renderer, messages) {
        this.messages = messages;
        this.renderer = renderer;
    }

    transform(schema, propertyName, level = 0, isRequired = false) {
        if (propertyName !== null) {
            this.renderer.propertyHeading(
                propertyName + (isRequired ? ` _${this.messages.translate('required')}_` : ''),
                schema.hasOwnProperty(SchemaType.TYPE) ? Array.isArray(schema[SchemaType.TYPE]) ? schema[SchemaType.TYPE] : [ schema[SchemaType.TYPE] ] : [],
                schema[SchemaType.FORMAT],
                level
            );
            if (schema.hasOwnProperty(SchemaType.TITLE)) {
                this.renderer.summary(schema.title);
            }
        }

        const requiredProperties = schema.hasOwnProperty(SchemaType.REQUIRED) ? schema[SchemaType.REQUIRED] : [];

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

        if (schema.hasOwnProperty(SchemaType.DEFAULT)) {
            this.renderer.heading(this.messages.translate(SchemaType.DEFAULT), level + 1);
            this.renderer.codeBlock(schema[SchemaType.DEFAULT], SyntaxType.JSON);
        }

        if (schema.hasOwnProperty(SchemaType.EXAMPLES)) {
            this.renderer.heading(this.messages.translate(SchemaType.EXAMPLES), level + 1);
            if (SchemaTransformer.shouldRenderInlineExample(schema)) {
                this.renderer.inlineExampleList(schema.examples);
            } else {
                this.renderer.exampleList(schema.examples, SyntaxType.JSON);
            }
        }

        if (schema.hasOwnProperty(SchemaType.ITEMS)) {
            const items = schema[SchemaType.ITEMS];
            if (Array.isArray(items)) {
                for (let i = 0; i < items.length; ++i) {
                    this.transform(items[i], `${propertyName}[${i}]`, level + 1);
                }
            } else {
                this.transform(items, `${propertyName}[]`, level + 1);
            }
        }

        if (schema.hasOwnProperty(SchemaType.PROPERTIES)) {
            this.renderer.heading(this.messages.translate(SchemaType.PROPERTIES), level + 1);
            for (let key in schema.properties) {
                this.transform(schema.properties[key], key, level + 2, requiredProperties.includes(key));
            }
        }

        if (schema.hasOwnProperty(SchemaType.REF)) {
            this.renderer.paragraph(`[${schema.$ref}](${schema.$ref})`)
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
