'use strict';

describe('Controller: InicioCtrl', function () {

  // load the controller's module
  beforeEach(module('recetasApp'));

  var InicioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InicioCtrl = $controller('InicioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should work', function () {
    expect(true).toBe(true);
  });
});
