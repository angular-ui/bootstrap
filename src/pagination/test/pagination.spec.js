describe('pagination directive', function() {
  var $compile, $rootScope, $document, $templateCache, body, element;
  beforeEach(module('ui.bootstrap.pagination'));
  beforeEach(module('uib/template/pagination/pagination.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.total = 47; // 5 pages
    $rootScope.currentPage = 3;
    $rootScope.disabled = false;
    $document = _$document_;
    $templateCache = _$templateCache_;
    body = $document.find('body');
    element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage"></ul>')($rootScope);
    $rootScope.$digest();
  }));

  function getPaginationBarSize() {
    return element.find('li').length;
  }

  function getPaginationEl(index) {
    return element.find('li').eq(index);
  }

  // Returns a comma-separated string that represents the pager, like: "Prev, 1, 2, 3, Next"
  function getPaginationAsText() {
    var len = getPaginationBarSize(), outItems = [];
    for (var i = 0; i < len; i++) {
      outItems.push(getPaginationEl(i).text());
    }
    return outItems.join(', ');
  }

  function clickPaginationEl(index) {
    getPaginationEl(index).find('a').click();
  }

  function getPaginationLinkEl(elem, index) {
    return elem.find('li').eq(index).find('a');
  }

  function updateCurrentPage(value) {
    $rootScope.currentPage = value;
    $rootScope.$digest();
  }

  function setDisabled(value) {
    $rootScope.disabled = value;
    $rootScope.$digest();
  }

  it('has a "pagination" css class', function() {
    expect(element.hasClass('pagination')).toBe(true);
  });

  it('exposes the controller to the template', function() {
    $templateCache.put('uib/template/pagination/pagination.html', '<div>{{pagination.randomText}}</div>');
    var scope = $rootScope.$new();

    element = $compile('<ul uib-pagination></ul>')(scope);
    $rootScope.$digest();

    var ctrl = element.controller('uibPagination');

    expect(ctrl).toBeDefined();

    ctrl.randomText = 'foo';
    $rootScope.$digest();

    expect(element.html()).toBe('<div class="ng-binding">foo</div>');
  });

  it('allows custom templates', function() {
    $templateCache.put('foo/bar.html', '<div>baz</div>');
    var scope = $rootScope.$new();

    element = $compile('<ul uib-pagination template-url="foo/bar.html"></ul>')(scope);
    $rootScope.$digest();

    expect(element.html()).toBe('<div>baz</div>');
  });

  it('contains num-pages + 2 li elements', function() {
    expect(getPaginationBarSize()).toBe(7);
    expect(getPaginationEl(0).text()).toBe('Previous');
    expect(getPaginationEl(-1).text()).toBe('Next');
  });

  it('has the number of the page as text in each page item', function() {
    for (var i = 1; i <= 5; i++) {
      expect(getPaginationEl(i).text()).toEqual(''+i);
    }
  });

  it('sets the current page to be active', function() {
    expect(getPaginationEl($rootScope.currentPage).hasClass('active')).toBe(true);
  });

  it('disables the "previous" link if current page is 1', function() {
    updateCurrentPage(1);
    expect(getPaginationEl(0).hasClass('disabled')).toBe(true);
  });

  it('disables the "next" link if current page is last', function() {
    updateCurrentPage(5);
    expect(getPaginationEl(-1).hasClass('disabled')).toBe(true);
  });

  it('changes currentPage if a page link is clicked', function() {
    clickPaginationEl(2);
    expect($rootScope.currentPage).toBe(2);
  });

  it('changes currentPage if the "previous" link is clicked', function() {
    clickPaginationEl(0);
    expect($rootScope.currentPage).toBe(2);
  });

  it('changes currentPage if the "next" link is clicked', function() {
    clickPaginationEl(-1);
    expect($rootScope.currentPage).toBe(4);
  });

  it('does not change the current page on "previous" click if already at first page', function() {
    updateCurrentPage(1);
    clickPaginationEl(0);
    expect($rootScope.currentPage).toBe(1);
  });

  it('does not change the current page on "next" click if already at last page', function() {
    updateCurrentPage(5);
    clickPaginationEl(-1);
    expect($rootScope.currentPage).toBe(5);
  });

  it('changes the number of pages when `total-items` changes', function() {
    $rootScope.total = 78; // 8 pages
    $rootScope.$digest();

    expect(getPaginationBarSize()).toBe(10);
    expect(getPaginationEl(0).text()).toBe('Previous');
    expect(getPaginationEl(-1).text()).toBe('Next');
  });

  it('does not "break" when `total-items` is undefined', function() {
    $rootScope.total = undefined;
    $rootScope.$digest();

    expect(getPaginationBarSize()).toBe(3); // Previous, 1, Next
    expect(getPaginationEl(0)).toHaveClass('disabled');
    expect(getPaginationEl(1)).toHaveClass('active');
    expect(getPaginationEl(2)).toHaveClass('disabled');
  });

  it('does not "break" when `total-items` is negative', function() {
    $rootScope.total = -1;
    $rootScope.$digest();

    expect(getPaginationBarSize()).toBe(3); // Previous, 1, Next
    expect(getPaginationEl(0)).toHaveClass('disabled');
    expect(getPaginationEl(1)).toHaveClass('active');
    expect(getPaginationEl(2)).toHaveClass('disabled');
  });

  it('does not change the current page when `total-items` changes but is valid', function() {
    $rootScope.currentPage = 1;
    $rootScope.total = 18; // 2 pages
    $rootScope.$digest();

    expect($rootScope.currentPage).toBe(1);
  });

  it('should blur a page link after it has been clicked', function() {
    body.append(element);
    var linkEl = getPaginationLinkEl(element, 2);

    linkEl.focus();
    expect(linkEl).toHaveFocus();

    linkEl.click();
    expect(linkEl).not.toHaveFocus();

    element.remove();
  });

  it('should blur the "next" link after it has been clicked', function() {
    body.append(element);
    var linkEl = getPaginationLinkEl(element, -1);

    linkEl.focus();
    expect(linkEl).toHaveFocus();

    linkEl.click();
    expect(linkEl).not.toHaveFocus();

    element.remove();
  });

  it('should blur the "prev" link after it has been clicked', function() {
    body.append(element);
    var linkEl = getPaginationLinkEl(element, 0);

    linkEl.focus();
    expect(linkEl).toHaveFocus();

    linkEl.click();
    expect(linkEl).not.toHaveFocus();

    element.remove();
  });

  describe('`items-per-page`', function() {
    beforeEach(function() {
      $rootScope.perpage = 5;
      element = $compile('<ul uib-pagination total-items="total" items-per-page="perpage" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('changes the number of pages', function() {
      expect(getPaginationBarSize()).toBe(12);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });

    it('changes the number of pages when changes', function() {
      $rootScope.perpage = 20;
      $rootScope.$digest();

      expect(getPaginationBarSize()).toBe(5);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });

    it('selects the last page when current page is too big', function() {
      $rootScope.perpage = 30;
      $rootScope.$digest();

      expect($rootScope.currentPage).toBe(2);
      expect(getPaginationBarSize()).toBe(4);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });

    it('displays a single page when it is negative', function() {
      $rootScope.perpage = -1;
      $rootScope.$digest();

      expect(getPaginationBarSize()).toBe(3);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(1).text()).toBe('1');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });
  });

  describe('executes `ng-change` expression', function() {
    beforeEach(function() {
      $rootScope.selectPageHandler = jasmine.createSpy('selectPageHandler');
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" ng-change="selectPageHandler()"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('when an element is clicked', function() {
      clickPaginationEl(2);
      expect($rootScope.selectPageHandler).toHaveBeenCalled();
    });
  });

  describe('when `page` is not a number', function() {
    it('handles numerical string', function() {
      updateCurrentPage('2');
      expect(getPaginationEl(2)).toHaveClass('active');

      updateCurrentPage('04');
      expect(getPaginationEl(4)).toHaveClass('active');
    });

    it('defaults to 1 if non-numeric', function() {
      updateCurrentPage('pizza');
      expect(getPaginationEl(1)).toHaveClass('active');
    });
  });

  describe('with `max-size` option', function() {
    beforeEach(function() {
      $rootScope.total = 98; // 10 pages
      $rootScope.currentPage = 3;
      $rootScope.maxSize = 5;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" max-size="maxSize"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains maxsize + 2 li elements', function() {
      expect(getPaginationBarSize()).toBe($rootScope.maxSize + 2);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });

    it('shows the page number even if it can\'t be shown in the middle', function() {
      updateCurrentPage(1);
      expect(getPaginationEl(1)).toHaveClass('active');

      updateCurrentPage(10);
      expect(getPaginationEl(-2)).toHaveClass('active');
    });

    it('shows the page number in middle after the next link is clicked', function() {
      updateCurrentPage(6);
      clickPaginationEl(-1);

      expect($rootScope.currentPage).toBe(7);
      expect(getPaginationEl(3)).toHaveClass('active');
      expect(getPaginationEl(3).text()).toBe(''+$rootScope.currentPage);
    });

    it('shows the page number in middle after the prev link is clicked', function() {
      updateCurrentPage(7);
      clickPaginationEl(0);

      expect($rootScope.currentPage).toBe(6);
      expect(getPaginationEl(3)).toHaveClass('active');
      expect(getPaginationEl(3).text()).toBe(''+$rootScope.currentPage);
    });

    it('changes pagination bar size when max-size value changed', function() {
      $rootScope.maxSize = 7;
      $rootScope.$digest();
      expect(getPaginationBarSize()).toBe(9);
    });

    it('sets the pagination bar size to num-pages, if max-size is greater than num-pages ', function() {
      $rootScope.maxSize = 15;
      $rootScope.$digest();
      expect(getPaginationBarSize()).toBe(12);
    });

    it('should not change value of max-size expression, if max-size is greater than num-pages ', function() {
      $rootScope.maxSize = 15;
      $rootScope.$digest();
      expect($rootScope.maxSize).toBe(15);
    });

    it('should not display page numbers, if max-size is zero', function() {
      $rootScope.maxSize = 0;
      $rootScope.$digest();
      expect(getPaginationBarSize()).toBe(2);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });

    it('should blur page link when visible range changes', function () {
      body.append(element);
      var linkEl = getPaginationLinkEl(element, 4);

      linkEl.focus();
      expect(linkEl).toHaveFocus();

      linkEl.click();
      expect(linkEl).not.toHaveFocus();

      element.remove();
    });
  });

  describe('with `force-ellipses` option', function() {
    beforeEach(function() {
      $rootScope.total = 98; // 10 pages
      $rootScope.currentPage = 3;
      $rootScope.maxSize = 5;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" max-size="maxSize" force-ellipses="true"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains maxsize + 3 li elements', function() {
      expect(getPaginationBarSize()).toBe($rootScope.maxSize + 3);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
      expect(getPaginationEl(-2).text()).toBe('...');
    });

    it('shows the page number in middle after the next link is clicked', function() {
      updateCurrentPage(6);
      clickPaginationEl(-1);

      expect($rootScope.currentPage).toBe(7);
      expect(getPaginationEl(4)).toHaveClass('active');
      expect(getPaginationEl(4).text()).toBe(''+$rootScope.currentPage);
    });

    it('shows the page number in middle after the prev link is clicked', function() {
      updateCurrentPage(7);
      clickPaginationEl(0);

      expect($rootScope.currentPage).toBe(6);
      expect(getPaginationEl(4)).toHaveClass('active');
      expect(getPaginationEl(4).text()).toBe(''+$rootScope.currentPage);
    });

    it('changes pagination bar size when max-size value changed', function() {
      $rootScope.maxSize = 7;
      $rootScope.$digest();
      expect(getPaginationBarSize()).toBe(10);
    });

    it('should display an ellipsis on the right if the last displayed page\'s number is less than the last page', function() {
      updateCurrentPage(1);
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, ..., Next');
    });

    it('should display an ellipsis on the left if the first displayed page\'s number is greater than 1', function() {
      updateCurrentPage(10);
      expect(getPaginationAsText()).toBe('Previous, ..., 6, 7, 8, 9, 10, Next');
    });

    it('should display both ellipsis\' if the displayed range is in the middle', function() {
      updateCurrentPage(5);
      expect(getPaginationAsText()).toBe('Previous, ..., 3, 4, 5, 6, 7, ..., Next');
    });

    it('should not display any ellipses if the number of pages >= maxsize', function() {
      $rootScope.maxSize = 10;
      $rootScope.$digest();
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, Next');
    });
  });

  describe('with `boundary-link-numbers` option', function() {
    beforeEach(function() {
      $rootScope.total = 98; // 10 pages
      $rootScope.currentPage = 3;
      $rootScope.maxSize = 5;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" max-size="maxSize" boundary-link-numbers="true"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains maxsize + 4 li elements', function() {
      expect(getPaginationBarSize()).toBe($rootScope.maxSize + 4);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(-1).text()).toBe('Next');
      expect(getPaginationEl(-2).text()).toBe('10');
      expect(getPaginationEl(-3).text()).toBe('...');
    });

    it('shows the page number in middle after the next link is clicked', function() {
      updateCurrentPage(6);
      clickPaginationEl(-1);

      expect($rootScope.currentPage).toBe(7);
      expect(getPaginationEl(5)).toHaveClass('active');
      expect(getPaginationEl(5).text()).toBe(''+$rootScope.currentPage);
    });

    it('shows the page number in middle after the prev link is clicked', function() {
      updateCurrentPage(7);
      clickPaginationEl(0);

      expect($rootScope.currentPage).toBe(6);
      expect(getPaginationEl(5)).toHaveClass('active');
      expect(getPaginationEl(5).text()).toBe(''+$rootScope.currentPage);
    });

    it('changes pagination bar size when max-size value changed', function() {
      $rootScope.maxSize = 7;
      $rootScope.$digest();
      expect(getPaginationBarSize()).toBe(11);
    });

    it('should display an ellipsis on the right if the last displayed page\'s number is less than the last page', function() {
      updateCurrentPage(1);
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, ..., 10, Next');
    });

    it('should display an ellipsis on the left if the first displayed page\'s number is greater than 1', function() {
      updateCurrentPage(10);
      expect(getPaginationAsText()).toBe('Previous, 1, ..., 6, 7, 8, 9, 10, Next');
    });

    it('should display both ellipses if the displayed range is in the middle', function() {
      $rootScope.maxSize = 3;
      $rootScope.$digest();
      updateCurrentPage(6);
      expect(getPaginationAsText()).toBe('Previous, 1, ..., 5, 6, 7, ..., 10, Next');
    });

    it('should not display any ellipses if the number of pages >= maxsize', function() {
      $rootScope.maxSize = 10;
      $rootScope.$digest();
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, Next');
    });

    it('should not display an ellipsis on the left if the start page is 2', function() {
      updateCurrentPage(4);
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, 6, ..., 10, Next');
    });

    it('should not display an ellipsis on the left if the start page is 3', function() {
      updateCurrentPage(5);
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, 6, 7, ..., 10, Next');
    });

    it('should not display an ellipsis on the right if the end page is totalPages - 1', function() {
      updateCurrentPage(7);
      expect(getPaginationAsText()).toBe('Previous, 1, ..., 5, 6, 7, 8, 9, 10, Next');
    });

    it('should not display an ellipsis on the right if the end page is totalPages - 2', function() {
      updateCurrentPage(6);
      expect(getPaginationAsText()).toBe('Previous, 1, ..., 4, 5, 6, 7, 8, 9, 10, Next');
    });

    it('should not display any ellipses if the number of pages <= maxsize + 4 and current page is in center', function() {
      $rootScope.total = 88; // 9 pages
      $rootScope.$digest();
      updateCurrentPage(5);
      expect(getPaginationAsText()).toBe('Previous, 1, 2, 3, 4, 5, 6, 7, 8, 9, Next');
    });
  });

  describe('with `max-size` option & no `rotate`', function() {
    beforeEach(function() {
      $rootScope.total = 115; // 12 pages
      $rootScope.currentPage = 7;
      $rootScope.maxSize = 5;
      $rootScope.rotate = false;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" max-size="maxSize" rotate="rotate"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains maxsize + 4 elements', function() {
      expect(getPaginationBarSize()).toBe($rootScope.maxSize + 4);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(1).text()).toBe('...');
      expect(getPaginationEl(2).text()).toBe('6');
      expect(getPaginationEl(-3).text()).toBe('10');
      expect(getPaginationEl(-2).text()).toBe('...');
      expect(getPaginationEl(-1).text()).toBe('Next');
    });

    it('shows only the next ellipsis element on first page set', function() {
      updateCurrentPage(3);
      expect(getPaginationEl(1).text()).toBe('1');
      expect(getPaginationEl(-3).text()).toBe('5');
      expect(getPaginationEl(-2).text()).toBe('...');
    });

    it('shows only the previous ellipsis element on last page set', function() {
      updateCurrentPage(12);
      expect(getPaginationBarSize()).toBe(5);
      expect(getPaginationEl(1).text()).toBe('...');
      expect(getPaginationEl(2).text()).toBe('11');
      expect(getPaginationEl(-2).text()).toBe('12');
    });

    it('moves to the previous set when first ellipsis is clicked', function() {
      expect(getPaginationEl(1).text()).toBe('...');

      clickPaginationEl(1);

      expect($rootScope.currentPage).toBe(5);
      expect(getPaginationEl(-3)).toHaveClass('active');
    });

    it('moves to the next set when last ellipsis is clicked', function() {
      expect(getPaginationEl(-2).text()).toBe('...');

      clickPaginationEl(-2);

      expect($rootScope.currentPage).toBe(11);
      expect(getPaginationEl(2)).toHaveClass('active');
    });

    it('should not display page numbers, if max-size is zero', function() {
      $rootScope.maxSize = 0;
      $rootScope.$digest();

      expect(getPaginationBarSize()).toBe(2);
      expect(getPaginationEl(0).text()).toBe('Previous');
      expect(getPaginationEl(1).text()).toBe('Next');
    });
  });

  describe('pagination directive with `boundary-links`', function() {
    beforeEach(function() {
      element = $compile('<ul uib-pagination boundary-links="true" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains num-pages + 4 li elements', function() {
      expect(getPaginationBarSize()).toBe(9);
      expect(getPaginationEl(0).text()).toBe('First');
      expect(getPaginationEl(1).text()).toBe('Previous');
      expect(getPaginationEl(-2).text()).toBe('Next');
      expect(getPaginationEl(-1).text()).toBe('Last');
    });

    it('has first and last li elements visible', function() {
      expect(getPaginationEl(0).css('display')).not.toBe('none');
      expect(getPaginationEl(-1).css('display')).not.toBe('none');
    });


    it('disables the "first" & "previous" link if current page is 1', function() {
      updateCurrentPage(1);

      expect(getPaginationEl(0)).toHaveClass('disabled');
      expect(getPaginationEl(1)).toHaveClass('disabled');
    });

    it('disables the "last" & "next" link if current page is num-pages', function() {
      updateCurrentPage(5);

      expect(getPaginationEl(-2)).toHaveClass('disabled');
      expect(getPaginationEl(-1)).toHaveClass('disabled');
    });

    it('changes currentPage if the "first" link is clicked', function() {
      clickPaginationEl(0);
      expect($rootScope.currentPage).toBe(1);
    });

    it('changes currentPage if the "last" link is clicked', function() {
      clickPaginationEl(-1);
      expect($rootScope.currentPage).toBe(5);
    });

    it('does not change the current page on "first" click if already at first page', function() {
      updateCurrentPage(1);
      clickPaginationEl(0);
      expect($rootScope.currentPage).toBe(1);
    });

    it('does not change the current page on "last" click if already at last page', function() {
      updateCurrentPage(5);
      clickPaginationEl(-1);
      expect($rootScope.currentPage).toBe(5);
    });

    it('changes "first" & "last" text from attributes', function() {
      element = $compile('<ul uib-pagination boundary-links="true" first-text="<<<" last-text=">>>" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationEl(0).text()).toBe('<<<');
      expect(getPaginationEl(-1).text()).toBe('>>>');
    });

    it('changes "previous" & "next" text from attributes', function() {
      element = $compile('<ul uib-pagination boundary-links="true" previous-text="<<" next-text=">>" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationEl(1).text()).toBe('<<');
      expect(getPaginationEl(-2).text()).toBe('>>');
    });

    it('changes "first" & "last" text from interpolated attributes', function() {
      $rootScope.myfirstText = '<<<';
      $rootScope.mylastText = '>>>';
      element = $compile('<ul uib-pagination boundary-links="true" first-text="{{myfirstText}}" last-text="{{mylastText}}" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationEl(0).text()).toBe('<<<');
      expect(getPaginationEl(-1).text()).toBe('>>>');
    });

    it('changes "previous" & "next" text from interpolated attributes', function() {
      $rootScope.previousText = '<<';
      $rootScope.nextText = '>>';
      element = $compile('<ul uib-pagination boundary-links="true" previous-text="{{previousText}}" next-text="{{nextText}}" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationEl(1).text()).toBe('<<');
      expect(getPaginationEl(-2).text()).toBe('>>');
    });

    it('should blur the "first" link after it has been clicked', function() {
      body.append(element);
      var linkEl = getPaginationLinkEl(element, 0);

      linkEl.focus();
      expect(linkEl).toHaveFocus();

      linkEl.click();
      expect(linkEl).not.toHaveFocus();

      element.remove();
    });

    it('should blur the "last" link after it has been clicked', function() {
      body.append(element);
      var linkEl = getPaginationLinkEl(element, -1);

      linkEl.focus();
      expect(linkEl).toHaveFocus();

      linkEl.click();
      expect(linkEl).not.toHaveFocus();

      element.remove();
    });
  });

  describe('pagination directive with just number links', function() {
    beforeEach(function() {
      element = $compile('<ul uib-pagination direction-links="false" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains num-pages li elements', function() {
      expect(getPaginationBarSize()).toBe(5);
      expect(getPaginationEl(0).text()).toBe('1');
      expect(getPaginationEl(-1).text()).toBe('5');
    });

    it('has the number of the page as text in each page item', function() {
      for(var i = 0; i < 5; i++) {
        expect(getPaginationEl(i).text()).toEqual(''+(i+1));
      }
    });

    it('sets the current page to be active', function() {
      expect(getPaginationEl(2)).toHaveClass('active');
    });

    it('does not disable the "1" link if current page is 1', function() {
      updateCurrentPage(1);

      expect(getPaginationEl(0)).not.toHaveClass('disabled');
      expect(getPaginationEl(0)).toHaveClass('active');
    });

    it('does not disable the "last" link if current page is last page', function() {
      updateCurrentPage(5);

      expect(getPaginationEl(-1)).not.toHaveClass('disabled');
      expect(getPaginationEl(-1)).toHaveClass('active');
    });

    it('changes currentPage if a page link is clicked', function() {
      clickPaginationEl(1);
      expect($rootScope.currentPage).toBe(2);
    });

    it('changes the number of items when total items changes', function() {
      $rootScope.total = 73; // 8 pages
      $rootScope.$digest();

      expect(getPaginationBarSize()).toBe(8);
      expect(getPaginationEl(0).text()).toBe('1');
      expect(getPaginationEl(-1).text()).toBe('8');
    });
  });

  describe('with just boundary & number links', function() {
    beforeEach(function() {
      $rootScope.directions = false;
      element = $compile('<ul uib-pagination boundary-links="true" direction-links="directions" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains number of pages + 2 li elements', function() {
      expect(getPaginationBarSize()).toBe(7);
      expect(getPaginationEl(0).text()).toBe('First');
      expect(getPaginationEl(1).text()).toBe('1');
      expect(getPaginationEl(-2).text()).toBe('5');
      expect(getPaginationEl(-1).text()).toBe('Last');
    });

    it('disables the "first" & activates "1" link if current page is 1', function() {
      updateCurrentPage(1);

      expect(getPaginationEl(0)).toHaveClass('disabled');
      expect(getPaginationEl(1)).not.toHaveClass('disabled');
      expect(getPaginationEl(1)).toHaveClass('active');
    });

    it('disables the "last" & "next" link if current page is num-pages', function() {
      updateCurrentPage(5);

      expect(getPaginationEl(-2)).toHaveClass('active');
      expect(getPaginationEl(-2)).not.toHaveClass('disabled');
      expect(getPaginationEl(-1)).toHaveClass('disabled');
    });
  });

  describe('`num-pages`', function() {
    beforeEach(function() {
      $rootScope.numpg = null;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" num-pages="numpg"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('equals to total number of pages', function() {
      expect($rootScope.numpg).toBe(5);
    });

    it('changes when total number of pages change', function() {
      $rootScope.total = 73; // 8 pages
      $rootScope.$digest();
      expect($rootScope.numpg).toBe(8);
    });

    it('shows minimun one page if total items are not defined and does not break binding', function() {
      $rootScope.total = undefined;
      $rootScope.$digest();
      expect($rootScope.numpg).toBe(1);

      $rootScope.total = 73; // 8 pages
      $rootScope.$digest();
      expect($rootScope.numpg).toBe(8);
    });
  });

  describe('setting `paginationConfig`', function() {
    var originalConfig, paginationConfig;
    beforeEach(inject(function(_uibPaginationConfig_) {
      originalConfig = angular.copy(_uibPaginationConfig_);
      paginationConfig = _uibPaginationConfig_;
    }));
    afterEach(inject(function(_uibPaginationConfig_) {
      // return it to the original stat
      angular.copy(originalConfig, _uibPaginationConfig_);
    }));

    it('should change paging text', function() {
      paginationConfig.boundaryLinks = true;
      paginationConfig.directionLinks = true;
      paginationConfig.firstText = 'FI';
      paginationConfig.previousText = 'PR';
      paginationConfig.nextText = 'NE';
      paginationConfig.lastText = 'LA';
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationEl(0).text()).toBe('FI');
      expect(getPaginationEl(1).text()).toBe('PR');
      expect(getPaginationEl(-2).text()).toBe('NE');
      expect(getPaginationEl(-1).text()).toBe('LA');
    });

    it('contains number of pages + 2 li elements', function() {
      paginationConfig.itemsPerPage = 5;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationBarSize()).toBe(12);
    });

    it('should take maxSize defaults into account', function() {
      paginationConfig.maxSize = 2;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();

      expect(getPaginationBarSize()).toBe(4);
    });

    it('should take forceEllipses defaults into account', function () {
      paginationConfig.forceEllipses = true;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" max-size="2"></ul>')($rootScope);
      $rootScope.$digest();

      // Should contain 2 nav buttons, 2 pages, and 2 ellipsis since the currentPage defaults to 3, which is in the middle
      expect(getPaginationBarSize()).toBe(6);
    });

    it('should take boundaryLinkNumbers defaults into account', function () {
      paginationConfig.boundaryLinkNumbers = true;
      $rootScope.total = 88; // 9 pages
      $rootScope.currentPage = 5;
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" max-size="3"></ul>')($rootScope);
      $rootScope.$digest();

      // Should contain 2 nav buttons, 2 pages, 2 ellipsis, and 2 extra end numbers since the currentPage is in the middle
      expect(getPaginationBarSize()).toBe(9);
      expect(getPaginationAsText()).toBe('Previous, 1, ..., 4, 5, 6, ..., 9, Next');
    });
  });

  describe('override configuration from attributes', function() {
    beforeEach(function() {
      $rootScope.pageLabel = function(id) {
          return 'test_'+ id;
      };
      element = $compile('<ul uib-pagination boundary-links="true" page-label="pageLabel($page)" first-text="<<" previous-text="<" next-text=">" last-text=">>" total-items="total" ng-model="currentPage"></ul>')($rootScope);
      $rootScope.$digest();
    });

    it('contains number of pages + 4 li elements', function() {
      expect(getPaginationBarSize()).toBe(9);
    });

    it('should change paging text from attribute', function() {
      expect(getPaginationEl(0).text()).toBe('<<');
      expect(getPaginationEl(1).text()).toBe('<');
      expect(getPaginationEl(-2).text()).toBe('>');
      expect(getPaginationEl(-1).text()).toBe('>>');
    });

    it('has the label of the page as text in each page item', function() {
      for (var i = 1; i <= 5; i++) {
        // +1 because the first element is a <
        expect(getPaginationEl(i+1).text()).toEqual('test_'+i);
      }
    });
  });

  describe('disabled with ngDisable', function() {
    beforeEach(function() {
      element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage" ng-disabled="disabled"></ul>')($rootScope);
      $rootScope.currentPage = 3;
      $rootScope.$digest();
    });

    it('should not respond to clicking', function() {
      setDisabled(true);
      clickPaginationEl(2);
      expect($rootScope.currentPage).toBe(3);
      setDisabled(false);
      clickPaginationEl(2);
      expect($rootScope.currentPage).toBe(2);
    });

    it('should change the class of all buttons except selected one', function() {
      setDisabled(false);
      expect(getPaginationEl(3).hasClass('active')).toBe(true);
      expect(getPaginationEl(4).hasClass('active')).toBe(false);
      setDisabled(true);
      expect(getPaginationEl(3).hasClass('disabled')).toBe(false);
      expect(getPaginationEl(4).hasClass('disabled')).toBe(true);
    });
  });
});

describe('pagination directive', function() {
  var $compile, $rootScope, element;
  beforeEach(module('ui.bootstrap.pagination'));
  beforeEach(module('uib/template/pagination/pagination.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should retain the model value when total-items starts as undefined', function() {
    $rootScope.currentPage = 5;
    $rootScope.total = undefined;
    element = $compile('<ul uib-pagination total-items="total" ng-model="currentPage"></ul>')($rootScope);
    $rootScope.$digest();

    expect($rootScope.currentPage).toBe(5);

    $rootScope.total = 100;
    $rootScope.$digest();

    expect($rootScope.currentPage).toBe(5);
  });
});
