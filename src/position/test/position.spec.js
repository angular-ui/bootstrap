describe('$uibPosition service', function () {
  var TargetElMock = function(width, height) {
    this.width = width;
    this.height = height;

    this.prop = function(propName) {
      return propName === 'offsetWidth' ? width : height;
    };
  };

  var $document;
  var $uibPosition;

  beforeEach(module('ui.bootstrap.position'));

  beforeEach(inject(function(_$document_, _$uibPosition_) {
    $document = _$document_;
    $uibPosition = _$uibPosition_;
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
              result.message = 'Expected "(' + actual.top + ', ' + actual.left + ')" not to be positioned at (' + top + ', ' + left + ')';
            } else {
              result.message = 'Expected "(' + actual.top + ', ' + actual.left + ')" to be positioned at (' + top + ', ' + left + ')';
            }

            return result;
          }
        };
      }
    });
  });

  describe('rawnode', function() {
    it('returns the raw DOM element from an angular element', function() {
      var angularEl = angular.element('<div></div>');
      var el = $uibPosition.getRawNode(angularEl);
      expect(el.nodeName).toBe('DIV');
    });

    it('returns the raw DOM element from a select element', function() {
      var angularEl = angular.element('<select><option value="value">value</option></select>');
      var el = $uibPosition.getRawNode(angularEl);
      expect(el.nodeName).toBe('SELECT');
    });
  });

  describe('offset', function() {
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

      var offset = $uibPosition.offset(el);

      expect(offset).toEqual({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });

      el.remove();
    });
  });

  describe('viewportOffset', function() {
    var el;

    beforeEach(function() {
      el = angular.element('<div id="outer" style="overflow: auto; width: 200px; height: 200px; padding: 25px; box-sizing: border-box;"><div id="inner" style="margin: 20px; width: 100px; height: 100px; box-sizing: border-box;"></div></div>');
      $document.find('body').append(el);
    });

    afterEach(function() {
      el.remove();
    });

    it('measures the offset', function() {
      var vpOffset = $uibPosition.viewportOffset(document.getElementById('inner'));
      expect(vpOffset).toEqual({
        top: 20,
        bottom: 30,
        left: 20,
        right: 30
      });
    });

    it('measures the offset without padding', function() {
      var outerEl = document.getElementById('outer');
      outerEl.style.paddingTop = '0px';
      outerEl.style.paddingBottom = '0px';
      outerEl.style.paddingLeft = '0px';
      outerEl.style.paddingRight = '0px';

      var vpOffset = $uibPosition.viewportOffset(document.getElementById('inner'));
      expect(vpOffset).toEqual({
        top: 20,
        bottom: 80,
        left: 20,
        right: 80
      });
    });

    it('measures the offset with borders', function() {
      var outerEl = document.getElementById('outer');
      outerEl.style.width = '220px';
      outerEl.style.height = '220px';
      outerEl.style.border = '10px solid black';

      var vpOffset = $uibPosition.viewportOffset(document.getElementById('inner'));
      expect(vpOffset).toEqual({
        top: 20,
        bottom: 30,
        left: 20,
        right: 30
      });
    });

    it('measures the offset excluding padding', function() {
      var vpOffset = $uibPosition.viewportOffset(document.getElementById('inner'), false, false);
      expect(vpOffset).toEqual({
        top: 45,
        bottom: 55,
        left: 45,
        right: 55
      });
    });

    it('measures the offset when scrolled', function() {
      var innerEl = document.getElementById('inner');
      innerEl.style.width = '300px';
      innerEl.style.height = '300px';
      var outerEl = document.getElementById('outer');
      outerEl.scrollTop = 25;
      outerEl.scrollLeft = 25;

      var vpOffset = $uibPosition.viewportOffset(document.getElementById('inner'));
      expect(vpOffset.top).toEqual(-5);
      expect(vpOffset.bottom).toBeGreaterThan(-180);
      expect(vpOffset.left).toEqual(-5);
      expect(vpOffset.right).toBeGreaterThan(-180);

      //brittle
      // expect(vpOffset).toEqual({
      //   top: -5,
      //   bottom: -162,
      //   left: -5,
      //   right: -162
      // });
    });

  });

  describe('position', function() {
    var el;

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

      var position = $uibPosition.position(el);

      expect(position).toEqual({
        width: 100,
        height: 100,
        top: 2,
        left: 2
      });
    });

    it('gets position with an element as the relative parent', function() {
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

      var position = $uibPosition.position(innerEl);

      expect(position).toEqual({
        width: 20,
        height: 20,
        top: 3,
        left: 3
      });
    });
  });

  describe('isScrollable', function() {
    var el;

    afterEach(function() {
      el.remove();
    });

    it('should return true if the element is scrollable', function() {
      el = angular.element('<div style="overflow: auto"></div>');
      $document.find('body').append(el);
      expect($uibPosition.isScrollable(el)).toBe(true);
    });

    it('should return false if the element is scrollable', function() {
      el = angular.element('<div></div>');
      $document.find('body').append(el);
      expect($uibPosition.isScrollable(el)).toBe(false);
    });

  });

  describe('scrollParent', function() {
    var el;

    afterEach(function() {
      el.remove();
    });

    it('gets the closest scrollable ancestor', function() {
      el = angular.element('<div id="outer" style="overflow: auto;"><div>Foo<div id="inner">Bar</div></div></div>');

      $document.find('body').css({overflow: 'auto'}).append(el);

      var outerEl = document.getElementById('outer');
      var innerEl = document.getElementById('inner');

      var scrollParent = $uibPosition.scrollParent(innerEl);
      expect(scrollParent).toEqual(outerEl);
    });

    it('gets the closest scrollable ancestor with overflow-x: scroll', function() {
      el = angular.element('<div id="outer" style="overflow-x: scroll;"><div>Foo<div id="inner">Bar</div></div></div>');

      $document.find('body').css({overflow: 'auto'}).append(el);

      var outerEl = document.getElementById('outer');
      var innerEl = document.getElementById('inner');

      var scrollParent = $uibPosition.scrollParent(innerEl);
      expect(scrollParent).toEqual(outerEl);
    });

    it('gets the closest scrollable ancestor with overflow-y: hidden', function() {
      el = angular.element('<div id="outer" style="overflow-y: hidden;"><div>Foo<div id="inner">Bar</div></div></div>');

      $document.find('body').css({overflow: 'auto'}).append(el);

      var outerEl = document.getElementById('outer');
      var innerEl = document.getElementById('inner');

      var scrollParent = $uibPosition.scrollParent(innerEl, true);
      expect(scrollParent).toEqual(outerEl);
    });

    it('gets the document element if no scrollable ancestor exists', function() {
      el = angular.element('<div id="outer"><div>Foo<div id="inner">Bar</div></div></div>');

      $document.find('body').css({overflow: ''}).append(el);

      var innerEl = document.getElementById('inner');

      var scrollParent = $uibPosition.scrollParent(innerEl);
      expect(scrollParent).toEqual($document[0].documentElement);
    });

    it('gets the closest scrollable ancestor after a positioned ancestor when positioned absolute', function() {
      el = angular.element('<div id="outer" style="overflow: auto; position: relative;"><div style="overflow: auto;">Foo<div id="inner" style="position: absolute;">Bar</div></div></div>');

      $document.find('body').css({overflow: 'auto'}).append(el);

      var outerEl = document.getElementById('outer');
      var innerEl = document.getElementById('inner');

      var scrollParent = $uibPosition.scrollParent(innerEl);
      expect(scrollParent).toEqual(outerEl);
    });
  });

  describe('positionElements - append-to-body: false', function() {
    var el;

    beforeEach(function() {
      //mock position info normally queried from the DOM
      $uibPosition.position = function() {
        return {
          width: 20,
          height: 20,
          top: 100,
          left: 100
        };
      };
    });

    it('should position element on top-center by default', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'other')).toBePositionedAt(90, 105);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top')).toBePositionedAt(90, 105);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top-center')).toBePositionedAt(90, 105);
    });

    it('should position on top-left', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top-left')).toBePositionedAt(90, 100);
    });

    it('should position on top-right', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top-right')).toBePositionedAt(90, 110);
    });

    it('should position elements on bottom-center when "bottom" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom')).toBePositionedAt(120, 105);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom-center')).toBePositionedAt(120, 105);
    });

    it('should position elements on bottom-left', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom-left')).toBePositionedAt(120, 100);
    });

    it('should position elements on bottom-right', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom-right')).toBePositionedAt(120, 110);
    });

    it('should position elements on left-center when "left" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left')).toBePositionedAt(105, 90);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left-center')).toBePositionedAt(105, 90);
    });

    it('should position elements on left-top when "left-top" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left-top')).toBePositionedAt(100, 90);
    });

    it('should position elements on left-bottom when "left-bottom" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left-bottom')).toBePositionedAt(110, 90);
    });

    it('should position elements on right-center when "right" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right')).toBePositionedAt(105, 120);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right-center')).toBePositionedAt(105, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right-top')).toBePositionedAt(100, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right-bottom')).toBePositionedAt(110, 120);
    });
  });

  describe('positionElements - append-to-body: true', function() {
    beforeEach(function() {
      //mock offset info normally queried from the DOM
      $uibPosition.offset = function() {
        return {
          width: 20,
          height: 20,
          top: 100,
          left: 100
        };
      };
    });

    it('should position element on top-center by default', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'other', true)).toBePositionedAt(90, 105);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top', true)).toBePositionedAt(90, 105);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top-center', true)).toBePositionedAt(90, 105);
    });

    it('should position on top-left', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top-left', true)).toBePositionedAt(90, 100);
    });

    it('should position on top-right', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'top-right', true)).toBePositionedAt(90, 110);
    });

    it('should position elements on bottom-center when "bottom" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom', true)).toBePositionedAt(120, 105);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom-center', true)).toBePositionedAt(120, 105);
    });

    it('should position elements on bottom-left', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom-left', true)).toBePositionedAt(120, 100);
    });

    it('should position elements on bottom-right', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'bottom-right', true)).toBePositionedAt(120, 110);
    });

    it('should position elements on left-center when "left" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left', true)).toBePositionedAt(105, 90);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left-center', true)).toBePositionedAt(105, 90);
    });

    it('should position elements on left-top when "left-top" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left-top', true)).toBePositionedAt(100, 90);
    });

    it('should position elements on left-bottom when "left-bottom" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'left-bottom', true)).toBePositionedAt(110, 90);
    });

    it('should position elements on right-center when "right" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right', true)).toBePositionedAt(105, 120);
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right-center', true)).toBePositionedAt(105, 120);
    });

    it('should position elements on right-top when "right-top" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right-top', true)).toBePositionedAt(100, 120);
    });

    it('should position elements on right-bottom when "right-bottom" specified', function() {
      expect($uibPosition.positionElements({}, new TargetElMock(10, 10), 'right-bottom', true)).toBePositionedAt(110, 120);
    });
  });

  describe('smart positioning', function() {
    var viewportOffset, el;

    beforeEach(function() {
      el = angular.element('<div></div>');
      $document.find('body').append(el);

      //mock position info normally queried from the DOM
      $uibPosition.position = function() {
        return {
          width: 40,
          height: 40,
          top: 100,
          left: 100
        };
      };

      viewportOffset = {
        width: 10,
        height: 10,
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      };

      $uibPosition.viewportOffset = function() {
        return viewportOffset;
      };
    });

    afterEach(function() {
      el.remove();
    });

    // tests primary top -> bottom
    // tests secondary left -> right
    it('should position element on bottom-right when top-left does not fit', function() {
      viewportOffset.bottom = 20;
      viewportOffset.left = 20;
      el.css({ width: '60px', height: '20px' });
      expect($uibPosition.positionElements({}, el, 'auto top-left')).toBePositionedAt(140, 80);
    });

    // tests primary bottom -> top
    // tests secondary right -> left
    it('should position element on top-left when bottom-right does not fit', function() {
      viewportOffset.top = 20;
      viewportOffset.right = 20;
      el.css({ width: '60px', height: '20px' });
      expect($uibPosition.positionElements({}, el, 'auto bottom-right')).toBePositionedAt(80, 100);
    });

    // tests primary left -> right
    // tests secondary top -> bottom
    it('should position element on right-bottom when left-top does not fit', function() {
      viewportOffset.top = 20;
      viewportOffset.right = 20;
      el.css({ width: '20px', height: '60px' });
      expect($uibPosition.positionElements({}, el, 'auto left-top')).toBePositionedAt(80, 140);
    });

    // tests primary right -> left
    // tests secondary bottom -> top
    it('should position element on left-top when right-bottom does not fit', function() {
      viewportOffset.bottom = 20;
      viewportOffset.left = 20;
      el.css({ width: '20px', height: '60px' });
      expect($uibPosition.positionElements({}, el, 'auto right-bottom')).toBePositionedAt(100, 80);
    });

    // tests vertical center -> top
    it('should position element on left-top when left-center does not fit vetically', function() {
      viewportOffset.bottom = 100;
      el.css({ width: '20px', height: '120px' });
      expect($uibPosition.positionElements({}, el, 'auto left')).toBePositionedAt(100, 80);
    });

    // tests vertical center -> bottom
    it('should position element on left-bottom when left-center does not fit vertically', function() {
      viewportOffset.top = 100;
      el.css({ width: '20px', height: '120px' });
      expect($uibPosition.positionElements({}, el, 'auto left')).toBePositionedAt(20, 80);
    });

    // tests horizontal center -> left
    it('should position element on top-left when top-center does not fit horizontally', function() {
      viewportOffset.right = 100;
      el.css({ width: '120px', height: '20px' });
      expect($uibPosition.positionElements({}, el, 'auto top')).toBePositionedAt(80, 100);
    });

    // tests horizontal center -> right
    it('should position element on top-right when top-center does not fit horizontally', function() {
      viewportOffset.left = 100;
      el.css({ width: '120px', height: '20px' });
      expect($uibPosition.positionElements({}, el, 'auto top')).toBePositionedAt(80, 20);
    });
  });
});
