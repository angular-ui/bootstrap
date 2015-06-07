describe('uibIsClass', function() {
  var $rootScope;

  beforeEach(module('ui.bootstrap.isClass'));
  beforeEach(inject(function($compile, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.activeClass = 'active';
    $rootScope.items = [1, 2, 3];
    element = $compile('<div><div ng-repeat="item in items" ' +
      'uib-is-class="activeClass for activeItem on item">{{ item }}</div></div>')($rootScope);
    $rootScope.$digest();
  }));

  it('initializes classes correctly', function() {
    expect(element.find('.active').length).toEqual(0);
  });

  it('sets classes correctly', function() {
    $rootScope.activeItem = 2;
    $rootScope.$digest();
    expect(element.find('.active').text()).toEqual('2');

    $rootScope.items.splice(1, 1);
    $rootScope.$digest();
    expect(element.find('.active').length).toEqual(0);
  });

  it('handles removal of items correctly', function() {
    $rootScope.activeItem = 2;
    $rootScope.$digest();
    expect(element.find('.active').text()).toEqual('2');

    $rootScope.items.splice(1, 1);
    $rootScope.$digest();
    expect(element.find('.active').length).toEqual(0);

    $rootScope.activeItem = 1;
    $rootScope.$digest();
    expect(element.find('.active').text()).toEqual('1');
  });

  it('handles moving of items', function() {
    $rootScope.activeItem = 2;
    $rootScope.items = [2, 1, 3];
    $rootScope.$digest();
    expect(element.find('.active').text()).toEqual('2');
    expect(element.find('.active').length).toEqual(1);
    expect(element.find('.active').index()).toEqual(0);

    $rootScope.items = [4, 3, 2];
    $rootScope.$digest();
    expect(element.find('.active').text()).toEqual('2');
    expect(element.find('.active').length).toEqual(1);
    expect(element.find('.active').index()).toEqual(2);
  });

  it('handles emptying and re-adding the items', function() {
    $rootScope.activeItem = 2;
    $rootScope.items = [];
    $rootScope.$digest();
    expect(element.find('.active').length).toEqual(0);

    $rootScope.items = [4, 3, 2];
    $rootScope.$digest();
    expect(element.find('.active').text()).toEqual('2');
    expect(element.find('.active').index()).toEqual(2);
  });

  it('handles undefined items', function() {
    $rootScope.activeItem = undefined;
    $rootScope.items = [];
    $rootScope.$digest();
    expect(element.find('.active').length).toEqual(0);

    $rootScope.items = [4, 3, undefined];
    $rootScope.$digest();
    expect(element.find('.active').length).toEqual(1);
    expect(element.find('.active').text()).toEqual('');
  });
});