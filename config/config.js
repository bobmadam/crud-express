/* eslint-disable import/no-extraneous-dependencies */
const nconf = require('nconf')

nconf.argv().env()

nconf.file('defaults', {
  file: `${process.cwd()}/config/configs.json`,
})

module.exports = nconf
