require('../../template/carousel/carousel.html.js');
require('../../template/carousel/slide.html.js');
require('./carousel');

var MODULE_NAME = 'ui.bootstrap.module.carousel';

angular.module(MODULE_NAME, ['ui.bootstrap.carousel', 'uib/template/carousel/carousel.html', 'uib/template/carousel/slide.html']);

module.exports = MODULE_NAME;
