require('../../template/alert/alert.html.js');
require('./alert');

var MODULE_NAME = 'ui.bootstrap.module.alert';

angular.module(MODULE_NAME, ['ui.bootstrap.alert', 'uib/template/alert/alert.html']);

module.exports = MODULE_NAME;
