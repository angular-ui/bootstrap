require('../paging');
require('../../template/pager/pager.html.js');
require('./pager');

var MODULE_NAME = 'ui.bootstrap.module.pager';

angular.module(MODULE_NAME, ['ui.bootstrap.pager', 'uib/template/pager/pager.html']);

module.exports = MODULE_NAME;
