class Messages {
    constructor(translations) {
        this.translations = translations;
    }

    translate(key) {
        return this.translations.hasOwnProperty(key) ? this.translations[key] : key;
    }
}

module.exports = Messages;
