describe('tabs', function() {
  var elm, scope;

  // load the tabs code
  beforeEach(module('ui.bootstrap.tabs'));

  // load the templates
  beforeEach(module('template/tabs/tabs.html', 'template/tabs/pane.html'));

  beforeEach(inject(function($rootScope, $compile) {
    // we might move this tpl into an html file as well...
    elm = angular.element(
      '<div>' +
        '<tabs>' +
          '<pane heading="First Tab">' +
            'first content is {{first}}' +
          '</pane>' +
          '<pane heading="Second Tab">' +
            'second content is {{second}}' +
          '</pane>' +
        '</tabs>' +
      '</div>');

    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));


  it('should create clickable titles', inject(function($compile, $rootScope) {
    var titles = elm.find('ul.nav-tabs li a');

    expect(titles.length).toBe(2);
    expect(titles.eq(0).text()).toBe('First Tab');
    expect(titles.eq(1).text()).toBe('Second Tab');
  }));


  it('should bind the content', function() {
    var contents = elm.find('div.tab-content div.tab-pane');

    expect(contents.length).toBe(2);
    expect(contents.eq(0).text()).toBe('first content is ');
    expect(contents.eq(1).text()).toBe('second content is ');

    scope.$apply(function() {
      scope.first = 123;
      scope.second = 456;
    });

    expect(contents.eq(0).text()).toBe('first content is 123');
    expect(contents.eq(1).text()).toBe('second content is 456');
  });


  it('should set active class on title', function() {
    var titles = elm.find('ul.nav-tabs li');

    expect(titles.eq(0)).toHaveClass('active');
    expect(titles.eq(1)).not.toHaveClass('active');
  });


  it('should set active class on content', function() {
    var contents = elm.find('div.tab-content div.tab-pane');

    expect(contents.eq(0)).toHaveClass('active');
    expect(contents.eq(1)).not.toHaveClass('active');
  });

  it('should change active and display on pane when title clicked', function() {
    var titles = elm.find('ul.nav-tabs li');
    var contents = elm.find('div.tab-content div.tab-pane');

    // click the second tab
    titles.eq(1).find('a').click();

    // second title should be active
    expect(titles.eq(0)).not.toHaveClass('active');
    expect(titles.eq(1)).toHaveClass('active');

    // second content should be active and visible
    expect(contents.eq(0)).not.toHaveClass('active');
    expect(contents.eq(0).css('display')).toBe('none');
    expect(contents.eq(1)).toHaveClass('active');
    expect(contents.eq(1).css('display')).not.toBe('none');
  });
});


describe('remote selection', function() {
  var elm, scope;

  // load the tabs code
  beforeEach(module('ui.bootstrap.tabs'));

  // load the templates
  beforeEach(module('template/tabs/tabs.html', 'template/tabs/pane.html'));

  beforeEach(inject(function($rootScope, $compile) {
    // we might move this tpl into an html file as well...
    elm = angular.element(
      '<div>' +
        '<tabs>' +
          '<pane ng-repeat="pane in panes" active="pane.active" heading="pane.title">' +
            '{{pane.content}}}' +
          '</pane>' +
        '</tabs>' +
      '</div>'
    );
    scope = $rootScope;
    scope.panes = [
      { title:"Dynamic Title 1", content:"Dynamic content 1", active:true},
      { title:"Dynamic Title 2", content:"Dynamic content 2" }
    ];

    $compile(elm)(scope);
    scope.$digest();
  }));

  it('should handle select attribute when select/deselect', function() {
    var titles = elm.find('ul.nav-tabs li');
    scope.$apply('panes[1].active=true');
    expect(titles.eq(1)).toHaveClass('active');

    titles.eq(0).find('a').click();
    
    expect(scope.panes[1].active).toBe(false);
  });

  it('should select last active tab when multiple panes evaluate to active=true', function() {
    var titles = elm.find('ul.nav-tabs li');
    scope.$apply('panes[0].active=true;panes[1].active=true');
    expect(titles.eq(1)).toHaveClass('active');
  });

  it('should deselect all panes when all atrributes set to false', function() {
    var titles = elm.find('ul.nav-tabs li');
    scope.$apply('panes[0].active=false');
    expect(titles.eq(0)).not.toHaveClass('active');
    expect(titles.eq(1)).not.toHaveClass('active');
  });
});

describe('tabs controller', function() {
  var scope, ctrl;

  beforeEach(module('ui.bootstrap.tabs'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope;

    // instantiate the controller stand-alone, without the directive
    ctrl = $controller('TabsController', {$scope: scope, $element: null});
  }));


  describe('select', function() {

    it('should mark given pane selected', function() {
      var pane = {};

      scope.select(pane);
      expect(pane.selected).toBe(true);
    });


    it('should deselect other panes', function() {
      var pane1 = {}, pane2 = {}, pane3 = {};

      ctrl.addPane(pane1);
      ctrl.addPane(pane2);
      ctrl.addPane(pane3);

      scope.select(pane1);
      expect(pane1.selected).toBe(true);
      expect(pane2.selected).toBe(false);
      expect(pane3.selected).toBe(false);

      scope.select(pane2);
      expect(pane1.selected).toBe(false);
      expect(pane2.selected).toBe(true);
      expect(pane3.selected).toBe(false);

      scope.select(pane3);
      expect(pane1.selected).toBe(false);
      expect(pane2.selected).toBe(false);
      expect(pane3.selected).toBe(true);
    });
  });


  describe('addPane', function() {

    it('should append pane', function() {
      var pane1 = {}, pane2 = {};

      expect(scope.panes).toEqual([]);

      ctrl.addPane(pane1);
      expect(scope.panes).toEqual([pane1]);

      ctrl.addPane(pane2);
      expect(scope.panes).toEqual([pane1, pane2]);
    });


    it('should select the first one', function() {
      var pane1 = {}, pane2 = {};

      ctrl.addPane(pane1);
      expect(pane1.selected).toBe(true);

      ctrl.addPane(pane2);
      expect(pane1.selected).toBe(true);
    });
  });
});

describe('remove tabs', function() {

  beforeEach(module("ui.bootstrap.tabs", "template/tabs/tabs.html", "template/tabs/pane.html"));

  it('should remove title panes when elements are destroyed and change selection', inject(function($controller, $compile, $rootScope) {
    var scope = $rootScope;
    var elm = $compile("<tabs><pane heading='1'>Hello</pane><pane ng-repeat='i in list' heading='tab {{i}}'>content {{i}}</pane></tabs>")(scope);
    scope.$apply();

    function titles() {
      return elm.find('ul.nav-tabs li');
    }
    function panes() {
      return elm.find('div.tab-pane');
    }

    expect(titles().length).toBe(1);
    expect(panes().length).toBe(1);

    scope.$apply('list = [1,2,3]');
    expect(titles().length).toBe(4);
    expect(panes().length).toBe(4);
    titles().find('a').eq(3).click();
    expect(panes().eq(3)).toHaveClass('active');
    expect(panes().eq(3).text().trim()).toBe('content 3');
    expect(titles().eq(3)).toHaveClass('active');
    expect(titles().eq(3).text().trim()).toBe('tab 3');

    scope.$apply('list = [1,2]');
    expect(panes().length).toBe(3);
    expect(titles().length).toBe(3);
    expect(panes().eq(2)).toHaveClass('active');
    expect(panes().eq(2).text().trim()).toBe('content 2');
    expect(titles().eq(2)).toHaveClass('active');
    expect(titles().eq(2).text().trim()).toBe('tab 2');
  }));

});

