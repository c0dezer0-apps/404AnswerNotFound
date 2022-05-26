const moment = require('moment')

const generateCounterId = prevId => prevId ? prevId + 1 : 1;
const generateDateId = () => `${moment().format('YYYYMMDDhhmmss')}`;

module.exports = { generateCounterId, generateDateId };
