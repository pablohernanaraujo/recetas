'use strict';

angular.module('recetasApp')
  .factory('Data', function (Fire, firebase, $rootScope, Authentication, $firebaseObject) {

    var cargarRecetas = function(data){
      var todasLasRecetas = data;
      var allRecipe = [];
      for (var k in todasLasRecetas){
        if (todasLasRecetas.hasOwnProperty(k)){
          var obj  = todasLasRecetas[k];
          for (var i in obj){
            if (obj.hasOwnProperty(i)){
              if(obj[i].status === 2){
                allRecipe.push(obj[i]);
              }
            }
          }
        }
      }
      $rootScope.ALLRECIPE = allRecipe;
      console.log(allRecipe);
    };
    return{
      inicializarRecetas: function(){
        // Fire.firebaseDb().ref('recetas').on('value', function(snapshot) {
        //   var todasLasRecetas = snapshot.val();
        //   var allRecipe = [];
        //   for (var k in todasLasRecetas){
        //     if (todasLasRecetas.hasOwnProperty(k)){
        //       var obj  = todasLasRecetas[k];
        //       for (var i in obj){
        //         if (obj.hasOwnProperty(i)){
        //           if(obj[i].status === 2){
        //             allRecipe.push(obj[i]);
        //           }
        //         }
        //       }
        //     }
        //   }
        //   $rootScope.ALLRECIPE = allRecipe;
        //   console.log(allRecipe);
        // });

        var anfire = Fire.firebaseDb().ref('recetas');
        anfire.on('value', function(snapshot) {
          cargarRecetas(snapshot.val());
        });

      },
      crearReceta: function(receta, cb){
        var refReceta = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id).push();
        var key = refReceta.key;
        var avatar;
        if($rootScope.USUARIO.avatar){
          avatar = $rootScope.USUARIO.avatar;
        }else{
          avatar = null;
        }
        var newData = {
          nombre: receta,
          id: key,
          status: 1,
          date: firebase.database.ServerValue.TIMESTAMP,
          usuario: {
            id: $rootScope.USUARIO.id,
            nombre: $rootScope.USUARIO.nombre,
            apellido: $rootScope.USUARIO.apellido,
            avatar: avatar
          }
        };
        refReceta.set(newData);

        var respuesta = 'guadado';

        return cb(respuesta);
      },
      eliminarReceta: function(eliminar){
        var removeReceta = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id).child(eliminar.id).remove();
        Materialize.toast( 'Receta eliminada exitosamente' , 4000, 'green lighten-1');
      },
      miReceta: function(recetaId){
        Authentication.usuarioActual(recetaId);
      },
      subirImagen: function(imagen, recetaId){

        var guardarImagen = Fire.firebaseST().ref().child('imagenes/' + imagen.name).put(imagen);

        guardarImagen.on('state_changed', function(snapshot){
        }, function(error){
          console.log(error);
          Materialize.toast( error.message , 4000, 'red lighten-1');
        }, function(){

          var refReceta = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id).child(recetaId);
          refReceta.update({
            imagen:{
              url:guardarImagen.snapshot.downloadURL,
              nombre: imagen.name,
              size: imagen.size
            }
          });
          Materialize.toast( 'Imagen guardada exitosamente' , 4000, 'green lighten-1');

          /* Aca subo las imagenes a la base de datos para que el usuario pueda a
          futuro ver todas las imagenes que uso */
          Fire.firebaseDb().ref('imagenes/' + $rootScope.USUARIO.id).push({
            imagen: {
              url: guardarImagen.snapshot.downloadURL,
              nombre: imagen.name,
              size: imagen.size
            }
          });
          /* --------------------------------- */
        }

        );
      },
      guardarPaso: function(paso, recetaId){
        var guardarPaso = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
          .child('pasos').push();

        var key = guardarPaso.key;
        var newPaso = {
          texto: paso,
          id: key
        };
        guardarPaso.set(newPaso);
        Materialize.toast( 'Paso guardado exitosamente' , 4000, 'green lighten-1');
      },
      cambiarPaso: function(paso, pasoId, recetaId){
        var cambiarPaso = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id +'/'+recetaId)
          .child('pasos/'+ pasoId).update({
            texto: paso
          });

        Materialize.toast( 'Paso editado exitosamente' , 4000, 'green lighten-1');
      },
      eliminarPaso: function(eliminar, eliminarRecetaId){
        Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id +'/'+eliminarRecetaId)
          .child('pasos/'+ eliminar).remove();

        Materialize.toast( 'Paso eliminado exitosamente' , 4000, 'green lighten-1');
      },

      /* INGREDIENTES ZONA */

      guardarIngrediente: function(ingrediente, recetaId){
        var guardarIngrediente = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
          .child('ingredientes').push();

        var key = guardarIngrediente.key;
        var newIngrediente = {
          texto: ingrediente,
          id: key
        };
        guardarIngrediente.set(newIngrediente);
        Materialize.toast( 'Ingrediente guardado exitosamente' , 4000, 'green lighten-1');
      },
      cambiarIngrediente: function(ingrediente, ingredienteId, recetaId){
        var cambiarIngrediente = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id +'/'+recetaId)
          .child('ingredientes/'+ ingredienteId).update({
            texto: ingrediente
          });

        Materialize.toast( 'Ingrediente editado exitosamente' , 4000, 'green lighten-1');
      },
      eliminarIngrediente: function(eliminar, eliminarRecetaId){
        Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id +'/'+eliminarRecetaId)
          .child('ingredientes/'+ eliminar).remove();

        Materialize.toast( 'Paso eliminado exitosamente' , 4000, 'green lighten-1');
      }
    };
  });
