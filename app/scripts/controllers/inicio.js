'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('InicioCtrl', function (Authentication, $scope, $rootScope, Fire, $firebaseObject) {

    var cargarRecetas = Fire.firebaseDb().ref('recetas');
    var recetasUsuarios = $firebaseObject(cargarRecetas);
    recetasUsuarios.$loaded(function(data){
      var allRecipe = [];
      for (var k in data){
        if (data.hasOwnProperty(k)){
          var obj  = data[k];
          for (var i in obj){
            if (obj.hasOwnProperty(i)){
              if(obj[i].status === 2){
                allRecipe.push(obj[i]);
              }
            }
          }
        }
      }
      $scope.recipes = allRecipe;
    });

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

    $scope.abrirBuscador = function(){
      $('.fixed-action-btn').css({
        right: '-60px'
      });
      $('.buscadorContenedor').css({
        bottom: '0px'
      });
      $('#buscador').focus();
    };

    $scope.cerrarBuscador = function(){
      $('.fixed-action-btn').css({
        right: '20px'
      });
      $('.buscadorContenedor').css({
        bottom: '-75px'
      });
      $('#buscador').focusout();
    };

    $(document).ready(function(){
      $('.modal').modal();
    });
  });
