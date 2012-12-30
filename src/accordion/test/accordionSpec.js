describe('accordion', function () {

  var scope, $compile, $controller;
  beforeEach(module('ui.bootstrap.accordion'));
  beforeEach(module('template/accordion/accordion.html', 'template/accordion/accordion-group.html'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $controller = _$controller_;
  }));

  describe('accordion controller', function () {

    var ctrl;
    beforeEach(function () {
      ctrl = $controller('AccordionController', {$scope:scope});
    });

    it('should allow group selection', function () {
      var first = {}, second = {};
      ctrl.addGroup(first);
      ctrl.addGroup(second);

      expect(first.selected).toBeFalsy();
      expect(second.selected).toBeFalsy();

      ctrl.select(second);
      expect(first.selected).toBeFalsy();
      expect(second.selected).toBeTruthy();

      ctrl.select(first);
      expect(first.selected).toBeTruthy();
      expect(second.selected).toBeFalsy();
    });

    it('it should un-select selected groups when a new selected group is added', function () {
      var first = {selected:true}, second = {selected:true};
      ctrl.addGroup(first);
      ctrl.addGroup(second);

      expect(first.selected).toBeFalsy();
      expect(second.selected).toBeTruthy();
    });

    it('should ignore remove of non-existing group', function () {
      ctrl.removeGroup({});
    });
  });

  describe('accordion DOM manipulations', function () {

    var element, groups;
    var findGroupLink = function (index) {
      return groups.eq(index).find('a').eq(0);
    };
    var findGroupBody = function (index) {
      return groups.eq(index).find('div.accordion-body').eq(0);
    };

    describe('static accordion', function () {
      beforeEach(function () {
        var tpl =
          "<accordion>" +
            "<accordion-group title=\"title 1\">Content 1</accordion-group>" +
            "<accordion-group title=\"title 2\">Content 2</accordion-group>" +
            "</accordion>";
        element = angular.element(tpl);
        $compile(element)(scope);
        scope.$digest();
        groups = element.find('div.accordion div.accordion-group');
      });

      it('should create accordion groups with content', function () {

        expect(groups.length).toEqual(2);
        expect(findGroupLink(0).text()).toEqual('title 1');
        expect(findGroupBody(0).text().trim()).toEqual('Content 1');
        expect(findGroupLink(1).text()).toEqual('title 2');
        expect(findGroupBody(1).text().trim()).toEqual('Content 2');
      });

      it('should change selected element on click', function () {

        findGroupLink(0).click();
        expect(findGroupBody(0)).toHaveClass('in');
        expect(findGroupBody(1)).not.toHaveClass('in');

        findGroupLink(1).click();
        expect(findGroupBody(0)).not.toHaveClass('in');
        expect(findGroupBody(1)).toHaveClass('in');
      });

      it('should toggle element on click', function() {
        findGroupLink(0).click();
        expect(findGroupBody(0)).toHaveClass('in');
        findGroupLink(0).click();
        expect(findGroupBody(0)).not.toHaveClass('in');
      });
    });

    describe('dynamic accordion', function () {

      var element, model;
      beforeEach(function () {
        var tpl =
          "<accordion>" +
            "<accordion-group ng-repeat='group in groups' title='{{group.name}}'>{{group.content}}</accordion-group>" +
            "</accordion>";
        element = angular.element(tpl);
        model = [
          {name: 'title 1', content: 'Content 1'},
          {name: 'title 2', content: 'Content 2'}
        ];
      });

      it('should generate accordion groups using ng-repeat', function () {

        $compile(element)(scope);
        scope.$digest();

        groups = element.find('div.accordion div.accordion-group');
        expect(groups.length).toEqual(0);

        scope.$apply(function(){
           scope.groups = model;
        });
        groups = element.find('div.accordion div.accordion-group');
        expect(groups.length).toEqual(2);
        expect(findGroupLink(0).text()).toEqual('title 1');
        expect(findGroupBody(0).text().trim()).toEqual('Content 1');
        expect(findGroupLink(1).text()).toEqual('title 2');
        expect(findGroupBody(1).text().trim()).toEqual('Content 2');
      });

      it('should react properly on removing items from the model', function () {
        scope.groups = model;
        $compile(element)(scope);

        scope.$digest();
        groups = element.find('div.accordion div.accordion-group');
        expect(groups.length).toEqual(2);

        scope.groups.splice(0,1);
        scope.$digest();
        groups = element.find('div.accordion div.accordion-group');
        expect(groups.length).toEqual(1);
      });
    });

  });
});