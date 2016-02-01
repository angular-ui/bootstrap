require('../../template/tabs/tab.html.js');
require('../../template/tabs/tabset.html.js');
require('./tabs');

var MODULE_NAME = 'ui.bootstrap.module.tabs';

angular.module(MODULE_NAME, ['ui.bootstrap.tabs', 'uib/template/tabs/tab.html', 'uib/template/tabs/tabset.html']);

module.exports = MODULE_NAME;
