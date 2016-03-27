require('../tooltip/index-nocss.js');
require('../../template/popover/popover.html.js');
require('../../template/popover/popover-html.html.js');
require('../../template/popover/popover-template.html.js');
require('./popover');

var MODULE_NAME = 'ui.bootstrap.module.popover';

angular.module(MODULE_NAME, ['ui.bootstrap.popover', 'uib/template/popover/popover.html', 'uib/template/popover/popover-html.html', 'uib/template/popover/popover-template.html']);

module.exports = MODULE_NAME;
