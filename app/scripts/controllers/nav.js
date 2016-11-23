'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('NavCtrl', function (Authentication, $scope, $rootScope) {

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

    $scope.abrirMenu = function(){
      console.log('abrir menu');
      // $('.button-collapse').sideNav('destroy');
      // $('.button-collapse').sideNav('show');
    };

    $(document).ready(function(){
      $('.modal').modal();
    });
  });
