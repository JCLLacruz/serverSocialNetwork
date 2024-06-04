const basicInfo = require('./basicInfo.js');
const paths = require('./paths/index.js');
const components = require('./components.js');
module.exports = {
    ...basicInfo,
    ...paths,
    ...components
};
