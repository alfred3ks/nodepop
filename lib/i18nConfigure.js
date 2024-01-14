const i18n = require('i18n');
const path = require('node:path');

// configure the library instance
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true, // watch for changes in JSON files to reload locale on updates - defaults to false
  syncFiles: true, // sync locale information across all files - defaults to false
  cookie: 'nodepop-locale',
});

// to use a scripts
i18n.setLocale('es');

module.exports = i18n;
