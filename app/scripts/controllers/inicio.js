'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('InicioCtrl', function (Authentication, $scope, $rootScope) {
    $('.button-collapse').sideNav('hide');
    $rootScope.PAGE = 'inicio';

  	$scope.userRegister = function(user){
      Authentication.registrarse(user);
    };

    $scope.userLogout = function(){
      Authentication.logout();
    };

    $scope.userLogin = function(user){
      Authentication.login(user, function(fb){
        $('#ingresar').modal('close');
      });
    };

    $(document).ready(function(){
      $('.modal').modal();
    });
  });
