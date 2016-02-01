require('../collapse');
require('../../template/accordion/accordion-group.html.js');
require('../../template/accordion/accordion.html.js');
require('./accordion');

var MODULE_NAME = 'ui.bootstrap.module.accordion';

angular.module(MODULE_NAME, ['ui.bootstrap.accordion', 'uib/template/accordion/accordion.html', 'uib/template/accordion/accordion-group.html']);

module.exports = MODULE_NAME;
