describe('position elements', function () {
  var TargetElMock = function(width, height) {
    this.width = width;
    this.height = height;

    this.prop = function(propName) {
      return propName === 'offsetWidth' ? width : height;
    };
  };

  var $position;

  beforeEach(module('ui.bootstrap.position'));
  beforeEach(inject(function($uibPosition) {
    $position = $uibPosition;
  }));
  beforeEach(function () {
    jasmine.addMatchers({
      toBePositionedAt: function(util, customEqualityTesters) {
        return {
          compare: function(actual, top, left) {
            var result = {
              pass: util.equals(actual.top, top, customEqualityTesters) &&
                      util.equals(actual.left, left, customEqualityTesters)
            };

            if (result.pass) {
              result.message = 'Expected "('  + actual.top + ', ' + actual.left +  ')" not to be positioned at (' + top + ', ' + left + ')';
            } else {
              result.message = 'Expected "('  + actual.top + ', ' + actual.left +  ')" to be positioned at (' + top + ', ' + left + ')';
            }

            return result;
          }
        };
      }
    });
  });

  describe('offset', function() {
    var $document;

    beforeEach(inject(function(_$document_) {
      $document = _$document_;
    }));

    it('returns getBoundingClientRect by default', function() {
      var el = angular.element('<div>Foo</div>');

      /* getBoundingClientRect values will be based on the testing Chrome window
       so that makes this tests very brittle if we don't mock */
      spyOn(el[0], 'getBoundingClientRect').and.returnValue({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });
      $document.find('body').append(el);

      var offset = $position.offset(el);

      expect(offset).toEqual({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });

      el.remove();
    });
  });

  describe('position', function() {
    var $document, el;

    beforeEach(inject(function(_$document_) {
      $document = _$document_;
    }));

    afterEach(function() {
      el.remove();
    });

    it('gets position with document as the relative parent', function() {
      el = angular.element('<div>Foo</div>');

      spyOn(el[0], 'getBoundingClientRect').and.returnValue({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });

      $document.find('body').append(el);

      var position = $position.position(el);

      expect(position).toEqual({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });
    });

    it('gets position with another DOM as the relative parent', function() {
      el = angular.element('<div id="outer" style="position:relative;"><div id="inner">Foo</div></div>');

      $document.find('body').append(el);

      var outerEl = angular.element(document.getElementById('outer'));
      var innerEl = angular.element(document.getElementById('inner'));

      spyOn(outerEl[0], 'getBoundingClientRect').and.returnValue({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });
      spyOn(innerEl[0], 'getBoundingClientRect').and.returnValue({
        width: 20,
        height: 20,
        top: 5,
        left: 5
      });

      var position = $position.position(innerEl);

      expect(position).toEqual({
        width: 20,
        height: 20,
        top: 3,
        left: 3
      });
    });
  });

  describe('append-to-body: false', function() {
    beforeEach(function() {
      //mock position info normally queried from the DOM
      $position.position = function() {
        return {
          width: 20,
          height: 20,
          top: 100,
          left: 100
        };
      };
    });

    it('should position element on top-center by default', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'other')).toBePositionedAt(90, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top')).toBePositionedAt(90, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-center')).toBePositionedAt(90, 105);
    });

    it('should position on top-left', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-left')).toBePositionedAt(90, 100);
    });

    it('should position on top-right', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-right')).toBePositionedAt(90, 120);
    });

    it('should position elements on bottom-center when "bottom" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom')).toBePositionedAt(120, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-center')).toBePositionedAt(120, 105);
    });

    it('should position elements on bottom-left', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-left')).toBePositionedAt(120, 100);
    });

    it('should position elements on bottom-right', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-right')).toBePositionedAt(120, 120);
    });

    it('should position elements on left-center when "left" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left')).toBePositionedAt(105, 90);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-center')).toBePositionedAt(105, 90);
    });

    it('should position elements on left-top when "left-top" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-top')).toBePositionedAt(100, 90);
    });

    it('should position elements on left-bottom when "left-bottom" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-bottom')).toBePositionedAt(120, 90);
    });

    it('should position elements on right-center when "right" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right')).toBePositionedAt(105, 120);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-center')).toBePositionedAt(105, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-top')).toBePositionedAt(100, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-bottom')).toBePositionedAt(120, 120);
    });
  });

  describe('append-to-body: true', function() {
    beforeEach(function() {
      //mock offset info normally queried from the DOM
      $position.offset = function() {
        return {
          width: 20,
          height: 20,
          top: 100,
          left: 100
        };
      };
    });

    it('should position element on top-center by default', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'other', true)).toBePositionedAt(90, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top', true)).toBePositionedAt(90, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-center', true)).toBePositionedAt(90, 105);
    });

    it('should position on top-left', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-left', true)).toBePositionedAt(90, 100);
    });

    it('should position on top-right', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-right', true)).toBePositionedAt(90, 120);
    });

    it('should position elements on bottom-center when "bottom" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom', true)).toBePositionedAt(120, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-center', true)).toBePositionedAt(120, 105);
    });

    it('should position elements on bottom-left', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-left', true)).toBePositionedAt(120, 100);
    });

    it('should position elements on bottom-right', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-right', true)).toBePositionedAt(120, 120);
    });

    it('should position elements on left-center when "left" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left', true)).toBePositionedAt(105, 90);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-center', true)).toBePositionedAt(105, 90);
    });

    it('should position elements on left-top when "left-top" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-top', true)).toBePositionedAt(100, 90);
    });

    it('should position elements on left-bottom when "left-bottom" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-bottom', true)).toBePositionedAt(120, 90);
    });

    it('should position elements on right-center when "right" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right', true)).toBePositionedAt(105, 120);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-center', true)).toBePositionedAt(105, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-top', true)).toBePositionedAt(100, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-bottom', true)).toBePositionedAt(120, 120);
    });
  });
});
