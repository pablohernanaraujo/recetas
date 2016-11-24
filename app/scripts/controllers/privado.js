'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('PrivadoCtrl', function ($scope, $rootScope, Data, $timeout, Authentication) {
  	$('.button-collapse').sideNav('hide');
  	$rootScope.PAGE = 'privado';

  	$scope.crearReceta = function(receta){
  		Data.crearReceta(receta, function(cb){
  			if(cb === 'guadado'){
  				$scope.newReceta = '';
  				Materialize.toast( 'Guardado con exito!' , 4000, 'green lighten-1');
  			}
  		});
  	};

    $scope.abrirEliminarModal = function(receta){
      $('.eliminarModal').css({
        display: 'block'
      });
      setTimeout(function(){
        $('.eliminarModal').css({
          opacity: 1
        });
      }, 100);
      $scope.eliminarReceta = receta;
    };

    $scope.cerrarEliminarModal = function(){
      $('.eliminarModal').css({
        opacity: 0
      });
      setTimeout(function(){
        $('.eliminarModal').css({
          display: 'none'
        });
      }, 500);
    };

    $scope.eliminarUnaReceta = function(eliminar){
      Data.eliminarReceta(eliminar);
      $timeout(function(){
        $scope.cerrarEliminarModal();
      },300);
    };

    $scope.guardarAvatar = function(){

      var file = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();
      var size = 500000;

      if (file) {
        if(file.size>size){
          Materialize.toast( 'La imagen debe pesar menos de 1 mega.' , 4000, 'red lighten-1');
        }else{
          Materialize.toast( 'Guardando avatar...' , 4000);
          reader.readAsDataURL(file);
          Authentication.subirAvatar(file);
        }
      } else {
        console.log('no exite la imagen');
      }
    };

  	$(document).ready(function(){
      $('ul.tabs').tabs();
    });
  });
