require('../../template/timepicker/timepicker.html.js');
require('./timepicker');

var MODULE_NAME = 'ui.bootstrap.module.timepicker';

angular.module(MODULE_NAME, ['ui.bootstrap.timepicker', 'uib/template/timepicker/timepicker.html']);

module.exports = MODULE_NAME;
