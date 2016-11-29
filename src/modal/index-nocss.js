require('../multiMap');
require('../position/index-nocss.js');
require('../stackedMap');
require('../../template/modal/window.html.js');
require('./modal');

var MODULE_NAME = 'ui.bootstrap.module.modal';

angular.module(MODULE_NAME, ['ui.bootstrap.modal', 'uib/template/modal/window.html']);

module.exports = MODULE_NAME;
