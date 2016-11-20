'use strict';

/**
 * @ngdoc overview
 * @name recetasApp
 * @description
 * # recetasApp
 *
 * Main module of the application.
 */
angular
  .module('recetasApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase',
    'angularLazyImg'
  ])
  .run(function(Authentication){
    angular.element(document).ready(function () {
      Authentication.requireAuth();
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('inicio',{
        url: '/inicio',
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl'
      })

      .state('privado',{
        url: '/privado',
        templateUrl: 'views/privado.html',
        controller: 'PrivadoCtrl',
        resolve: {
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      })

      ;

      $urlRouterProvider.otherwise('/inicio');
  });
