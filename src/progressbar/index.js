require('../../template/progressbar/progressbar.html.js');
require('../../template/progressbar/progress.html.js');
require('../../template/progressbar/bar.html.js');
require('./progressbar');

var MODULE_NAME = 'ui.bootstrap.module.progressbar';

angular.module(MODULE_NAME, ['ui.bootstrap.progressbar', 'uib/template/progressbar/progressbar.html', 'uib/template/progressbar/progress.html', 'uib/template/progressbar/bar.html']);

module.exports = MODULE_NAME;
