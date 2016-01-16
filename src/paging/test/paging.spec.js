describe('paging factory', function() {
  var $rootScope, $scope, ctrl, attrs;

  beforeEach(module('ui.bootstrap.paging'));
  beforeEach(inject(function(_$rootScope_, uibPaging) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    ctrl = {};
    attrs = {};

    uibPaging.create(ctrl, $scope, attrs);
  }));

  describe('init', function() {
    var ngModelCtrl, config;

    beforeEach(function() {
      ngModelCtrl = {};
      config = {
        foo: 'bar',
        itemsPerPage: 12
      };
    });

    describe('without itemsPerPage', function() {
      beforeEach(function() {
        ctrl.init(ngModelCtrl, config);
      });

      it('should set the ngModel and config', function() {
        expect(ctrl.ngModelCtrl).toBe(ngModelCtrl);
        expect(ctrl.config).toBe(config);
      });

      it('should properly render the model', function() {
        spyOn(ctrl, 'render');

        ngModelCtrl.$render();

        expect(ctrl.render).toHaveBeenCalled();
      });

      it('should set to default itemsPerPage', function() {
        expect(ctrl.itemsPerPage).toBe(12);
      });

      it('should update the page when total items changes', function() {
        spyOn(ctrl, 'calculateTotalPages').and.returnValue(5);
        spyOn(ctrl, 'updatePage');
        $rootScope.$digest();

        expect(ctrl.calculateTotalPages.calls.count()).toBe(0);
        expect(ctrl.updatePage.calls.count()).toBe(0);

        $scope.totalItems = 10;
        $rootScope.$digest();

        expect(ctrl.calculateTotalPages.calls.count()).toBe(1);
        expect(ctrl.updatePage.calls.count()).toBe(1);
        expect($scope.totalPages).toBe(5);

        $scope.totalItems = undefined;
        $scope.totalPages = 2;
        $rootScope.$digest();

        expect(ctrl.calculateTotalPages.calls.count()).toBe(2);
        expect(ctrl.updatePage.calls.count()).toBe(2);
        expect($scope.totalPages).toBe(5);
      });
    });

    describe('with itemsPerPage', function() {
      beforeEach(function() {
        attrs.itemsPerPage = 'abc';
        $rootScope.abc = 10;

        ctrl.init(ngModelCtrl, config);
      });

      it('should update the page when itemsPerPage changes', function() {
        spyOn(ctrl, 'calculateTotalPages').and.returnValue(5);
        spyOn(ctrl, 'updatePage');
        $rootScope.$digest();

        expect(ctrl.itemsPerPage).toBe(10);
        expect($scope.totalPages).toBe(5);
        expect(ctrl.updatePage).toHaveBeenCalled();
      });
    });
  });

  describe('calculate totalPages', function() {
    it('when itemsPerPage is less than 1', function() {
      ctrl.itemsPerPage = 0;
      $scope.totalItems = 101;
      expect(ctrl.calculateTotalPages()).toBe(1);
    });

    it('when itemsPerPage is greater than 1', function() {
      ctrl.itemsPerPage = 10;
      $scope.totalItems = 101;
      expect(ctrl.calculateTotalPages()).toBe(11);
    });
  });

  describe('render', function() {
    it('should set page to 1 when invalid', function() {
      ctrl.ngModelCtrl.$viewValue = 'abcd';
      $scope.page = 10;

      ctrl.render();

      expect($scope.page).toBe(1);
    });

    it('should set page to view value when valid', function() {
      ctrl.ngModelCtrl.$viewValue = '3';
      $scope.page = 10;

      ctrl.render();

      expect($scope.page).toBe(3);
    });
  });

  describe('select page', function() {
    beforeEach(function() {
      spyOn(ctrl.ngModelCtrl, '$setViewValue');
      ctrl.ngModelCtrl.$render = jasmine.createSpy('ctrl.ngModelCtrl.$render');
      $scope.page = 5;
      $scope.totalPages = 20;
    });

    it('should change the page', function() {
      $scope.selectPage(12);

      expect(ctrl.ngModelCtrl.$setViewValue).toHaveBeenCalledWith(12);
      expect(ctrl.ngModelCtrl.$render).toHaveBeenCalled();
    });

    it('should not change the page to one out of range', function() {
      $scope.selectPage(-1);

      expect(ctrl.ngModelCtrl.$setViewValue).not.toHaveBeenCalled();
      expect(ctrl.ngModelCtrl.$render).not.toHaveBeenCalled();

      $scope.selectPage(21);

      expect(ctrl.ngModelCtrl.$setViewValue).not.toHaveBeenCalled();
      expect(ctrl.ngModelCtrl.$render).not.toHaveBeenCalled();
    });

    describe('on click', function() {
      var evt;

      beforeEach(function() {
        evt = {
          preventDefault: jasmine.createSpy('evt.preventDefault'),
          target: {
            blur: jasmine.createSpy('evt.target.blur')
          }
        };
      });

      it('should prevent default behavior', function() {
        $scope.selectPage(12, evt);

        expect(evt.preventDefault).toHaveBeenCalled();
      });

      it('should not change the page if disabled and from an event', function() {
        $scope.ngDisabled = true;

        $scope.selectPage(12, evt);

        expect(ctrl.ngModelCtrl.$setViewValue).not.toHaveBeenCalled();
        expect(ctrl.ngModelCtrl.$render).not.toHaveBeenCalled();
      });

      it('should blur the element clicked', function() {
        $scope.selectPage(12, evt);

        expect(evt.target.blur).toHaveBeenCalled();
      });
    });
  });

  it('should get the text', function() {
    $scope.fooText = 'bar';

    expect($scope.getText('foo')).toBe('bar');
  });

  it('should get the default text', function() {
    ctrl.config = {
      fooText: 'bar'
    };

    expect($scope.getText('foo')).toBe('bar');
  });

  it('should disable previous button', function() {
    $scope.page = 1;

    expect($scope.noPrevious()).toBe(true);
  });

  it('should enable previous button', function() {
    $scope.page = 2;

    expect($scope.noPrevious()).toBe(false);
  });

  it('should disable next button', function() {
    $scope.page = 10;
    $scope.totalPages = 10;

    expect($scope.noNext()).toBe(true);
  });

  it('should enable next button', function() {
    $scope.page = 9;
    $scope.totalPages = 10;

    expect($scope.noNext()).toBe(false);
  });

  describe('update page', function() {
    beforeEach(function() {
      spyOn($scope, 'selectPage');
      ctrl.ngModelCtrl.$render = jasmine.createSpy('ctrl.ngModelCtrl.$render');
      ctrl.setNumPages = jasmine.createSpy('ctrl.setNumPages');
      $scope.totalPages = 10;
    });

    it('should select the last page if page is above total', function() {
      $scope.page = 12;

      ctrl.updatePage();

      expect(ctrl.setNumPages).toHaveBeenCalledWith($rootScope, 10);
      expect($scope.selectPage).toHaveBeenCalledWith(10);
      expect(ctrl.ngModelCtrl.$render).not.toHaveBeenCalled();
    });

    it('should execute render if page is within range', function() {
      $scope.page = 5;

      ctrl.updatePage();

      expect(ctrl.setNumPages).toHaveBeenCalledWith($rootScope, 10);
      expect($scope.selectPage).not.toHaveBeenCalled();
      expect(ctrl.ngModelCtrl.$render).toHaveBeenCalled();
    });
  });

  describe('gc', function() {
    it('should clear watchers', function() {
      var watcher1 = jasmine.createSpy('watcher1'),
        watcher2 = jasmine.createSpy('watcher2');
      ctrl._watchers = [watcher1, watcher2];

      $scope.$destroy();

      expect(ctrl._watchers.length).toBe(0);
      expect(watcher1).toHaveBeenCalled();
      expect(watcher2).toHaveBeenCalled();
    });
  });
});
