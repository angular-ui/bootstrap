describe('progressbar directive', function() {
  var $rootScope, $compile, element;
  beforeEach(module('ui.bootstrap.progressbar'));
  beforeEach(module('uib/template/progressbar/progressbar.html', 'uib/template/progressbar/progress.html', 'uib/template/progressbar/bar.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.value = 22;
    element = $compile('<uib-progressbar animate="false" value="value" title="foo">{{value}} %</uib-progressbar>')($rootScope);
    $rootScope.$digest();
  }));

  var BAR_CLASS = 'progress-bar';

  function getBar(i) {
    return element.children().eq(i);
  }

  it('has a "progress" css class', function() {
    expect(element).toHaveClass('progress');
  });

  it('contains one child element with "bar" css class', function() {
    expect(element.children().length).toBe(1);
    expect(getBar(0)).toHaveClass(BAR_CLASS);
  });

  it('has a "bar" element with expected width', function() {
    expect(getBar(0).css('width')).toBe('22%');
  });

  it('has the appropriate aria markup', function() {
    var bar = getBar(0);
    expect(bar.attr('role')).toBe('progressbar');
    expect(bar.attr('aria-valuemin')).toBe('0');
    expect(bar.attr('aria-valuemax')).toBe('100');
    expect(bar.attr('aria-valuenow')).toBe('22');
    expect(bar.attr('aria-valuetext')).toBe('22%');
    expect(bar.attr('aria-labelledby')).toBe('foo');
  });

  it('has the default aria-labelledby value of `progressbar`', function() {
    element = $compile('<uib-progressbar animate="false" value="value">{{value}} %</uib-progressbar>')($rootScope);
    $rootScope.$digest();
    var bar = getBar(0);
    expect(bar.attr('aria-labelledby')).toBe('progressbar');
  });

  it('transcludes "bar" text', function() {
    expect(getBar(0).text()).toBe('22 %');
  });

  it('it should be possible to add additional classes', function() {
    element = $compile('<progress class="progress-striped active" max="200"><bar class="pizza"></bar></progress>')($rootScope);
    $rootScope.$digest();

    expect(element).toHaveClass('progress-striped');
    expect(element).toHaveClass('active');

    expect(getBar(0)).toHaveClass('pizza');
  });

  it('adjusts the "bar" width and aria when value changes', function() {
    $rootScope.value = 60;
    $rootScope.$digest();

    var bar = getBar(0);
    expect(bar.css('width')).toBe('60%');

    expect(bar.attr('aria-valuemin')).toBe('0');
    expect(bar.attr('aria-valuemax')).toBe('100');
    expect(bar.attr('aria-valuenow')).toBe('60');
    expect(bar.attr('aria-valuetext')).toBe('60%');
  });

  it('allows fractional "bar" width values, rounded to two places', function() {
    $rootScope.value = 5.625;
    $rootScope.$digest();
    expect(getBar(0).css('width')).toBe('5.63%');

    $rootScope.value = 1.3;
    $rootScope.$digest();
    expect(getBar(0).css('width')).toBe('1.3%');
  });

  it('does not include decimals in aria values', function() {
    $rootScope.value = 50.34;
    $rootScope.$digest();

    var bar = getBar(0);
    expect(bar.css('width')).toBe('50.34%');
    expect(bar.attr('aria-valuetext')).toBe('50%');
  });

  describe('"max" attribute', function() {
    beforeEach(inject(function() {
      $rootScope.max = 200;
      element = $compile('<uib-progressbar max="max" animate="false" value="value">{{value}}/{{max}}</uib-progressbar>')($rootScope);
      $rootScope.$digest();
    }));

    it('has the appropriate aria markup', function() {
      expect(getBar(0).attr('aria-valuemax')).toBe('200');
    });

    it('adjusts the "bar" width', function() {
      expect(element.children().eq(0).css('width')).toBe('11%');
    });

    it('adjusts the "bar" width when value changes', function() {
      $rootScope.value = 60;
      $rootScope.$digest();
      expect(getBar(0).css('width')).toBe('30%');

      $rootScope.value += 12;
      $rootScope.$digest();
      expect(getBar(0).css('width')).toBe('36%');

      $rootScope.value = 0;
      $rootScope.$digest();
      expect(getBar(0).css('width')).toBe('0%');
    });

    it('transcludes "bar" text', function() {
      expect(getBar(0).text()).toBe('22/200');
    });

    it('adjusts the valuemax when it changes', function() {
      expect(getBar(0).attr('aria-valuemax')).toBe('200');
      $rootScope.max = 300;
      $rootScope.$digest();
      expect(getBar(0).attr('aria-valuemax')).toBe('300');
    });
  });

  describe('"type" attribute', function() {
    beforeEach(inject(function() {
      $rootScope.type = 'success';
      element = $compile('<uib-progressbar value="value" type="{{type}}"></uib-progressbar>')($rootScope);
      $rootScope.$digest();
    }));

    it('should use correct classes', function() {
      expect(getBar(0)).toHaveClass(BAR_CLASS);
      expect(getBar(0)).toHaveClass(BAR_CLASS + '-success');
    });

    it('should change classes if type changed', function() {
      $rootScope.type = 'warning';
      $rootScope.value += 1;
      $rootScope.$digest();

      var barEl = getBar(0);
      expect(barEl).toHaveClass(BAR_CLASS);
      expect(barEl).not.toHaveClass(BAR_CLASS + '-success');
      expect(barEl).toHaveClass(BAR_CLASS + '-warning');
    });
  });

  describe('stacked', function() {
    beforeEach(inject(function() {
      $rootScope.objects = [
        { value: 10, title: 'foo', type: 'success' },
        { value: 50, title: 'bar', type: 'warning' },
        { value: 20, title: 'baz' }
      ];
      element = $compile('<uib-progress animate="false"><uib-bar ng-repeat="o in objects" value="o.value" type="{{o.type}}" title="{{o.title}}">{{o.value}}</uib-bar></uib-progress>')($rootScope);
      $rootScope.$digest();
    }));

    it('contains the right number of bars', function() {
      expect(element.children().length).toBe(3);
      for (var i = 0; i < 3; i++) {
        expect(getBar(i)).toHaveClass(BAR_CLASS);
      }
    });

    it('renders each bar with the appropriate width', function() {
      expect(getBar(0).css('width')).toBe('10%');
      expect(getBar(1).css('width')).toBe('50%');
      expect(getBar(2).css('width')).toBe('20%');
    });

    it('uses correct classes', function() {
      expect(getBar(0)).toHaveClass(BAR_CLASS + '-success');
      expect(getBar(0)).not.toHaveClass(BAR_CLASS + '-warning');

      expect(getBar(1)).not.toHaveClass(BAR_CLASS + '-success');
      expect(getBar(1)).toHaveClass(BAR_CLASS + '-warning');

      expect(getBar(2)).not.toHaveClass(BAR_CLASS + '-success');
      expect(getBar(2)).not.toHaveClass(BAR_CLASS + '-warning');
    });

    it('should change classes if type changed', function() {
      $rootScope.objects = [
        { value: 20, type: 'warning' },
        { value: 50 },
        { value: 30, type: 'info' }
      ];
      $rootScope.$digest();

      expect(getBar(0)).not.toHaveClass(BAR_CLASS + '-success');
      expect(getBar(0)).toHaveClass(BAR_CLASS + '-warning');

      expect(getBar(1)).not.toHaveClass(BAR_CLASS + '-success');
      expect(getBar(1)).not.toHaveClass(BAR_CLASS + '-warning');

      expect(getBar(2)).toHaveClass(BAR_CLASS + '-info');
      expect(getBar(2)).not.toHaveClass(BAR_CLASS + '-success');
      expect(getBar(2)).not.toHaveClass(BAR_CLASS + '-warning');
    });

    it('should change classes if type changed', function() {
      $rootScope.objects = [
        { value: 70, type: 'info' }
      ];
      $rootScope.$digest();

      expect(element.children().length).toBe(1);

      expect(getBar(0)).toHaveClass(BAR_CLASS + '-info');
      expect(getBar(0)).not.toHaveClass(BAR_CLASS + '-success');
      expect(getBar(0)).not.toHaveClass(BAR_CLASS + '-warning');
    });

    it('should have the correct aria markup', function() {
      expect(getBar(0).attr('aria-valuenow')).toBe('10');
      expect(getBar(0).attr('aria-valuemin')).toBe('0');
      expect(getBar(0).attr('aria-valuemax')).toBe('100');
      expect(getBar(0).attr('aria-valuetext')).toBe('10%');
      expect(getBar(0).attr('aria-labelledby')).toBe('foo');

      expect(getBar(1).attr('aria-valuenow')).toBe('50');
      expect(getBar(1).attr('aria-valuemin')).toBe('0');
      expect(getBar(1).attr('aria-valuemax')).toBe('100');
      expect(getBar(1).attr('aria-valuetext')).toBe('50%');
      expect(getBar(1).attr('aria-labelledby')).toBe('bar');

      expect(getBar(2).attr('aria-valuenow')).toBe('20');
      expect(getBar(2).attr('aria-valuemin')).toBe('0');
      expect(getBar(2).attr('aria-valuemax')).toBe('100');
      expect(getBar(2).attr('aria-valuetext')).toBe('20%');
      expect(getBar(2).attr('aria-labelledby')).toBe('baz');
    });

    it('should default to `progressbar`', function() {
      $rootScope.objects = [
        { value: 10, title: 'foo', type: 'success' },
        { value: 50, title: 'bar', type: 'warning' },
        { value: 20, title: 'baz' }
      ];
      element = $compile('<uib-progress animate="false"><uib-bar ng-repeat="o in objects" value="o.value" type="{{o.type}}">{{o.value}}</uib-bar></uib-progress>')($rootScope);
      $rootScope.$digest();

      expect(getBar(0).attr('aria-labelledby')).toBe('progressbar');
      expect(getBar(1).attr('aria-labelledby')).toBe('progressbar');
      expect(getBar(2).attr('aria-labelledby')).toBe('progressbar');
    });

    describe('"max" attribute', function() {
      beforeEach(inject(function() {
        $rootScope.max = 200;
        element = $compile('<uib-progress max="max" animate="false"><uib-bar ng-repeat="o in objects" value="o.value">{{o.value}}/{{max}}</uib-bar></uib-progress>')($rootScope);
        $rootScope.$digest();
      }));

      it('has the appropriate aria markup', function() {
        expect(getBar(0).attr('aria-valuemax')).toBe('200');
      });

      it('adjusts the "bar" width when it changes', function() {
        expect(getBar(0).css('width')).toBe('5%');
        $rootScope.max = 250;
        $rootScope.$digest();
        expect(getBar(0).css('width')).toBe('4%');
      });

      it('adjusts the "bar" width when value changes', function() {
        $rootScope.objects[0].value = 60;
        $rootScope.$digest();
        expect(getBar(0).css('width')).toBe('30%');

        $rootScope.objects[0].value += 12;
        $rootScope.$digest();
        expect(getBar(0).css('width')).toBe('36%');

        $rootScope.objects[0].value = 0;
        $rootScope.$digest();
        expect(getBar(0).css('width')).toBe('0%');
      });

      it('transcludes "bar" text', function() {
        expect(getBar(0).text()).toBe('10/200');
      });

      it('adjusts the valuemax when it changes', function() {
        expect(getBar(0).attr('aria-valuemax')).toBe('200');
        $rootScope.max = 300;
        $rootScope.$digest();
        expect(getBar(0).attr('aria-valuemax')).toBe('300');
      });

      it('should not have a total width over 100%', function() {
        $rootScope.objects = [
          { value: 60, type: 'warning' },
          { value: 103 },
          { value: 270, type: 'info' }
        ];
        $rootScope.max = 433;
        $rootScope.$digest();
        var totalWidth = 0;
        for (var i = 0; i < 3; i++) {
          totalWidth += parseFloat(getBar(i).css('width'));
        }
        expect(totalWidth.toFixed(2)).toBe('100.00');
      });

      it('should not have a total width over 37.65% when removing bar', function() {
        $rootScope.objects = [
          { value: 60, type: 'warning' },
          { value: 103 },
          { value: 270, type: 'info' }
        ];
        $rootScope.max = 433;
        $rootScope.$digest();
        var totalWidth = 0;
        var i;
        for (i = 0; i < 3; i++) {
          totalWidth += parseFloat(getBar(i).css('width'));
        }
        expect(totalWidth.toFixed(2)).toBe('100.00');

        $rootScope.objects.splice(2, 1);
        $rootScope.$digest();
        totalWidth = 0;
        for (i = 0; i < 2; i++) {
          totalWidth += parseFloat(getBar(i).css('width'));
        }
        expect(totalWidth.toFixed(2)).toBe('37.65');
      });
    });
  });
});
