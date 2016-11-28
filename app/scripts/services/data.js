'use strict';

angular.module('recetasApp')
  .factory('Data', function (Fire, firebase, $rootScope, Authentication, $firebaseObject) {

    return{
      inicializarRecetas: function(){
      //   var cargarRecetas = Fire.firebaseDb().ref('recetas');
      //   var recetasUsuarios = $firebaseObject(cargarRecetas);
      //   recetasUsuarios.$loaded(function(data){
      //     var allRecipe = [];
      //     for (var k in data){
      //       if (data.hasOwnProperty(k)){
      //         var obj  = data[k];
      //         for (var i in obj){
      //           if (obj.hasOwnProperty(i)){
      //             if(obj[i].status === 2){
      //               allRecipe.push(obj[i]);
      //             }
      //           }
      //         }
      //       }
      //     }
      //     $rootScope.RECIPES = allRecipe;
      //   });
        var cargarRecetas = Fire.firebaseDb().ref('recetas').on('value',function(snapshot){
          var recetasUsuarios = snapshot.val();

          var allRecipe = [];
          for (var k in recetasUsuarios){
            if (recetasUsuarios.hasOwnProperty(k)){
              var obj  = recetasUsuarios[k];
              for (var i in obj){
                if (obj.hasOwnProperty(i)){
                  if(obj[i].status === 2){
                    allRecipe.push(obj[i]);
                  }
                }
              }
            }
          }
          $rootScope.RECIPES = allRecipe;
        });
      },

      /* RECETAS ZONA */

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

      /* RECETA DETALLES */

      miReceta: function(recetaId){
        Authentication.usuarioActual(recetaId);
      },

      /* CATEGORIA ZONA */

      subirCategoria: function(categoria, recetaId){
        var subirCategoria = Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id +   '/'+ recetaId +'/categorias').push();
        var key = subirCategoria.key;
        var data = {
          texto: categoria,
          id: key
        };
        subirCategoria.set(data);
        Materialize.toast( 'Categoria guardada exitosamente' , 4000, 'green lighten-1');
      },
      eliminarCategoria: function(categoriaId, recetaId){
        Fire.firebaseDb().ref('recetas/' + $rootScope.USUARIO.id +   '/'+ recetaId +'/categorias/' + categoriaId).remove();
      },

      /* IMAGEN ZONA */

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

      /* PASOS ZONA */

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
      },

      /* COCCION ZONA */

      guardarCoccion: function(hora, min, recetaId){
        if($rootScope.RECETA.time){
          Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
            .child('time').remove().then(function(){
              var guardarCoccion = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
                .child('time').push();

              var key = guardarCoccion.key;
              var newCoccion = {
                hora: hora,
                minuto: min,
                id: key
              };
              guardarCoccion.set(newCoccion);
            });
        }else{
          var guardarCoccion = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
            .child('time').push();

          var key = guardarCoccion.key;
          var newCoccion = {
            hora: hora,
            minuto: min,
            id: key
          };
          guardarCoccion.set(newCoccion);
        }
      },
      eliminarCoccion: function(recetaId){
        Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
          .child('time').remove();
      },

      /* PORCIONES ZONA */

      guardarPorciones: function(porcion, recetaId){
        if($rootScope.RECETA.porciones){
          Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
            .child('porciones').remove().then(function(){
              var guardarPorciones = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
                .child('porciones').push();

              var key = guardarPorciones.key;
              var newPorciones = {
                cantidad: porcion ,
                id: key
              };
              guardarPorciones.set(newPorciones);
            });
        }else{
          var guardarPorciones = Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
            .child('porciones').push();

          var key = guardarPorciones.key;
          var newPorciones = {
            cantidad: porcion ,
            id: key
          };
          guardarPorciones.set(newPorciones);
        }
      },
      eliminarPorciones: function(recetaId){
        Fire.firebaseDb().ref('recetas/'+$rootScope.USUARIO.id+'/'+recetaId)
          .child('porciones').remove();
      },
    };
  });
