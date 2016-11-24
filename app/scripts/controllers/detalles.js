'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('DetallesCtrl', function ($scope, $rootScope, $stateParams, Data, $timeout) {
  	$rootScope.PAGE = 'privado';

    Data.miReceta($stateParams.id);

    $scope.guardarImagen = function(){

      var file = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();
      var size = 1000000;

      if (file) {
        if(file.size>size){
          Materialize.toast( 'La imagen debe pesar menos de 1 mega.' , 4000, 'red lighten-1');
        }else{
          Materialize.toast( 'Guardando imagen...' , 4000);
          reader.readAsDataURL(file);
          Data.subirImagen(file, $stateParams.id);
        }
      } else {
        console.log('no exite la imagen');
      }
    };

    $scope.guardarPaso = function(){
      Data.guardarPaso($scope.paso, $stateParams.id);
      $timeout(function(){
        $scope.paso = '';
      },300);
    };

    $scope.abrirPasosModal = function(paso, seccion, index, recetaId){
      $('.pasosModal').css({
        display: 'block'
      });
      setTimeout(function(){
        $('.pasosModal').css({
          opacity: 1
        });
      }, 10);
      $scope.seccion = seccion;
      $scope.pasoIndex = index;
      $scope.pasoTexto = paso.texto;
      $scope.pasoId = paso.id;
      $scope.recetaId = recetaId;
    };

    $scope.cerrarPasosModal = function(){
      $('.pasosModal').css({
        opacity: 0
      });
      setTimeout(function(){
        $('.pasosModal').css({
          display: 'none'
        });
      }, 500);
    };

    $scope.cambiarPaso = function(paso, pasoId, recetaId, seccion){
      if(seccion === 'Paso'){
        Data.cambiarPaso(paso, pasoId, recetaId);
      }
      if(seccion === 'Ingrediente'){
        Data.cambiarIngrediente(paso, pasoId, recetaId);
      }
    };


    $scope.abrirEliminarModal = function(paso, seccion, index, recetaId){
      $('.eliminarModal').css({
        display: 'block'
      });
      setTimeout(function(){
        $('.eliminarModal').css({
          opacity: 1
        });
      }, 100);
      $scope.eliminar = paso.id;
      $scope.seccion = seccion;
      $scope.eliminarIndex = index;
      $scope.eliminarRecetaId = recetaId;
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

    $scope.eliminarPaso = function(eliminar, eliminarRecetaId, seccion){
      if(seccion === 'Paso'){
        Data.eliminarPaso(eliminar, eliminarRecetaId);
      }
      if(seccion === 'Ingrediente'){
        Data.eliminarIngrediente(eliminar, eliminarRecetaId);
      }

      $timeout(function(){
        $scope.cerrarEliminarModal();
      },300);
    };

    /* INGREDIENTES ZONA */

    $scope.guardarIngrediente = function(){
      Data.guardarIngrediente($scope.ingrediente, $stateParams.id);
      $timeout(function(){
        $scope.ingrediente= '';
      },300);
    };

    /* poner online */

    $scope.ponerOnline = function(){
      $rootScope.RECETA.status = 2;
      $rootScope.RECETA.$save();
      Materialize.toast( 'Felicidades su receta esta online!!!' , 4000, 'green lighten-1');
    };

    $(document).ready(function() {
      $('input#input_text, textarea#textarea1').characterCounter();
    });

  });
