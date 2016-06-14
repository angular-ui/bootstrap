describe('uib-dropdown', function() {
  var $animate, $compile, $rootScope, $document, $templateCache, dropdownConfig, element, $browser, $log;

  beforeEach(module('ngAnimateMock'));
  beforeEach(module('ui.bootstrap.dropdown'));

  beforeEach(inject(function(_$animate_, _$compile_, _$rootScope_, _$document_, _$templateCache_, uibDropdownConfig, _$browser_, _$log_) {
    $animate = _$animate_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
    $templateCache = _$templateCache_;
    dropdownConfig = uibDropdownConfig;
    $browser = _$browser_;
    $log = _$log_;
  }));

  afterEach(function() {
    element.remove();
  });

  var clickDropdownToggle = function(elm) {
    elm = elm || element;
    elm.find('a[uib-dropdown-toggle]').click();
  };

  var triggerKeyDown = function (element, keyCode) {
    var e = $.Event('keydown');
    spyOn(e, 'stopPropagation');
    e.stopPropagation.and.callThrough();
    e.which = keyCode;
    element.trigger(e);
    return e;
  };

  describe('basic', function() {
    function dropdown() {
      return $compile('<li uib-dropdown><a href uib-dropdown-toggle></a><ul uib-dropdown-menu><li><a href>Hello</a></li></ul></li>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
    });

    it('should toggle on `a` click', function() {
      expect(element).not.toHaveClass(dropdownConfig.openClass);
      clickDropdownToggle();
      expect(element).toHaveClass(dropdownConfig.openClass);
      clickDropdownToggle();
      expect(element).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should toggle when an option is clicked', function() {
      $document.find('body').append(element);
      expect(element).not.toHaveClass(dropdownConfig.openClass);
      clickDropdownToggle();
      expect(element).toHaveClass(dropdownConfig.openClass);

      var optionEl = element.find('ul > li').eq(0).find('a').eq(0);
      optionEl.click();
      expect(element).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should close on document click', function() {
      clickDropdownToggle();
      expect(element).toHaveClass(dropdownConfig.openClass);
      $document.click();
      expect(element).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should close on escape key & focus toggle element', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      var event = triggerKeyDown(dropdownMenu, 27);
      expect(element).not.toHaveClass(dropdownConfig.openClass);
      expect(element.find('a')).toHaveFocus();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should not close on backspace key', function() {
      clickDropdownToggle();
      triggerKeyDown(element, 8);
      expect(element).toHaveClass(dropdownConfig.openClass);
    });

    it('should not close on right click', function() {
      clickDropdownToggle();
      element.find('ul a').trigger({
        type: 'mousedown',
        which: 3
      });
      expect(element).toHaveClass(dropdownConfig.openClass);
    });

    it('should only allow one dropdown to be open at once', function() {
      var elm1 = dropdown();
      var elm2 = dropdown();
      expect(elm1).not.toHaveClass(dropdownConfig.openClass);
      expect(elm2).not.toHaveClass(dropdownConfig.openClass);

      clickDropdownToggle( elm1 );
      expect(elm1).toHaveClass(dropdownConfig.openClass);
      expect(elm2).not.toHaveClass(dropdownConfig.openClass);

      clickDropdownToggle( elm2 );
      expect(elm1).not.toHaveClass(dropdownConfig.openClass);
      expect(elm2).toHaveClass(dropdownConfig.openClass);
    });

    it('should not toggle if the element has `disabled` class', function() {
      var elm = $compile('<li uib-dropdown><a class="disabled" uib-dropdown-toggle></a><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
      clickDropdownToggle( elm );
      expect(elm).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should not toggle if the element is disabled', function() {
      var elm = $compile('<li uib-dropdown><button disabled="disabled" uib-dropdown-toggle></button><ul><li>Hello</li></ul></li>')($rootScope);
      elm.find('button').click();
      expect(elm).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should not toggle if the element has `ng-disabled` as true', function() {
      $rootScope.isdisabled = true;
      var elm = $compile('<li uib-dropdown><div ng-disabled="isdisabled" uib-dropdown-toggle></div><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
      $rootScope.$digest();
      elm.find('div').click();
      expect(elm).not.toHaveClass(dropdownConfig.openClass);

      $rootScope.isdisabled = false;
      $rootScope.$digest();
      elm.find('div').click();
      expect(elm).toHaveClass(dropdownConfig.openClass);
    });

    it('should unbind events on scope destroy', function() {
      var $scope = $rootScope.$new();
      var elm = $compile('<li uib-dropdown><button ng-disabled="isdisabled" uib-dropdown-toggle></button><ul uib-dropdown-menu><li>Hello</li></ul></li>')($scope);
      $scope.$digest();

      var buttonEl = elm.find('button');
      buttonEl.click();
      expect(elm).toHaveClass(dropdownConfig.openClass);
      buttonEl.click();
      expect(elm).not.toHaveClass(dropdownConfig.openClass);

      $scope.$destroy();
      buttonEl.click();
      expect(elm).not.toHaveClass(dropdownConfig.openClass);
    });

    // issue 270
    it('executes other document click events normally', function() {
      var checkboxEl = $compile('<input type="checkbox" ng-click="clicked = true" />')($rootScope);
      $rootScope.$digest();

      expect(element).not.toHaveClass(dropdownConfig.openClass);
      expect($rootScope.clicked).toBeFalsy();

      clickDropdownToggle();
      expect(element).toHaveClass(dropdownConfig.openClass);
      expect($rootScope.clicked).toBeFalsy();

      checkboxEl.click();
      expect($rootScope.clicked).toBeTruthy();
    });

    // WAI-ARIA
    it('should aria markup to the `dropdown-toggle`', function() {
      var toggleEl = element.find('a');
      expect(toggleEl.attr('aria-haspopup')).toBe('true');
      expect(toggleEl.attr('aria-expanded')).toBe('false');

      clickDropdownToggle();
      expect(toggleEl.attr('aria-expanded')).toBe('true');
      clickDropdownToggle();
      expect(toggleEl.attr('aria-expanded')).toBe('false');
    });

    // pr/issue 3274
    it('should not raise $digest:inprog if dismissed during a digest cycle', function() {
      clickDropdownToggle();
      expect(element).toHaveClass(dropdownConfig.openClass);

      $rootScope.$apply(function() {
        $document.click();
      });

      expect(element).not.toHaveClass(dropdownConfig.openClass);
    });
  });

  describe('using dropdownMenuTemplate', function() {
    function dropdown() {
      $templateCache.put('custom.html', '<ul class="uib-dropdown-menu"><li>Item 1</li></ul>');

      return $compile('<li uib-dropdown><a href uib-dropdown-toggle></a><ul uib-dropdown-menu template-url="custom.html"></ul></li>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
    });

    it('should apply custom template for dropdown menu', function() {
      element.find('a').click();
      expect(element.find('ul.uib-dropdown-menu').eq(0).find('li').eq(0).text()).toEqual('Item 1');
    });

    it('should clear ul when dropdown menu is closed', function() {
      element.find('a').click();
      expect(element.find('ul.uib-dropdown-menu').eq(0).find('li').eq(0).text()).toEqual('Item 1');
      element.find('a').click();
      expect(element.find('ul.uib-dropdown-menu').eq(0).find('li').length).toEqual(0);
    });
  });

  describe('using dropdown-append-to-body', function() {
    function dropdown() {
      return $compile('<li uib-dropdown dropdown-append-to-body><a href uib-dropdown-toggle></a><ul uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Body</a></li></ul></li>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
      $document.find('body').append(element);
    });

    afterEach(function() {
      element.remove();
    });

    it('adds the menu to the body', function() {
      expect($document.find('#dropdown-menu').parent()[0]).toBe($document.find('body')[0]);
    });

    it('focuses the dropdown element on close', function() {
      var toggle = element.find('[uib-dropdown-toggle]');
      var menu = $document.find('#dropdown-menu a');
      toggle.trigger('click');
      menu.focus();

      menu.trigger('click');

      expect(document.activeElement).toBe(toggle[0]);
    });

    it('removes the menu when the dropdown is removed', function() {
      element.remove();
      $rootScope.$digest();
      expect($document.find('#dropdown-menu').length).toEqual(0);
    });
  });

  describe('using dropdown-append-to', function() {
    var initialPage;

    function dropdown() {
      return $compile('<li uib-dropdown dropdown-append-to="appendTo"><a href uib-dropdown-toggle></a><ul class="dropdown-menu" uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Container</a></li></ul></li>')($rootScope);
    }

    beforeEach(function() {
      $document.find('body').append(angular.element('<div id="dropdown-container"></div>'));

      $rootScope.appendTo = $document.find('#dropdown-container');

      element = dropdown();
      $document.find('body').append(element);
    });

    afterEach(function() {
      // Cleanup the extra elements we appended
      $document.find('#dropdown-container').remove();
    });

    it('appends to container', function() {
      expect($document.find('#dropdown-menu').parent()[0].id).toBe('dropdown-container');
    });

    it('toggles open class on container', function() {
      var container = $document.find('#dropdown-container');

      expect(container).not.toHaveClass('uib-dropdown-open');
      element.find('[uib-dropdown-toggle]').click();
      expect(container).toHaveClass('uib-dropdown-open');
      element.find('[uib-dropdown-toggle]').click();
      expect(container).not.toHaveClass('uib-dropdown-open');
    });

    it('focuses the dropdown element on close', function() {
      var toggle = element.find('[uib-dropdown-toggle]');
      var menu = $document.find('#dropdown-menu a');
      toggle.trigger('click');
      menu.focus();

      menu.trigger('click');

      expect(document.activeElement).toBe(toggle[0]);
    });

    it('removes the menu when the dropdown is removed', function() {
      element.remove();
      $rootScope.$digest();
      expect($document.find('#dropdown-menu').length).toEqual(0);
    });
  });

  describe('using is-open', function() {
    describe('with uib-dropdown-toggle', function() {
      beforeEach(function() {
        $rootScope.isopen = true;
        element = $compile('<li uib-dropdown is-open="isopen"><a href uib-dropdown-toggle></a><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
        $rootScope.$digest();
      });

      it('should be open initially', function() {
        expect(element).toHaveClass(dropdownConfig.openClass);
      });

      it('should change `is-open` binding when toggles', function() {
        clickDropdownToggle();
        expect($rootScope.isopen).toBe(false);
      });

      it('should toggle when `is-open` changes', function() {
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });

      it('focus toggle element when opening', function() {
        $document.find('body').append(element);
        clickDropdownToggle();
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(element.find('a')).not.toHaveFocus();
        $rootScope.isopen = true;
        $rootScope.$digest();
        expect(element.find('a')).toHaveFocus();
      });
    });

    describe('without uib-dropdown-toggle', function() {
      beforeEach(function() {
        $rootScope.isopen = true;
        element = $compile('<li uib-dropdown is-open="isopen"><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
        $rootScope.$digest();
      });

      it('should be open initially', function() {
        expect(element).toHaveClass(dropdownConfig.openClass);
      });

      it('should toggle when `is-open` changes', function() {
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });
    });
  });

  describe('using on-toggle', function() {
    describe('with is-open to false', function() {
      beforeEach(function() {
        $rootScope.toggleHandler = jasmine.createSpy('toggleHandler');
        $rootScope.isopen = false;
        element = $compile('<li uib-dropdown on-toggle="toggleHandler(open)" is-open="isopen"><a uib-dropdown-toggle></a><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
        $rootScope.$digest();
      });

      it('should not have been called initially', function() {
        expect($rootScope.toggleHandler).not.toHaveBeenCalled();
      });

      it('should call it correctly when toggles', function() {
        $rootScope.isopen = true;
        $rootScope.$digest();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(true);

        clickDropdownToggle();
        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(false);
      });
    });

    describe('with is-open to true', function() {
      beforeEach(function() {
        $rootScope.toggleHandler = jasmine.createSpy('toggleHandler');
        $rootScope.isopen = true;
        element = $compile('<li uib-dropdown on-toggle="toggleHandler(open)" is-open="isopen"><a uib-dropdown-toggle></a><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
        $rootScope.$digest();
      });

      it('should not have been called initially', function() {
        expect($rootScope.toggleHandler).not.toHaveBeenCalled();
      });

      it('should call it correctly when toggles', function() {
        $rootScope.isopen = false;
        $rootScope.$digest();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(false);

        $rootScope.isopen = true;
        $rootScope.$digest();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(true);
      });
    });

    describe('without is-open', function() {
      beforeEach(function() {
        $rootScope.toggleHandler = jasmine.createSpy('toggleHandler');
        element = $compile('<li uib-dropdown on-toggle="toggleHandler(open)"><a uib-dropdown-toggle></a><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
        $rootScope.$digest();
      });

      it('should not have been called initially', function() {
        expect($rootScope.toggleHandler).not.toHaveBeenCalled();
      });

      it('should call it when clicked', function() {
        clickDropdownToggle();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(true);

        clickDropdownToggle();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('using auto-close', function() {
    function dropdown(autoClose) {
      return $compile('<li uib-dropdown ' +
        (autoClose === undefined ? '' : 'auto-close="' + autoClose + '"') +
        '><a href uib-dropdown-toggle></a><ul uib-dropdown-menu><li><a href>Hello</a></li></ul></li>')($rootScope);
    }

    describe('always', function() {
      it('should close on document click if no auto-close is specified', function() {
        element = dropdown();
        clickDropdownToggle();
        expect(element).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should close on document click if empty auto-close is specified', function() {
        element = dropdown('');
        clickDropdownToggle();
        expect(element).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });
    });

    describe('disabled', function() {
      it('auto-close="disabled"', function() {
        element = dropdown('disabled');
        clickDropdownToggle();
        expect(element).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(element).toHaveClass(dropdownConfig.openClass);
      });

      it('control with is-open', function() {
        $rootScope.isopen = true;
        element = $compile('<li uib-dropdown is-open="isopen" auto-close="disabled"><a href uib-dropdown-toggle></a><ul uib-dropdown-menu><li>Hello</li></ul></li>')($rootScope);
        $rootScope.$digest();

        expect(element).toHaveClass(dropdownConfig.openClass);
        //should remain open
        $document.click();
        expect(element).toHaveClass(dropdownConfig.openClass);
        //now should close
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should close anyway if toggle is clicked', function() {
        element = dropdown('disabled');
        clickDropdownToggle();
        expect(element).toHaveClass(dropdownConfig.openClass);
        clickDropdownToggle();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should close anyway if esc is pressed', function() {
        element = dropdown('disabled');
        var dropdownMenu = element.find('[uib-dropdown-menu]');
        $document.find('body').append(element);
        clickDropdownToggle();
        triggerKeyDown(dropdownMenu, 27);
        expect(element).not.toHaveClass(dropdownConfig.openClass);
        expect(element.find('a')).toHaveFocus();
      });

      it('should close anyway if another dropdown is opened', function() {
        var elm1 = dropdown('disabled');
        var elm2 = dropdown();
        expect(elm1).not.toHaveClass(dropdownConfig.openClass);
        expect(elm2).not.toHaveClass(dropdownConfig.openClass);
        clickDropdownToggle(elm1);
        expect(elm1).toHaveClass(dropdownConfig.openClass);
        expect(elm2).not.toHaveClass(dropdownConfig.openClass);
        clickDropdownToggle(elm2);
        expect(elm1).not.toHaveClass(dropdownConfig.openClass);
        expect(elm2).toHaveClass(dropdownConfig.openClass);
      });
    });

    describe('outsideClick', function() {
      it('should close only on a click outside of the dropdown menu', function() {
        element = dropdown('outsideClick');
        clickDropdownToggle();
        expect(element).toHaveClass(dropdownConfig.openClass);
        element.find('ul li a').click();
        expect(element).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(element).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should work with dropdown-append-to-body', function() {
        element = $compile('<li uib-dropdown dropdown-append-to-body auto-close="outsideClick"><a href uib-dropdown-toggle></a><ul uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Body</a></li></ul></li>')($rootScope);
        clickDropdownToggle();
        var dropdownMenu = $document.find('#dropdown-menu');
        expect(dropdownMenu.parent()).toHaveClass(dropdownConfig.appendToOpenClass);
        dropdownMenu.find('li').eq(0).trigger('click');
        expect(dropdownMenu.parent()).toHaveClass(dropdownConfig.appendToOpenClass);
        $document.click();
        expect(dropdownMenu.parent()).not.toHaveClass(dropdownConfig.appendToOpenClass);
      });
    });
  });

  describe('using keyboard-nav', function() {
    function dropdown() {
      return $compile('<li uib-dropdown keyboard-nav><a href uib-dropdown-toggle></a><ul uib-dropdown-menu><li><a href>Hello</a></li><li><a href>Hello Again</a></li></ul></li>')($rootScope);
    }
    beforeEach(function() {
      element = dropdown();
    });

    it('should focus first list element when down arrow pressed', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(dropdownMenu, 40);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var optionEl = element.find('ul').eq(0).find('a').eq(0);
      expect(optionEl).toHaveFocus();
    });

    it('should not focus first list element when down arrow pressed if closed', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      triggerKeyDown(dropdownMenu, 40);

      expect(element).not.toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a').eq(0);
      expect(focusEl).not.toHaveFocus();
    });

    it('should focus second list element when down arrow pressed twice', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(dropdownMenu, 40);
      triggerKeyDown(dropdownMenu, 40);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a').eq(1);
      expect(focusEl).toHaveFocus();
    });

    it('should not focus first list element when up arrow pressed after dropdown toggled', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      expect(element).toHaveClass(dropdownConfig.openClass);

      triggerKeyDown(dropdownMenu, 38);
      var focusEl = element.find('ul').eq(0).find('a').eq(0);
      expect(focusEl).not.toHaveFocus();
    });

    it('should focus last list element when up arrow pressed after dropdown toggled', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(dropdownMenu, 38);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a').eq(1);
      expect(focusEl).toHaveFocus();
    });

    it('should not change focus when other keys are pressed', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(dropdownMenu, 37);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a');
      expect(focusEl[0]).not.toHaveFocus();
      expect(focusEl[1]).not.toHaveFocus();
    });

    it('should focus first list element when down arrow pressed 2x and up pressed 1x', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(dropdownMenu, 40);
      triggerKeyDown(dropdownMenu, 40);

      triggerKeyDown(dropdownMenu, 38);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a').eq(0);
      expect(focusEl).toHaveFocus();
    });

    it('should stay focused on final list element if down pressed at list end', function() {
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(dropdownMenu, 40);
      triggerKeyDown(dropdownMenu, 40);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a').eq(1);
      expect(focusEl).toHaveFocus();

      triggerKeyDown(element, 40);
      expect(focusEl).toHaveFocus();
    });

    it('should close if esc is pressed while focused', function() {
      element = dropdown('disabled');
      var dropdownMenu = element.find('[uib-dropdown-menu]');
      $document.find('body').append(element);
      clickDropdownToggle();

      triggerKeyDown(dropdownMenu, 40);

      expect(element).toHaveClass(dropdownConfig.openClass);
      var focusEl = element.find('ul').eq(0).find('a').eq(0);
      expect(focusEl).toHaveFocus();

      triggerKeyDown(dropdownMenu, 27);
      expect(element).not.toHaveClass(dropdownConfig.openClass);
    });

    describe('with dropdown-append-to-body', function() {
      function dropdown() {
        return $compile('<li uib-dropdown dropdown-append-to-body keyboard-nav><a href uib-dropdown-toggle></a><ul uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Body</a></li><li><a href>Hello Again</a></li></ul></li>')($rootScope);
      }

      beforeEach(function() {
        element = dropdown();
      });

      it('should focus first list element when down arrow pressed', function() {
        clickDropdownToggle();

        var dropdownMenu = $document.find('#dropdown-menu');

        triggerKeyDown(dropdownMenu, 40);

        expect(dropdownMenu.parent()).toHaveClass(dropdownConfig.appendToOpenClass);
        var focusEl = $document.find('ul').eq(0).find('a');
        expect(focusEl).toHaveFocus();
      });

      it('should focus second list element when down arrow pressed twice', function() {
        clickDropdownToggle();
        var dropdownMenu = $document.find('#dropdown-menu');
        triggerKeyDown(dropdownMenu, 40);
        triggerKeyDown(dropdownMenu, 40);
        triggerKeyDown(dropdownMenu, 40);

        expect(dropdownMenu.parent()).toHaveClass(dropdownConfig.appendToOpenClass);
        var elem1 = $document.find('ul');
        var elem2 = elem1.find('a');
        var focusEl = $document.find('ul').eq(0).find('a').eq(1);
        expect(focusEl).toHaveFocus();
      });
    });
  });

  // issue #5942
  describe('using dropdown-append-to-body with dropdown-menu-right class', function() {
    function dropdown() {
      return $compile('<li style="float: right;" uib-dropdown dropdown-append-to-body><a href uib-dropdown-toggle>Toggle menu</a><ul uib-dropdown-menu class="dropdown-menu-right" id="dropdown-menu"><li><a href>Hello On Body</a></li></ul></li>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
      $document.find('body').append(element);

      var menu = $document.find('#dropdown-menu');
      menu.css('position', 'absolute');
    });

    afterEach(function() {
      element.remove();
    });

    it('should align the menu correctly when the body has no vertical scrollbar', function() {
      var toggle = element.find('[uib-dropdown-toggle]');
      var menu = $document.find('#dropdown-menu');
      toggle.trigger('click');

      // Get the offsets of the rightmost position of both the toggle and the menu (offset from the left of the window)
      var toggleRight = Math.round(toggle.offset().left + toggle.outerWidth());
      var menuRight = Math.round(menu.offset().left + menu.outerWidth());
      expect(menuRight).toBe(toggleRight);
    });
  });
});
