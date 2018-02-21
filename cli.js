#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const SchemaTransformer = require('./src/SchemaTransformer');
const Messages = require('./src/Messages');

const CONFIG_FILE = '.json-schema-gendoc.json';
const USAGE = `Usage: ./${path.basename(__filename)} [schema-file.json]`;

// Configuration
let config = {
    outputFormat: 'markdown',
    rendererPath: './src/renderer',
    schemaFile: null,
    title: null,
    translations: {
        'examples': 'Examples',
        'properties': 'Properties',
        'enum': 'Possible values'
    }
};
if (fs.existsSync(CONFIG_FILE)) {
    config = Object.assign(config, JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')))
}

// Command line arguments
for (let i = 2; i < process.argv.length; ++i) {
    if (process.argv[i] === '--help') {
        console.log(USAGE);
        process.exit(0);
    }
}
if (process.argv.length > 2) {
    config.schemaFile = process.argv[2];
}

// Renderer

function createRenderer(format) {
    const className = format.charAt(0).toUpperCase() + format.substr(1) + 'Renderer';
    return new (require(config.rendererPath + '/' + className))();
    if (this.renderers.hasOwnProperty(format)) {
        return new this.renderers[format]();
    }
    throw new Error(`Missing renderer for format '${format}'`);
}

if (config.schemaFile === null) {
    console.log(`Error: Schema file must be specified in ${CONFIG_FILE} or as a command line parameter.\n`);
    console.log(USAGE);
    process.exit(1);
}

process.stdout.write(
    new SchemaTransformer(
        createRenderer(config.outputFormat),
        new Messages(config.translations)
    ).transform(
        JSON.parse(fs.readFileSync(config.schemaFile, 'utf8')),
        config.title === null ? path.basename(config.schemaFile, '.json') : config.title
    )
);
