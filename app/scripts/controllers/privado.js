'use strict';

/**
 * @ngdoc function
 * @name recetasApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the recetasApp
 */
angular.module('recetasApp')
  .controller('PrivadoCtrl', function () {
  	$('.button-collapse').sideNav('hide');
  	
  	$(document).ready(function(){
      $('ul.tabs').tabs();
    });
  });
