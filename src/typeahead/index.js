require('../debounce');
require('../position');
require('../../template/typeahead/typeahead-match.html.js');
require('../../template/typeahead/typeahead-popup.html.js');
require('./typeahead');

require('./typeahead.css');

var MODULE_NAME = 'ui.bootstrap.module.typeahead';

angular.module(MODULE_NAME, ['ui.bootstrap.typeahead', 'uib/template/typeahead/typeahead-match.html', 'uib/template/typeahead/typeahead-popup.html']);

module.exports = MODULE_NAME;
