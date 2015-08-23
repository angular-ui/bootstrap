describe('buttons', function() {

  var $scope, $compile;

  beforeEach(module('ui.bootstrap.buttons'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('checkbox', function() {
    var compileButton = function(markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it('should expose the controller to the view', inject(function($templateCache) {
      var btn = compileButton('<button ng-model="model" btn-checkbox>{{button.text}}</button>', $scope);
      var ctrl = btn.controller('btnCheckbox');
      expect(ctrl).toBeDefined();

      ctrl.text = 'foo';
      $scope.$digest();

      expect(btn.html()).toBe('foo');
    }));

    //model -> UI
    it('should work correctly with default model values', function() {
      $scope.model = false;
      var btn = compileButton('<button ng-model="model" btn-checkbox>click</button>', $scope);
      expect(btn).not.toHaveClass('active');

      $scope.model = true;
      $scope.$digest();
      expect(btn).toHaveClass('active');
    });

    it('should bind custom model values', function() {
      $scope.model = 1;
      var btn = compileButton('<button ng-model="model" btn-checkbox btn-checkbox-true="1" btn-checkbox-false="0">click</button>', $scope);
      expect(btn).toHaveClass('active');

      $scope.model = 0;
      $scope.$digest();
      expect(btn).not.toHaveClass('active');
    });

    //UI-> model
    it('should toggle default model values on click', function() {
      $scope.model = false;
      var btn = compileButton('<button ng-model="model" btn-checkbox>click</button>', $scope);

      btn.click();
      expect($scope.model).toEqual(true);
      expect(btn).toHaveClass('active');

      btn.click();
      expect($scope.model).toEqual(false);
      expect(btn).not.toHaveClass('active');
    });

    it('should toggle custom model values on click', function() {
      $scope.model = 0;
      var btn = compileButton('<button ng-model="model" btn-checkbox btn-checkbox-true="1" btn-checkbox-false="0">click</button>', $scope);

      btn.click();
      expect($scope.model).toEqual(1);
      expect(btn).toHaveClass('active');

      btn.click();
      expect($scope.model).toEqual(0);
      expect(btn).not.toHaveClass('active');
    });

    it('should toggle custom model values on spacebar if focused', function() {
      $scope.model = 0;
      var btn = compileButton('<button ng-model="model" btn-checkbox btn-checkbox-true="1" btn-checkbox-false="0">click</button>', $scope);
      $('body').append(btn);
      var e = $.Event('keypress');
      e.which = 32;

      btn[0].focus();
      btn.trigger(e);
      $scope.$digest();
      expect($scope.model).toEqual(1);
      expect(btn).toHaveClass('active');

      btn.trigger(e);
      $scope.$digest();
      expect($scope.model).toEqual(0);
      expect(btn).not.toHaveClass('active');

      btn.remove();
    });

    it('should monitor true / false value changes - issue 666', function() {

      $scope.model = 1;
      $scope.trueVal = 1;
      var btn = compileButton('<button ng-model="model" btn-checkbox btn-checkbox-true="trueVal">click</button>', $scope);

      expect(btn).toHaveClass('active');
      expect($scope.model).toEqual(1);

      $scope.model = 2;
      $scope.trueVal = 2;
      $scope.$digest();

      expect(btn).toHaveClass('active');
      expect($scope.model).toEqual(2);
    });

    it('should not toggle when disabled - issue 4013', function() {
      $scope.model = 1;
      $scope.falseVal = 0;
      var btn = compileButton('<button disabled ng-model="model" btn-checkbox btn-checkbox-true="falseVal">click</button>', $scope);
      $('body').append(btn);

      expect(btn).not.toHaveClass('active');
      expect($scope.model).toEqual(1);

      btn.click();

      expect(btn).not.toHaveClass('active');

      $scope.$digest();
      
      expect(btn).not.toHaveClass('active');

      btn[0].focus();
      var e = $.Event('keypress');
      e.which = 32;
      btn.trigger(e);

      expect(btn).not.toHaveClass('active');

      $scope.$digest();
      
      expect(btn).not.toHaveClass('active');

      btn.remove();
    });

    describe('setting buttonConfig', function() {
      var originalActiveClass, originalToggleEvent;

      beforeEach(inject(function(buttonConfig) {
        originalActiveClass = buttonConfig.activeClass;
        originalToggleEvent = buttonConfig.toggleEvent;
        buttonConfig.activeClass = false;
        buttonConfig.toggleEvent = false;
      }));

      afterEach(inject(function(buttonConfig) {
        // return it to the original value
        buttonConfig.activeClass = originalActiveClass;
        buttonConfig.toggleEvent = originalToggleEvent;
      }));

      it('should use default config when buttonConfig.activeClass and buttonConfig.toggleEvent is false', function() {
        $scope.model = false;
        var btn = compileButton('<button ng-model="model" btn-checkbox>click</button>', $scope);
        expect(btn).not.toHaveClass('active');

        $scope.model = true;
        $scope.$digest();
        expect(btn).toHaveClass('active');
      });
    });

  });

  describe('radio', function() {

    var compileButtons = function(markup, scope) {
      var el = $compile('<div>'+markup+'</div>')(scope);
      scope.$digest();
      return el.find('button');
    };

    it('should expose the controller to the view', inject(function($templateCache) {
      var btn = compileButtons('<button ng-model="model" btn-radio="1">{{buttons.text}}</button>', $scope);
      var ctrl = btn.controller('btnRadio');
      expect(ctrl).toBeDefined();

      ctrl.text = 'foo';
      $scope.$digest();

      expect(btn.html()).toBe('foo');
    }));

    //model -> UI
    it('should work correctly set active class based on model', function() {
      var btns = compileButtons('<button ng-model="model" btn-radio="1">click1</button><button ng-model="model" btn-radio="2">click2</button>', $scope);
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      $scope.model = 2;
      $scope.$digest();
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');
    });

    //UI->model
    it('should work correctly set active class based on model', function() {
      var btns = compileButtons('<button ng-model="model" btn-radio="1">click1</button><button ng-model="model" btn-radio="2">click2</button>', $scope);
      expect($scope.model).toBeUndefined();

      btns.eq(0).click();
      expect($scope.model).toEqual(1);
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      btns.eq(1).click();
      expect($scope.model).toEqual(2);
      expect(btns.eq(1)).toHaveClass('active');
      expect(btns.eq(0)).not.toHaveClass('active');
    });

    it('should watch btn-radio values and update state accordingly', function() {
      $scope.values = ['value1', 'value2'];

      var btns = compileButtons('<button ng-model="model" btn-radio="values[0]">click1</button><button ng-model="model" btn-radio="values[1]">click2</button>', $scope);
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      $scope.model = 'value2';
      $scope.$digest();
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');

      $scope.values[1] = 'value3';
      $scope.model = 'value3';
      $scope.$digest();
      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');
    });

    it('should do nothing when click active radio', function() {
      $scope.model = 1;
      var btns = compileButtons('<button ng-model="model" btn-radio="1">click1</button><button ng-model="model" btn-radio="2">click2</button>', $scope);
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      btns.eq(0).click();
      $scope.$digest();
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');
    });

    it('should not toggle when disabled - issue 4013', function() {
      $scope.model = 1;
      var btns = compileButtons('<button ng-model="model" btn-radio="1">click1</button><button disabled ng-model="model" btn-radio="2">click2</button>', $scope);

      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      btns.eq(1).click();

      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');

      $scope.$digest();

      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');
    });

    it('should handle string values in btn-radio value', function() {
      $scope.model = 'Two';
      var btns = compileButtons('<button ng-model="model" btn-radio="\'One\'">click1</button><button ng-model="model" btn-radio="\'Two\'">click2</button>', $scope);

      expect(btns.eq(0)).not.toHaveClass('active');
      expect(btns.eq(1)).toHaveClass('active');

      btns.eq(0).click();
      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');
      expect($scope.model).toEqual('One');

      $scope.$digest();

      expect(btns.eq(0)).toHaveClass('active');
      expect(btns.eq(1)).not.toHaveClass('active');
      expect($scope.model).toEqual('One');
    });

    describe('uncheckable', function() {
      //model -> UI
      it('should set active class based on model', function() {
        var btns = compileButtons('<button ng-model="model" btn-radio="1" uncheckable>click1</button><button ng-model="model" btn-radio="2" uncheckable>click2</button>', $scope);
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');

        $scope.model = 2;
        $scope.$digest();
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).toHaveClass('active');
      });

      //UI->model
      it('should unset active class based on model', function() {
        var btns = compileButtons('<button ng-model="model" btn-radio="1" uncheckable>click1</button><button ng-model="model" btn-radio="2" uncheckable>click2</button>', $scope);
        expect($scope.model).toBeUndefined();

        btns.eq(0).click();
        expect($scope.model).toEqual(1);
        expect(btns.eq(0)).toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');

        btns.eq(0).click();
        expect($scope.model).toBeNull();
        expect(btns.eq(1)).not.toHaveClass('active');
        expect(btns.eq(0)).not.toHaveClass('active');
      });

      it('should watch btn-radio values and update state', function() {
        $scope.values = ['value1', 'value2'];

        var btns = compileButtons('<button ng-model="model" btn-radio="values[0]" uncheckable>click1</button><button ng-model="model" btn-radio="values[1]" uncheckable>click2</button>', $scope);
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');

        $scope.model = 'value2';
        $scope.$digest();
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).toHaveClass('active');

        $scope.model = undefined;
        $scope.$digest();
        expect(btns.eq(0)).not.toHaveClass('active');
        expect(btns.eq(1)).not.toHaveClass('active');
      });
    });
  });
});
