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

    /* PONER ONLINE */

    $scope.ponerOnline = function(){
      $rootScope.RECETA.status = 2;
      $rootScope.RECETA.$save();
      Materialize.toast( 'Felicidades su receta esta online!!!' , 4000, 'green lighten-1');
    };

    /* CATEGORIAS */

    $scope.categories = [
      {texto: 'Pastas'},
      {texto: 'Carnes'},
      {texto: 'Vegetariana'}
    ];
    $scope.categorias = {};

    $scope.seleccionarCategoria = function(categoria){
      if(categoria === undefined){
        Materialize.toast( 'Debe seleccionar un categoria.' , 4000, 'red lighten-1');
      }else{
        Data.subirCategoria(categoria, $stateParams.id);
        $scope.categorias = {};
      }
    };

    $scope.eliminarCategoria = function(categoriaId){
      Data.eliminarCategoria(categoriaId, $stateParams.id);
      Materialize.toast( 'Categoria eliminada.' , 4000);
    };

    /* IMAGEN */

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

    /* PASOS */

    $scope.guardarPaso = function(){
      Data.guardarPaso($scope.paso, $stateParams.id);
      $timeout(function(){
        $scope.paso = '';
      },300);
    };

    $scope.cambiarPaso = function(paso, pasoId, recetaId, seccion){
      if(seccion === 'Paso'){
        Data.cambiarPaso(paso, pasoId, recetaId);
      }
      if(seccion === 'Ingrediente'){
        Data.cambiarIngrediente(paso, pasoId, recetaId);
      }
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

    /* COCCION */

    $scope.coccion = {};

    $scope.guardarCoccion = function(hora, min){
      if (hora === '0' ) {
        if (min === '0' ) {
          Materialize.toast( 'Debe seleccionar tiempo diferente de cero.' , 4000, 'red lighten-1');
        }else{
          Data.guardarCoccion(hora, min, $stateParams.id);
          $scope.coccion = {};
          Materialize.toast( 'Tiempo de cocción guardado exitosamente.' , 4000, 'green lighten-1');
        }
      }else{
        Data.guardarCoccion(hora, min, $stateParams.id);
        $scope.coccion = {};
        Materialize.toast( 'Tiempo de cocción guardado exitosamente.' , 4000, 'green lighten-1');
      }
    };

    $scope.eliminarCoccion = function(){
      Data.eliminarCoccion($stateParams.id);
      Materialize.toast( 'Tiempo de cocción eliminado.' , 4000);
    };

    /* PORCIONES */

    $scope.porciones = {};

    $scope.guardarPorciones = function(porcion){
      Data.guardarPorciones(porcion, $stateParams.id);
      $scope.porciones = {};
      Materialize.toast( 'Porciones guardadas exitosamente.' , 4000, 'green lighten-1');
    };

    $scope.eliminarPorciones = function(){
      Data.eliminarPorciones($stateParams.id);
      Materialize.toast( 'Porciones eliminada.' , 4000);
    };

    /* MODALES */

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

    $(document).ready(function() {
      $('input#input_text, textarea#textarea1').characterCounter();
    });

  });
