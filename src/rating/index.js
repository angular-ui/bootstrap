require('../../template/rating/rating.html.js');
require('./rating');

var MODULE_NAME = 'ui.bootstrap.module.rating';

angular.module(MODULE_NAME, ['ui.bootstrap.rating', 'uib/template/rating/rating.html']);

module.exports = MODULE_NAME;
