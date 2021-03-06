class MarkdownRenderer {
    constructor() {
        this.markdown = '';
    }

    propertyHeading(propertyName, propertyTypes, propertyFormat, level = 0) {
        let heading = propertyName;
        if (propertyTypes.length) {
            heading += ' (' + propertyTypes.map(propertyType => '`' + propertyType + '`').join(' | ') + ')'
        }
        if (propertyFormat) {
            heading += ' (`' + propertyFormat + '`)'
        }
        this.heading(heading, level);
    }

    heading(text, level = 0) {
        this.markdown += `${'#'.repeat(level + 1)} ${text}\n\n`;
        return this;
    }

    inlineCode(example) {
        this.markdown += '`' + JSON.stringify(example, null, 4) + '`';
        return this;
    }

    codeBlock(example, type = 'json') {
        this.markdown += '```' + type + '\n' + JSON.stringify(example, null, 4) + '\n```\n\n';
        return this;
    }

    summary(text) {
        this.markdown += `${text}\n\n`;
        return this;
    }

    paragraph(text) {
        this.markdown += `${text}\n\n`;
        return this;
    }

    enumList(entries) {
        this.markdown += `${entries.map(value => `- \`${value}\``).join('\n')}\n\n`;
        return this;
    }

    exampleList(examples, type) {
        if (examples.length === 0) {
            return;
        }
        for (let i = 0; i < examples.length; ++i) {
            this.codeBlock(examples[i], type);
        }
        this.markdown += '';
    }

    inlineExampleList(examples) {
        if (examples.length === 0) {
            return;
        }
        this.inlineCode(examples[0]);
        for (let i = 1; i < examples.length; ++i) {
            this.markdown += ', ';
            this.inlineCode(examples[i]);
        }
        this.markdown += '\n\n';
    }

    render() {
        return this.markdown;
    }
}

module.exports = MarkdownRenderer;
