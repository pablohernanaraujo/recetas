'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('RecetaCtrl', function ($scope, $rootScope, $stateParams) {

    angular.forEach($rootScope.RECIPES, function(value) {
      if(value.id === $stateParams.id){
        console.log(value);
        $scope.receta = value;
      }
    });

    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  });
