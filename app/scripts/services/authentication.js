'use strict';

angular.module('recetasApp')
  .factory('Authentication', function (Fire, firebase, $rootScope, $timeout, $location, $firebaseObject) {

    var usuarioActual = function(recetaId){
      Fire.firebaseAuth().onAuthStateChanged(function(user) {
        if(user){
          var usu = Fire.firebaseDb().ref('usuarios/' + user.uid);
          var cargandoUsuario = $firebaseObject(usu);
          cargandoUsuario.$loaded()
            .then(function(){
              $rootScope.USUARIO = cargandoUsuario;
              $('.se-pre-con').fadeOut('slow');
              misRecetas(recetaId);
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

    var misRecetas = function(recetaId){
      var refMisRecetas = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id);
      var misRecetas = $firebaseObject(refMisRecetas);
      $rootScope.LISTADORECETAS = misRecetas;
      miReceta(recetaId);
    };

    var miReceta = function(recetaId){
      if(recetaId !== undefined){
        var refReceta = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id).child(recetaId);
        var receta = $firebaseObject(refReceta);
        $rootScope.RECETA = receta;
      }
    };

    return{
      registrarse: function(user){
        Fire.firebaseAuth().createUserWithEmailAndPassword(user.email,user.password)
        .then(function(regUser){
          Fire.firebaseDb().ref('usuarios').child(regUser.uid).set({
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
        Fire.firebaseAuth().signOut().then(function() {
        }, function(error) {
          console.log(error);
        });
      },
      login: function(user, fb){
        Fire.firebaseAuth().signInWithEmailAndPassword(user.email,user.password)
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
      },
      usuarioActual: function(recetaId){
        usuarioActual(recetaId);
      },
      subirAvatar: function(avatar){

        var guardarAvatar = Fire.firebaseST().ref().child('avatares/' + avatar.name).put(avatar);

        guardarAvatar.on('state_changed', function(snapshot){
        }, function(error){
          console.log(error);
          Materialize.toast( error.message , 4000, 'red lighten-1');
        }, function(){

          var refReceta = Fire.firebaseDb().ref('usuarios/' + $rootScope.USUARIO.id);
          refReceta.update({
            avatar:{
              url:guardarAvatar.snapshot.downloadURL,
              nombre: avatar.name,
              size: avatar.size
            }
          });
          Materialize.toast( 'Avatar guardada exitosamente' , 4000, 'green lighten-1');

          /* aca updateo los datos del usuario en las recetas para cambiar el
          avatar en todas */

          angular.forEach($rootScope.LISTADORECETAS, function(value, key) {
            var actualizarAvatar = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id + '/'+ value.id).child('usuario').update({
              avatar:{
                url:guardarAvatar.snapshot.downloadURL,
                nombre: avatar.name,
                size: avatar.size
              }
            });
          });

          /* -------------------------------------------- */
        }

        );
      }
    };

  });
