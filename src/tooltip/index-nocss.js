require('../position/index-nocss.js');
require('../stackedMap');
require('../../template/tooltip/tooltip-popup.html.js');
require('../../template/tooltip/tooltip-html-popup.html.js');
require('../../template/tooltip/tooltip-template-popup.html.js');
require('./tooltip');

var MODULE_NAME = 'ui.bootstrap.module.tooltip';

angular.module(MODULE_NAME, ['ui.bootstrap.tooltip', 'uib/template/tooltip/tooltip-popup.html', 'uib/template/tooltip/tooltip-html-popup.html', 'uib/template/tooltip/tooltip-template-popup.html']);

module.exports = MODULE_NAME;
