describe('tabs', function() {
  var elm, scope;

  beforeEach(module('ui.bootstrap.tabs'));
  beforeEach(module('uib/template/tabs/tabset.html'));
  beforeEach(module('uib/template/tabs/tab.html'));

  function titles() {
    return elm.find('ul.nav-tabs li');
  }
  function contents() {
    return elm.find('div.tab-content div.tab-pane');
  }

  function expectTitles(titlesArray) {
    var t = titles();
    expect(t.length).toEqual(titlesArray.length);
    for (var i = 0; i < t.length; i++) {
      expect(t.eq(i).text().trim()).toEqual(titlesArray[i]);
    }
  }

  function expectContents(contentsArray) {
    var c = contents();
    expect(c.length).toEqual(contentsArray.length);
    for (var i = 0; i < c.length; i++) {
      expect(c.eq(i).text().trim()).toEqual(contentsArray[i]);
    }
  }

  describe('basics', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.first = '1';
      scope.second = '2';
      scope.third = '3';
      scope.active = 1;
      scope.firstClass = 'first-class';
      scope.secondClass = 'second-class-1 second-class-2';
      scope.selectFirst = jasmine.createSpy();
      scope.selectSecond = jasmine.createSpy();
      scope.deselectFirst = jasmine.createSpy();
      scope.deselectSecond = jasmine.createSpy();
      scope.deselectThird = function($event) {
        $event.preventDefault();
      };
      elm = $compile([
        '<uib-tabset class="hello" data-pizza="pepperoni" active="active">',
        '  <uib-tab index="1" heading="First Tab {{first}}" classes="{{firstClass}}" select="selectFirst($event)" deselect="deselectFirst($event)">',
        '    first content is {{first}}',
        '  </uib-tab>',
        '  <uib-tab index="2" classes="{{secondClass}}" select="selectSecond($event)" deselect="deselectSecond($event)">',
        '    <uib-tab-heading><b>Second</b> Tab {{second}}</uib-tab-heading>',
        '    second content is {{second}}',
        '  </uib-tab>',
        '  <uib-tab index="3" classes="{{thirdClass}}" deselect="deselectThird($event)">',
        '    <uib-tab-heading><b>Second</b> Tab {{third}}</uib-tab-heading>',
        '    third content is {{third}}',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();
      return elm;
    }));

    it('should pass class and other attributes on to tab template', function() {
      expect(elm).toHaveClass('hello');
      expect(elm.attr('data-pizza')).toBe('pepperoni');
      //Ensure that we have bootstrap 4 link class so things are future proofed.
      var link = $(elm.find('a')[0]);
      expect(link).toHaveClass('nav-link');
    });

    it('should create clickable titles', function() {
      var t = titles();
      expect(t.length).toBe(3);
      expect(t.find('> a').eq(0).text()).toBe('First Tab 1');
      //It should put the uib-tab-heading element into the 'a' title
      expect(t.find('> a').eq(1).children().is('uib-tab-heading')).toBe(true);
      expect(t.find('> a').eq(1).children().html()).toBe('<b>Second</b> Tab 2');
    });

    it('should bind tabs content and set first tab active', function() {
      expectContents(['first content is 1', 'second content is 2', 'third content is 3']);
      expect(titles().eq(0)).toHaveClass('active');
      expect(titles().eq(1)).not.toHaveClass('active');
      expect(scope.active).toBe(1);
    });

    it('should set optional classes on each tab', function() {
      expect(titles().eq(0)).toHaveClass(scope.firstClass);

      var secondClassArr = scope.secondClass.split(' ');
      secondClassArr.forEach(function(clazz) {
        expect(titles().eq(1)).toHaveClass(clazz);
      });
    });

    it('should change active on click', function() {
      titles().eq(1).find('> a').click();
      expect(contents().eq(1)).toHaveClass('active');
      expect(titles().eq(0)).not.toHaveClass('active');
      expect(titles().eq(1)).toHaveClass('active');
      expect(scope.active).toBe(2);
    });

    it('should call select callback on select', function() {
      expect(scope.selectFirst.calls.count()).toBe(1);
      titles().eq(1).find('> a').click();
      expect(scope.selectSecond).toHaveBeenCalled();
      expect(scope.selectSecond.calls.argsFor(0)[0].target).toBe(titles().eq(1).find('> a')[0]);
      titles().eq(0).find('> a').click();
      expect(scope.selectFirst).toHaveBeenCalled();
      expect(scope.selectFirst.calls.argsFor(1)[0].target).toBe(titles().eq(0).find('> a')[0]);
    });

    it('should call deselect callback on deselect', function() {
      titles().eq(1).find('> a').click();
      expect(scope.deselectFirst).toHaveBeenCalled();
      expect(scope.deselectFirst.calls.argsFor(0)[0].target).toBe(titles().eq(1).find('> a')[0]);
      titles().eq(0).find('> a').click();
      expect(scope.deselectSecond).toHaveBeenCalled();
      expect(scope.deselectSecond.calls.argsFor(0)[0].target).toBe(titles().eq(0).find('> a')[0]);
      titles().eq(1).find('> a').click();
      expect(scope.deselectFirst.calls.count()).toBe(2);
      expect(scope.deselectFirst.calls.argsFor(1)[0].target).toBe(titles().eq(1).find('> a')[0]);
    });

    it('should prevent tab deselection when $event.preventDefault() is called', function() {
      spyOn(scope, 'deselectThird');
      titles().eq(2).find('> a').click();
      expect(scope.active).toBe(3);
      titles().eq(1).find('> a').click();
      expect(scope.deselectThird).toHaveBeenCalled();
      expect(scope.active).not.toBe(1);
      expect(scope.active).toBe(2);
    });
  });

  describe('basics with initial active tab', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();

      function makeTab(index) {
        return {
          index: index,
          select: jasmine.createSpy()
        };
      }
      scope.tabs = [
        makeTab(1), makeTab(3), makeTab(5), makeTab(7)
      ];
      scope.active = 5;
      elm = $compile([
        '<uib-tabset active="active">',
        '  <uib-tab index="1" select="tabs[0].select()">',
        '  </uib-tab>',
        '  <uib-tab index="3" select="tabs[1].select()">',
        '  </uib-tab>',
        '  <uib-tab index="5" select="tabs[2].select()">',
        '  </uib-tab>',
        '  <uib-tab index="7" select="tabs[3].select()">',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();
    }));

    function expectTabActive(activeTab) {
      var _titles = titles();
      angular.forEach(scope.tabs, function(tab, i) {
        if (activeTab === tab) {
          expect(scope.active).toBe(tab.index);
          //It should only call select ONCE for each select
          expect(tab.select).toHaveBeenCalled();
          expect(_titles.eq(i)).toHaveClass('active');
          expect(contents().eq(i)).toHaveClass('active');
        } else {
          expect(scope.active).not.toBe(tab.index);
          expect(_titles.eq(i)).not.toHaveClass('active');
        }
      });
    }

    it('should make tab titles and set active tab active', function() {
      expect(titles().length).toBe(scope.tabs.length);
      expectTabActive(scope.tabs[2]);
    });
  });

  describe('without active binding and index attributes', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.first = '1';
      scope.second = '2';
      elm = $compile([
        '<uib-tabset>',
        '  <uib-tab heading="First Tab {{first}}">',
        '    first content is {{first}}',
        '  </uib-tab>',
        '  <uib-tab heading="Second Tab {{second}}">',
        '    second content is {{second}}',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();
      return elm;
    }));

    it('should bind tabs content and set first tab active', function() {
      expectContents(['first content is 1', 'second content is 2']);
      expect(titles().eq(0)).toHaveClass('active');
      expect(titles().eq(1)).not.toHaveClass('active');
      expect(elm.controller('uibTabset').active).toBe(0);
    });

    it('should change active on click', function() {
      titles().eq(1).find('> a').click();
      expect(contents().eq(1)).toHaveClass('active');
      expect(titles().eq(0)).not.toHaveClass('active');
      expect(titles().eq(1)).toHaveClass('active');
      expect(elm.controller('uibTabset').active).toBe(1);
    });
  });

  describe('tab callback order', function() {
    var execOrder;
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      execOrder = [];

      scope.execute = function(id) {
        execOrder.push(id);
      };

      elm = $compile([
        '<div>',
        '  <uib-tabset class="hello" data-pizza="pepperoni" active="active">',
        '    <uib-tab index="1" heading="First Tab" select="execute(\'select1\')" deselect="execute(\'deselect1\')"></uib-tab>',
        '    <uib-tab index="2" select="execute(\'select2\')" deselect="execute(\'deselect2\')"></uib-tab>',
        '  </uib-tabset>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();
      return elm;
    }));

    it('should call select  for the first tab', function() {
      expect(execOrder).toEqual([ 'select1' ]);
    });

    it('should call deselect, then select', function() {
      execOrder = [];

      // Select second tab
      titles().eq(1).find('> a').click();
      expect(execOrder).toEqual([ 'deselect1', 'select2' ]);

      execOrder = [];

      // Select again first tab
      titles().eq(0).find('> a').click();
      expect(execOrder).toEqual([ 'deselect2', 'select1' ]);
    });
  });

  describe('custom template', function() {
    var $compile, $templateCache;
    beforeEach(inject(function($rootScope, _$compile_, _$templateCache_) {
      scope = $rootScope;
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    }));

    it('should support custom templates', function() {
      $templateCache.put('foo/bar.html', '<div>baz</div>');

      elm = $compile('<uib-tabset template-url="foo/bar.html"></uib-tabset>')(scope);
      scope.$digest();

      expect(elm.html()).toBe('baz');
    });
  });

  describe('uib-tab', function() {
    var $compile, $templateCache;

    beforeEach(inject(function($rootScope, _$compile_, _$templateCache_) {
      scope = $rootScope;
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    }));

    it('should expose the controller on the view', function() {
      $templateCache.put('uib/template/tabs/tab.html', '<li class="uib-tab">{{tab.text}}</li>');

      elm = $compile('<uib-tabset><uib-tab heading="Tab"></uib-tab></uib-tabset>')(scope);
      scope.$digest();

      var tab = titles().eq(0);
      var ctrl = tab.controller('uibTab');

      expect(ctrl).toBeDefined();

      ctrl.text = 'foo';
      scope.$digest();

      expect(tab.text().trim()).toBe('foo');
    });

    it('should support custom templates', function() {
      $templateCache.put('foo/bar.html', '<li>baz</li>');

      elm = $compile('<uib-tabset><uib-tab template-url="foo/bar.html"></uib-tab></uib-tabset>')(scope);
      scope.$digest();

      var tabTitle = titles().eq(0);

      expect(tabTitle.html()).toBe('baz');
    });
  });

  describe('ng-repeat', function() {
    var $compile, $rootScope;
    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      scope.tabs = [
        makeTab(1), makeTab(3), makeTab(5), makeTab(7)
      ];
      scope.active = 5;
      elm = $compile([
        '<uib-tabset active="active">',
        '  <uib-tab index="t.index" ng-repeat="t in tabs" active="t.active" select="t.select()">',
        '    <uib-tab-heading><b>heading</b> {{index}}</uib-tab-heading>',
        '    content {{$index}}',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();
    }));

    function makeTab(index) {
      return {
        index: index,
        select: jasmine.createSpy()
      };
    }

    function titles() {
      return elm.find('ul.nav-tabs li');
    }
    function contents() {
      return elm.find('div.tab-content div.tab-pane');
    }

    function expectTabActive(activeTab) {
      var _titles = titles();
      angular.forEach(scope.tabs, function(tab, i) {
        if (activeTab === tab) {
          expect(scope.active).toBe(tab.index);
          //It should only call select ONCE for each select
          expect(tab.select).toHaveBeenCalled();
          expect(_titles.eq(i)).toHaveClass('active');
          expect(contents().eq(i).text().trim()).toBe('content ' + i);
          expect(contents().eq(i)).toHaveClass('active');
        } else {
          expect(scope.active).not.toBe(tab.index);
          expect(_titles.eq(i)).not.toHaveClass('active');
        }
      });
    }

    it('should make tab titles and set active tab active', function() {
      expect(titles().length).toBe(scope.tabs.length);
      expectTabActive(scope.tabs[2]);
    });

    it('should switch active when clicking', function() {
      titles().eq(3).find('> a').click();
      expectTabActive(scope.tabs[3]);
    });

    it('should switch active when changing active index', function() {
      scope.$apply('active = 5');
      expectTabActive(scope.tabs[2]);
    });

    it('should deselect all when no tabs are active', function() {
      scope.active = 101;
      scope.$apply();
      expectTabActive(null);
      expect(contents().filter('.active').length).toBe(0);

      scope.active = 5;
      scope.$apply();
      expectTabActive(scope.tabs[2]);
    });

    it('should not select twice', function() {
      elm.remove();
      elm = null;
      scope = $rootScope.$new();

      scope.tabs = [
        makeTab(2), makeTab(3), makeTab(5), makeTab(8)
      ];
      scope.active = 13;
      scope.select = jasmine.createSpy();
      elm = $compile([
        '<uib-tabset active="active">',
        '  <uib-tab index="t.index" ng-repeat="t in tabs" select="t.select()">',
        '    <uib-tab-heading><b>heading</b> {{index}}</uib-tab-heading>',
        '    content {{$index}}',
        '  </uib-tab>',
        '  <uib-tab index="13" select="select()">',
        '    <uib-tab-heading><b>heading</b> foo</uib-tab-heading>',
        '    content foo',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();

      expect(scope.select.calls.count()).toBe(1);
    });
  });

  describe('advanced uib-tab-heading element', function() {
    beforeEach(inject(function($compile, $rootScope, $sce) {
      scope = $rootScope.$new();
      scope.myHtml = $sce.trustAsHtml('<b>hello</b>, there!');
      scope.value = true;
      elm = $compile([
        '<uib-tabset active="active">',
        '  <uib-tab index="0">',
        '    <uib-tab-heading ng-bind-html="myHtml" ng-show="value"></uib-tab-heading>',
        '  </uib-tab>',
        '  <uib-tab index="1"><data-uib-tab-heading>1</data-uib-tab-heading></uib-tab>',
        '  <uib-tab index="2"><div data-uib-tab-heading>2</div></uib-tab>',
        '  <uib-tab index="3"><div uib-tab-heading>3</div></uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();
    }));

    function heading() {
      return elm.find('ul li > a').children();
    }

    it('should create a heading bound to myHtml', function() {
      expect(heading().eq(0).html()).toBe('<b>hello</b>, there!');
    });

    it('should hide and show the heading depending on value', function() {
      expect(heading().eq(0)).not.toBeHidden();
      scope.$apply('value = false');
      expect(heading().eq(0)).toBeHidden();
      scope.$apply('value = true');
      expect(heading().eq(0)).not.toBeHidden();
    });

    it('should have a uib-tab-heading no matter what syntax was used', function() {
      expect(heading().eq(1).text()).toBe('1');
      expect(heading().eq(2).text()).toBe('2');
      expect(heading().eq(3).text()).toBe('3');
    });

  });

  //Tests that http://git.io/lG6I9Q is fixed
  describe('tab ordering', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.tabs = [
        { title:'Title 1', available:true },
        { title:'Title 2', available:true },
        { title:'Title 3', available:true }
      ];
      elm = $compile([
        '<uib-tabset active="active">',
        '  <!-- a comment -->',
        '  <div>div that makes troubles</div>',
        '  <uib-tab index="0" heading="first">First Static</uib-tab>',
        '  <div>another div that may do evil</div>',
        '  <uib-tab index="$index + 1" ng-repeat="tab in tabs | filter:tabIsAvailable" active="tab.active" heading="{{tab.title}}">some content</uib-tab>',
        '  <!-- another comment -->',
        '  <uib-tab heading="mid">Mid Static</uib-tab>',
        '  a text node',
        '  <!-- another comment -->',
        '  <span>yet another span that may do evil</span>',
        '  <uib-tab index="$index + 4" ng-repeat="tab in tabs | filter:tabIsAvailable" heading="Second {{tab.title}}">some content</uib-tab>',
        '  a text node',
        '  <span>yet another span that may do evil</span>',
        '  <!-- another comment -->',
        '  <uib-tab index="7" heading="last">Last Static</uib-tab>',
        '  a text node',
        '  <span>yet another span that may do evil</span>',
        '  <!-- another comment -->',
        '</uib-tabset>'
      ].join('\n'))(scope);

      scope.tabIsAvailable = function(tab) {
        return tab.available;
      };
    }));

    it('should preserve correct ordering', function() {
      function titles() {
        return elm.find('ul.nav-tabs li > a');
      }
      scope.$apply();
      expect(titles().length).toBe(9);
      scope.$apply('tabs[1].available=false');
      scope.$digest();
      expect(titles().length).toBe(7);
      scope.$apply('tabs[0].available=false');
      scope.$digest();
      expect(titles().length).toBe(5);
      scope.$apply('tabs[2].available=false');
      scope.$digest();
      expect(titles().length).toBe(3);
      scope.$apply('tabs[0].available=true');
      scope.$digest();
      expect(titles().length).toBe(5);
      scope.$apply('tabs[1].available=true');
      scope.$apply('tabs[2].available=true');
      scope.$digest();
      expect(titles().length).toBe(9);
      expect(titles().eq(0).text().trim()).toBe('first');
      expect(titles().eq(1).text().trim()).toBe('Title 1');
      expect(titles().eq(2).text().trim()).toBe('Title 2');
      expect(titles().eq(3).text().trim()).toBe('Title 3');
      expect(titles().eq(4).text().trim()).toBe('mid');
      expect(titles().eq(5).text().trim()).toBe('Second Title 1');
      expect(titles().eq(6).text().trim()).toBe('Second Title 2');
      expect(titles().eq(7).text().trim()).toBe('Second Title 3');
      expect(titles().eq(8).text().trim()).toBe('last');
    });
  });

  describe('uib-tabset controller', function() {
    function mockTab(index) {
      return {
        index: index,
        onSelect : angular.noop,
        onDeselect : angular.noop
      };
    }

    var ctrl;
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope;
      //instantiate the controller stand-alone, without the directive
      ctrl = $controller('UibTabsetController', {$scope: scope});
    }));

    describe('select', function() {
      it('should mark given tab selected', function() {
        ctrl.tabs = [
          {
            tab: mockTab(0),
            index: 0
          }
        ];

        ctrl.select(0);
        expect(ctrl.active).toBe(0);
      });


      it('should deselect other tabs', function() {
        var tab1 = mockTab(1), tab2 = mockTab(2), tab3 = mockTab(3);

        ctrl.addTab(tab1);
        ctrl.addTab(tab2);
        ctrl.addTab(tab3);

        ctrl.select(0);
        expect(ctrl.active).toBe(1);

        ctrl.select(1);
        expect(ctrl.active).toBe(2);

        ctrl.select(2);
        expect(ctrl.active).toBe(3);
      });
    });


    describe('addTab', function() {
      it('should append tab', function() {
        var tab1 = mockTab(1), tab2 = mockTab(2);

        expect(ctrl.tabs).toEqual([]);

        ctrl.addTab(tab1);
        expect(ctrl.tabs).toEqual([
          {
            tab: tab1,
            index: 1
          }
        ]);

        ctrl.addTab(tab2);
        expect(ctrl.tabs).toEqual([
          {
            tab: tab1,
            index: 1
          },
          {
            tab: tab2,
            index: 2
          }
        ]);
      });

      it('should select the first one', function() {
        var tab1 = mockTab(1), tab2 = mockTab(2);

        ctrl.addTab(tab1);
        expect(ctrl.active).toBe(1);

        ctrl.addTab(tab2);
        expect(ctrl.active).toBe(1);
      });

      it('should not select first active === false tab as selected', function() {
        var tab = mockTab(0);
        ctrl.active = 1;

        ctrl.addTab(tab);
        expect(ctrl.active).toBe(1);
      });

      it('should retain active state when adding tab of different index', function() {
        var tab1 = mockTab(1), tab2 = mockTab(2);
        ctrl.active = 2;
        ctrl.addTab(tab1);
        expect(ctrl.active).toBe(2);

        ctrl.addTab(tab2);
        expect(ctrl.active).toBe(2);
      });
    });
  });

  describe('remove', function() {
    it('should remove title tabs when elements are destroyed and change selection', inject(function($controller, $compile, $rootScope) {
      scope = $rootScope.$new();
      elm = $compile('<uib-tabset active="active"><uib-tab index="0" heading="1">Hello</uib-tab><uib-tab index="$index + 1" ng-repeat="i in list" heading="tab {{i}}">content {{i}}</uib-tab></uib-tabset>')(scope);
      scope.$apply();

      expectTitles(['1']);
      expectContents(['Hello']);

      scope.$apply('list = [1,2,3]');
      expectTitles(['1', 'tab 1', 'tab 2', 'tab 3']);
      expectContents(['Hello', 'content 1', 'content 2', 'content 3']);

      // Select last tab
      titles().find('> a').eq(3).click();
      expect(contents().eq(3)).toHaveClass('active');
      expect(titles().eq(3)).toHaveClass('active');

      // Remove last tab
      scope.$apply('list = [1,2]');
      expectTitles(['1', 'tab 1', 'tab 2']);
      expectContents(['Hello', 'content 1', 'content 2']);

      // "tab 2" is now selected
      expect(titles().eq(2)).toHaveClass('active');
      expect(contents().eq(2)).toHaveClass('active');

      // Select 2nd tab ("tab 1")
      titles().find('> a').eq(1).click();
      expect(titles().eq(1)).toHaveClass('active');
      expect(contents().eq(1)).toHaveClass('active');

      // Remove 2nd tab
      scope.$apply('list = [2]');
      expectTitles(['1', 'tab 2']);
      expectContents(['Hello', 'content 2']);

      // New 2nd tab is now selected
      expect(titles().eq(1)).toHaveClass('active');
      expect(contents().eq(1)).toHaveClass('active');
    }));

    it('should use updated index in tab', inject(function($controller, $compile, $rootScope) {
      scope = $rootScope.$new();
      elm = $compile('<uib-tabset active="active"><uib-tab index="0" heading="1">Hello</uib-tab><uib-tab index="$index + 1" ng-repeat="i in list" heading="tab {{i}}">content {{i}}</uib-tab></uib-tabset>')(scope);
      scope.$apply();

      scope.$apply('list = [1,2,3]');
      expectTitles(['1', 'tab 1', 'tab 2', 'tab 3']);
      expectContents(['Hello', 'content 1', 'content 2', 'content 3']);

      // Remove middle "tab 2" tab
      scope.$apply('list = [1,3]');
      expectTitles(['1', 'tab 1', 'tab 3']);
      expectContents(['Hello', 'content 1', 'content 3']);

      // Remove last "tab 3" tab
      scope.$apply('list = [1]');
      expectTitles(['1', 'tab 1']);
      expectContents(['Hello', 'content 1']);

      // Select first tab
      titles().find('> a').eq(0).click();
      expect(titles().eq(0)).toHaveClass('active');
      expect(contents().eq(0)).toHaveClass('active');
    }));

    it('should not select tabs when being destroyed', inject(function($controller, $compile, $rootScope) {
      var selectList = [],
        deselectList = [],
        getTab = function(index) {
          return {
            index: index,
            select: function() {
              selectList.push('select');
            },
            deselect: function() {
              deselectList.push('deselect');
            }
          };
        };

      scope = $rootScope.$new();
      scope.tabs = [
        getTab(0),
        getTab(1)
      ];
      scope.active = 1;
      elm = $compile([
        '<uib-tabset active="active">',
        '  <uib-tab index="$index" ng-repeat="t in tabs" active="t.active" select="t.select()" deselect="t.deselect()">',
        '    <uib-tab-heading><b>heading</b> {{index}}</uib-tab-heading>',
        '    content {{$index}}',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();

      // The first tab is selected the during the initial $digest.
      expect(selectList.length).toEqual(1);

      // Destroy the tabs - we should not trigger selection/deselection any more.
      scope.$destroy();
      expect(selectList.length).toEqual(1);
      expect(deselectList.length).toEqual(0);
    }));
  });

  describe('disable', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();

      function makeTab(disable, index) {
        return {
          index: index,
          select: jasmine.createSpy(),
          disable: disable
        };
      }
      scope.tabs = [
        makeTab(false, 0), makeTab(true, 1), makeTab(false, 2), makeTab(true, 3)
      ];
      scope.active = 1;
      elm = $compile([
        '<uib-tabset active="active">',
        '  <uib-tab index="$index" ng-repeat="t in tabs" select="t.select()" disable="t.disable">',
        '    <uib-tab-heading><b>heading</b> {{index}}</uib-tab-heading>',
        '    content {{$index}}',
        '  </uib-tab>',
        '</uib-tabset>'
      ].join('\n'))(scope);
      scope.$apply();
    }));

    function expectTabActive(activeTab) {
      var _titles = titles();
      angular.forEach(scope.tabs, function(tab, i) {
        if (activeTab === tab) {
          expect(scope.active).toBe(tab.index);
          expect(tab.select.calls.count()).toBe(tab.disable ? 0 : 1);
          expect(_titles.eq(i)).toHaveClass('active');
          expect(contents().eq(i).text().trim()).toBe('content ' + i);
          expect(contents().eq(i)).toHaveClass('active');
        } else {
          expect(scope.active).not.toBe(tab.index);
          expect(_titles.eq(i)).not.toHaveClass('active');
        }
      });
    }

    it('should not switch active when clicking on title', function() {
      titles().eq(2).find('> a').click();
      expectTabActive(scope.tabs[2]);

      titles().eq(3).find('> a').click();
      expectTabActive(scope.tabs[2]);
    });

    it('should toggle between states', function() {
      expect(titles().eq(3)).toHaveClass('disabled');
      scope.$apply('tabs[3].disable = false');
      expect(titles().eq(3)).not.toHaveClass('disabled');

      expect(titles().eq(2)).not.toHaveClass('disabled');
      scope.$apply('tabs[2].disable = true');
      expect(titles().eq(2)).toHaveClass('disabled');
    });
  });

  describe('vertical', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.vertical = true;
      elm = $compile('<uib-tabset vertical="vertical"></uib-tabset>')(scope);
      scope.$apply();
    }));

    it('to stack tabs', function() {
      expect(elm.find('ul.nav-tabs')).toHaveClass('nav-stacked');
    });
  });

  describe('justified', function() {
      beforeEach(inject(function($compile, $rootScope) {
          scope = $rootScope.$new();
          scope.justified = true;
          elm = $compile('<uib-tabset justified="justified"></uib-tabset>')(scope);
          scope.$apply();
      }));

      it('to justify tabs', function() {
          expect(elm.find('ul.nav-tabs')).toHaveClass('nav-justified');
      });
  });

  describe('type', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.navType = 'pills';

      elm = $compile('<uib-tabset type="{{navType}}"></uib-tabset>')(scope);
      scope.$apply();
    }));

    it('to show pills', function() {
      expect(elm.find('ul')).toHaveClass('nav-pills');
      expect(elm.find('ul')).not.toHaveClass('nav-tabs');
    });
  });

  //https://github.com/angular-ui/bootstrap/issues/524
  describe('child compilation', function() {
    var elm;
    beforeEach(inject(function($compile, $rootScope) {
      elm = $compile('<uib-tabset><uib-tab><div></div></uib-tab></uib-tabset></div>')($rootScope.$new());
      $rootScope.$apply();
    }));

    it('should hookup the tab\'s children to the tab with $compile', function() {
      var tabChild = $('.tab-pane', elm).children().first();
      expect(tabChild.inheritedData('$uibTabsetController')).toBeTruthy();
    });
  });

  //https://github.com/angular-ui/bootstrap/issues/631
  describe('ng-options in content', function() {
    var elm;
    it('should render correct amount of options', inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();
      elm = $compile('<uib-tabset><uib-tab><select ng-model="foo" ng-options="i for i in [1,2,3]"></uib-tab></uib-tabset>')(scope);
      scope.$apply();

      var select = elm.find('select');
      scope.$apply();
      expect(select.children().length).toBe(4);
    }));
  });

  //https://github.com/angular-ui/bootstrap/issues/599
  describe('ng-repeat in content', function() {
    var elm;
    it('should render ng-repeat', inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();
      scope.tabs = [
        {title:'a', array:[1,2,3]},
        {title:'b', array:[2,3,4]},
        {title:'c', array:[3,4,5]}
      ];
      elm = $compile('<div><uib-tabset>' +
        '<uib-tab ng-repeat="tab in tabs" heading="{{tab.title}}">' +
          '<uib-tab-heading>{{$index}}</uib-tab-heading>' +
          '<span ng-repeat="a in tab.array">{{a}},</span>' +
        '</uib-tab>' +
      '</uib-tabset></div>')(scope);
      scope.$apply();

      var contents = elm.find('.tab-pane');
      expect(contents.eq(0).text().trim()).toEqual('1,2,3,');
      expect(contents.eq(1).text().trim()).toEqual('2,3,4,');
      expect(contents.eq(2).text().trim()).toEqual('3,4,5,');
    }));
  });

  //https://github.com/angular-ui/bootstrap/issues/783
  describe('nested tabs', function() {
    var elm;
    it('should render without errors', inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();
      elm = $compile([
        '<div>',
        '  <uib-tabset class="tabbable">',
        '    <uib-tab heading="Tab 1">',
        '      <uib-tabset class="tabbable">',
        '        <uib-tab heading="Tab 1A">',
        '        </uib-tab>',
        '      </uib-tabset>',
        '    </uib-tab>',
        '    <uib-tab heading="Tab 2">',
        '      <uib-tabset class="tabbable">',
        '        <uib-tab heading="Tab 2A">',
        '        </uib-tab>',
        '      </uib-tabset>',
        '    </uib-tab>',
        '  </uib-tabset>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();

      // 1 outside tabset, 2 nested tabsets
      expect(elm.find('.tabbable').length).toEqual(3);
    }));

    it('should render with the correct scopes', inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();
      scope.tab1Text = 'abc';
      scope.tab1aText = '123';
      scope.tab1aHead = '123';
      scope.tab2aaText = '456';
      elm = $compile([
        '<div>',
        '  <uib-tabset class="tabbable">',
        '    <uib-tab heading="Tab 1">',
        '      <uib-tabset class="tabbable">',
        '        <uib-tab heading="{{ tab1aHead }}">',
        '          {{ tab1aText }}',
        '        </uib-tab>',
        '      </uib-tabset>',
        '      <span class="tab-1">{{ tab1Text }}</span>',
        '    </uib-tab>',
        '    <uib-tab heading="Tab 2">',
        '      <uib-tabset class="tabbable">',
        '        <uib-tab heading="Tab 2A">',
        '          <uib-tabset class="tabbable">',
        '            <uib-tab heading="Tab 2AA">',
        '              <span class="tab-2aa">{{ tab2aaText }}</span>',
        '            </uib-tab>',
        '          </uib-tabset>',
        '        </uib-tab>',
        '      </uib-tabset>',
        '    </uib-tab>',
        '  </uib-tabset>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();

      var outsideTabset = elm.find('.tabbable').eq(0);
      var nestedTabset = outsideTabset.find('.tabbable');

      expect(elm.find('.tabbable').length).toEqual(4);
      expect(outsideTabset.find('.tab-pane').eq(0).find('.tab-1').text().trim()).toEqual(scope.tab1Text);
      expect(nestedTabset.find('.tab-pane').eq(0).text().trim()).toEqual(scope.tab1aText);
      expect(nestedTabset.find('ul.nav-tabs li').eq(0).text().trim()).toEqual(scope.tab1aHead);
      expect(nestedTabset.eq(2).find('.tab-pane').eq(0).find('.tab-2aa').text().trim()).toEqual(scope.tab2aaText);
    }));

    it('ng-repeat works with nested tabs', inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();
      scope.tabs = [
        {
          tabs: [
          {
            content: 'tab1a'
          },
          {
            content: 'tab2a'
          }
          ],
          content: 'tab1'
        }
      ];
      elm = $compile([
        '<div>',
        '  <uib-tabset>',
        '    <uib-tab ng-repeat="tab in tabs">',
        '      <uib-tabset>',
        '        <uib-tab ng-repeat="innerTab in tab.tabs">',
        '          <span class="inner-tab-content">{{ innerTab.content }}</span>',
        '        </uib-tab>',
        '      </uib-tabset>',
        '      <span class="outer-tab-content">{{ tab.content }}</span>',
        '    </uib-tab>',
        '  </uib-tabset>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();

      expect(elm.find('.inner-tab-content').eq(0).text().trim()).toEqual(scope.tabs[0].tabs[0].content);
      expect(elm.find('.inner-tab-content').eq(1).text().trim()).toEqual(scope.tabs[0].tabs[1].content);
      expect(elm.find('.outer-tab-content').eq(0).text().trim()).toEqual(scope.tabs[0].content);
    }));
  });
});
