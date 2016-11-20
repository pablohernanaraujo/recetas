'use strict';

angular.module('recetasApp')
  .factory('Authentication', function (firebase, $rootScope, $timeout, $location, $firebaseObject) {

    var firebaseConfig= {
      apiKey: 'AIzaSyCcUCRA3ae4PjQ4olgDqhO-WpwKGh8hr7I',
      authDomain: 'resetasapp.firebaseapp.com',
      databaseURL: 'https://resetasapp.firebaseio.com',
      storageBucket: 'resetasapp.appspot.com',
      messagingSenderId: '642728759157'
    };

    var firebaseApp = firebase.initializeApp(firebaseConfig);
    var firebaseAuth = firebaseApp.auth();
    var firebaseDb = firebaseApp.database();
    var firebaseST = firebase.storage();

    var usuarioActual = function(){
      firebaseAuth.onAuthStateChanged(function(user) {
        if(user){
          var usu = firebaseDb.ref('usuarios/' + user.uid);
          var cargandoUsuario = $firebaseObject(usu);
          cargandoUsuario.$loaded()
            .then(function(){
              $rootScope.USUARIO = cargandoUsuario;
              $('.se-pre-con').fadeOut('slow');
            })
            .catch(function(error){
              console.log(error);
            });
        }else{
          $rootScope.USUARIO = '';
          $location.path('/');
          $('.se-pre-con').fadeOut('slow');
        }
      });
    };
    

    return{
      registrarse: function(user){
        firebaseAuth.createUserWithEmailAndPassword(user.email,user.password)
        .then(function(regUser){
          firebaseDb.ref('usuarios').child(regUser.uid).set({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            id: regUser.uid,
            date: firebase.database.ServerValue.TIMESTAMP,
            status: 1
          });
          Materialize.toast( 'Bienvenido!!!' , 4000, 'green lighten-1');
          $('#registrarse').modal('close');
        })
        .catch(function(error){
          console.log(error);
          Materialize.toast( error.message , 4000, 'red lighten-1');
        });
      },
      logout: function(){
        firebaseAuth.signOut().then(function() {
        }, function(error) {
          console.log(error);
        });
      },
      login: function(user, fb){
        firebaseAuth.signInWithEmailAndPassword(user.email,user.password)
        .then(function(){
          var data = 'entramos';
          return fb(data);
        })
        .catch(function(error){
          console.log(error);
          Materialize.toast( error.message , 4000, 'red lighten-1');
        });
      },
      requireAuth: function(){
        usuarioActual();
      }
    };

  });