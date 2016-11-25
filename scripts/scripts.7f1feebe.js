"use strict";angular.module("recetasApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngSanitize","ngTouch","ui.router","firebase","angularLazyImg","ui.materialize"]).run(["Authentication",function(a){angular.element(document).ready(function(){a.requireAuth()})}]).config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("inicio",{url:"/inicio",templateUrl:"views/inicio.html",controller:"InicioCtrl"}).state("privado",{url:"/privado",templateUrl:"views/privado.html",controller:"PrivadoCtrl",resolve:{currentAuth:["Authentication",function(a){return a.requireAuth()}]}}).state("detalles",{url:"/privado/:id",templateUrl:"views/detalles.html",controller:"DetallesCtrl",resolve:{currentAuth:["Authentication",function(a){return a.requireAuth()}]}}),b.otherwise("/inicio")}]),angular.module("recetasApp").controller("NavCtrl",["Authentication","$scope","$rootScope",function(a,b,c){b.userRegister=function(b){a.registrarse(b)},b.userLogout=function(){a.logout()},b.userLogin=function(b){a.login(b,function(a){$("#ingresar").modal("close"),$(".button-collapse").sideNav("hide")})},$(document).ready(function(){$(".modal").modal()})}]),angular.module("recetasApp").controller("InicioCtrl",["Authentication","$scope","$rootScope","Fire","$firebaseObject",function(a,b,c,d,e){var f=d.firebaseDb().ref("recetas"),g=e(f);g.$loaded(function(a){var c=[];for(var d in a)if(a.hasOwnProperty(d)){var e=a[d];for(var f in e)e.hasOwnProperty(f)&&2===e[f].status&&c.push(e[f])}b.recipes=c}),$(".button-collapse").sideNav("hide"),c.PAGE="inicio",b.userRegister=function(b){a.registrarse(b)},b.userLogout=function(){a.logout()},b.userLogin=function(b){a.login(b,function(a){$("#ingresar").modal("close")})},b.abrirBuscador=function(){$(".fixed-action-btn").css({right:"-60px"}),$(".buscadorContenedor").css({bottom:"0px"}),$("#buscador").focus()},b.cerrarBuscador=function(){$(".fixed-action-btn").css({right:"20px"}),$(".buscadorContenedor").css({bottom:"-75px"}),$("#buscador").focusout()},$(document).ready(function(){$(".modal").modal()})}]),angular.module("recetasApp").controller("PrivadoCtrl",["$scope","$rootScope","Data","$timeout","Authentication",function(a,b,c,d,e){$(".button-collapse").sideNav("hide"),b.PAGE="privado",a.crearReceta=function(b){c.crearReceta(b,function(b){"guadado"===b&&(a.newReceta="",Materialize.toast("Guardado con exito!",4e3,"green lighten-1"))})},a.abrirEliminarModal=function(b){$(".eliminarModal").css({display:"block"}),setTimeout(function(){$(".eliminarModal").css({opacity:1})},100),a.eliminarReceta=b},a.cerrarEliminarModal=function(){$(".eliminarModal").css({opacity:0}),setTimeout(function(){$(".eliminarModal").css({display:"none"})},500)},a.eliminarUnaReceta=function(b){c.eliminarReceta(b),d(function(){a.cerrarEliminarModal()},300)},a.guardarAvatar=function(){var a=document.querySelector("input[type=file]").files[0],b=new FileReader,c=5e5;a?a.size>c?Materialize.toast("La imagen debe pesar menos de 1 mega.",4e3,"red lighten-1"):(Materialize.toast("Guardando avatar...",4e3),b.readAsDataURL(a),e.subirAvatar(a)):console.log("no exite la imagen")},$(document).ready(function(){$("ul.tabs").tabs()})}]),angular.module("recetasApp").controller("DetallesCtrl",["$scope","$rootScope","$stateParams","Data","$timeout",function(a,b,c,d,e){b.PAGE="privado",d.miReceta(c.id),a.guardarImagen=function(){var a=document.querySelector("input[type=file]").files[0],b=new FileReader,e=1e6;a?a.size>e?Materialize.toast("La imagen debe pesar menos de 1 mega.",4e3,"red lighten-1"):(Materialize.toast("Guardando imagen...",4e3),b.readAsDataURL(a),d.subirImagen(a,c.id)):console.log("no exite la imagen")},a.guardarPaso=function(){d.guardarPaso(a.paso,c.id),e(function(){a.paso=""},300)},a.abrirPasosModal=function(b,c,d,e){$(".pasosModal").css({display:"block"}),setTimeout(function(){$(".pasosModal").css({opacity:1})},10),a.seccion=c,a.pasoIndex=d,a.pasoTexto=b.texto,a.pasoId=b.id,a.recetaId=e},a.cerrarPasosModal=function(){$(".pasosModal").css({opacity:0}),setTimeout(function(){$(".pasosModal").css({display:"none"})},500)},a.cambiarPaso=function(a,b,c,e){"Paso"===e&&d.cambiarPaso(a,b,c),"Ingrediente"===e&&d.cambiarIngrediente(a,b,c)},a.abrirEliminarModal=function(b,c,d,e){$(".eliminarModal").css({display:"block"}),setTimeout(function(){$(".eliminarModal").css({opacity:1})},100),a.eliminar=b.id,a.seccion=c,a.eliminarIndex=d,a.eliminarRecetaId=e},a.cerrarEliminarModal=function(){$(".eliminarModal").css({opacity:0}),setTimeout(function(){$(".eliminarModal").css({display:"none"})},500)},a.eliminarPaso=function(b,c,f){"Paso"===f&&d.eliminarPaso(b,c),"Ingrediente"===f&&d.eliminarIngrediente(b,c),e(function(){a.cerrarEliminarModal()},300)},a.guardarIngrediente=function(){d.guardarIngrediente(a.ingrediente,c.id),e(function(){a.ingrediente=""},300)},a.ponerOnline=function(){b.RECETA.status=2,b.RECETA.$save(),Materialize.toast("Felicidades su receta esta online!!!",4e3,"green lighten-1")},$(document).ready(function(){$("input#input_text, textarea#textarea1").characterCounter()})}]),angular.module("recetasApp").factory("Fire",["firebase",function(a){var b={apiKey:"AIzaSyCcUCRA3ae4PjQ4olgDqhO-WpwKGh8hr7I",authDomain:"resetasapp.firebaseapp.com",databaseURL:"https://resetasapp.firebaseio.com",storageBucket:"resetasapp.appspot.com",messagingSenderId:"642728759157"},c=a.initializeApp(b),d=c.auth(),e=c.database(),f=a.storage();return{firebaseAuth:function(){return d},firebaseDb:function(){return e},firebaseST:function(){return f}}}]),angular.module("recetasApp").factory("Authentication",["Fire","firebase","$rootScope","$timeout","$location","$firebaseObject",function(a,b,c,d,e,f){var g=function(b){a.firebaseAuth().onAuthStateChanged(function(d){if(d){var g=a.firebaseDb().ref("usuarios/"+d.uid),i=f(g);i.$loaded().then(function(){c.USUARIO=i,$(".se-pre-con").fadeOut("slow"),h(b)})["catch"](function(a){console.log(a)})}else c.USUARIO="",e.path("/"),$(".se-pre-con").fadeOut("slow")})},h=function(b){var d=a.firebaseDb().ref("recetas/"+c.USUARIO.id),e=f(d);c.LISTADORECETAS=e,i(b)},i=function(b){if(void 0!==b){var d=a.firebaseDb().ref("recetas/"+c.USUARIO.id).child(b),e=f(d);c.RECETA=e}};return{registrarse:function(c){a.firebaseAuth().createUserWithEmailAndPassword(c.email,c.password).then(function(d){a.firebaseDb().ref("usuarios").child(d.uid).set({nombre:c.nombre,apellido:c.apellido,email:c.email,id:d.uid,date:b.database.ServerValue.TIMESTAMP,status:1}),Materialize.toast("Bienvenido!!!",4e3,"green lighten-1"),$("#registrarse").modal("close")})["catch"](function(a){console.log(a),Materialize.toast(a.message,4e3,"red lighten-1")})},logout:function(){a.firebaseAuth().signOut().then(function(){},function(a){console.log(a)})},login:function(b,c){a.firebaseAuth().signInWithEmailAndPassword(b.email,b.password).then(function(){var a="entramos";return c(a)})["catch"](function(a){console.log(a),Materialize.toast(a.message,4e3,"red lighten-1")})},requireAuth:function(){g()},usuarioActual:function(a){g(a)},subirAvatar:function(b){var d=a.firebaseST().ref().child("avatares/"+b.name).put(b);d.on("state_changed",function(a){},function(a){console.log(a),Materialize.toast(a.message,4e3,"red lighten-1")},function(){var e=a.firebaseDb().ref("usuarios/"+c.USUARIO.id);e.update({avatar:{url:d.snapshot.downloadURL,nombre:b.name,size:b.size}}),Materialize.toast("Avatar guardada exitosamente",4e3,"green lighten-1"),angular.forEach(c.LISTADORECETAS,function(e,f){a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+e.id).child("usuario").update({avatar:{url:d.snapshot.downloadURL,nombre:b.name,size:b.size}})})})}}}]),angular.module("recetasApp").factory("Data",["Fire","firebase","$rootScope","Authentication","$firebaseObject",function(a,b,c,d,e){return{inicializarRecetas:function(){},crearReceta:function(d,e){var f,g=a.firebaseDb().ref("recetas/"+c.USUARIO.id).push(),h=g.key;f=c.USUARIO.avatar?c.USUARIO.avatar:null;var i={nombre:d,id:h,status:1,date:b.database.ServerValue.TIMESTAMP,usuario:{id:c.USUARIO.id,nombre:c.USUARIO.nombre,apellido:c.USUARIO.apellido,avatar:f}};g.set(i);var j="guadado";return e(j)},eliminarReceta:function(b){a.firebaseDb().ref("recetas/"+c.USUARIO.id).child(b.id).remove();Materialize.toast("Receta eliminada exitosamente",4e3,"green lighten-1")},miReceta:function(a){d.usuarioActual(a)},subirImagen:function(b,d){var e=a.firebaseST().ref().child("imagenes/"+b.name).put(b);e.on("state_changed",function(a){},function(a){console.log(a),Materialize.toast(a.message,4e3,"red lighten-1")},function(){var f=a.firebaseDb().ref("recetas/"+c.USUARIO.id).child(d);f.update({imagen:{url:e.snapshot.downloadURL,nombre:b.name,size:b.size}}),Materialize.toast("Imagen guardada exitosamente",4e3,"green lighten-1"),a.firebaseDb().ref("imagenes/"+c.USUARIO.id).push({imagen:{url:e.snapshot.downloadURL,nombre:b.name,size:b.size}})})},guardarPaso:function(b,d){var e=a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+d).child("pasos").push(),f=e.key,g={texto:b,id:f};e.set(g),Materialize.toast("Paso guardado exitosamente",4e3,"green lighten-1")},cambiarPaso:function(b,d,e){a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+e).child("pasos/"+d).update({texto:b});Materialize.toast("Paso editado exitosamente",4e3,"green lighten-1")},eliminarPaso:function(b,d){a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+d).child("pasos/"+b).remove(),Materialize.toast("Paso eliminado exitosamente",4e3,"green lighten-1")},guardarIngrediente:function(b,d){var e=a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+d).child("ingredientes").push(),f=e.key,g={texto:b,id:f};e.set(g),Materialize.toast("Ingrediente guardado exitosamente",4e3,"green lighten-1")},cambiarIngrediente:function(b,d,e){a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+e).child("ingredientes/"+d).update({texto:b});Materialize.toast("Ingrediente editado exitosamente",4e3,"green lighten-1")},eliminarIngrediente:function(b,d){a.firebaseDb().ref("recetas/"+c.USUARIO.id+"/"+d).child("ingredientes/"+b).remove(),Materialize.toast("Paso eliminado exitosamente",4e3,"green lighten-1")}}}]),angular.module("recetasApp").run(["$templateCache",function(a){a.put("views/detalles.html",'<div class="container"> <div class="row"> <div class="col s12" style="padding: 20px 0px"> <a ui-sref="privado" class="waves-effect waves-light btn bg-principal"> volver <i class="material-icons left">arrow_back</i> </a> </div> <div class="col s12"> <div class="card"> <div class="card-content"> <span class="card-title">Aviso importante</span> <p> Para poner la receta online se deberan llenar todos los campos. </p> <p> Asi el boton se habilitara. </p> </div> <div class="card-action"> <a class="btn waves-effect waves-light bg-principal" ng-disabled="!RECETA.imagen.size || !RECETA.nombre || !RECETA.descripcion || !RECETA.pasos || !RECETA.ingredientes || RECETA.status !== 1" ng-click="ponerOnline()"> poner online <i class="material-icons right">file_upload</i> </a> </div> <div class="enlinea-contenedor"> <p ng-show="RECETA.status === 2" class="enlinea teal"> Receta Online </p> <p ng-show="RECETA.status === 1" class="fueradelinea"> Receta Offline </p> </div> </div> </div> <div class="col s12"> <div class="col s12 m4"> <h5>Nombre de la receta</h5> </div> <div class="col s12 m8"> <div class="input-field"> <input id="recetaNombre" type="text" ng-model="RECETA.nombre" ng-change="RECETA.$save()"> <label ng-class="RECETA.nombre ? \'active\':\'\'" for="recetaNombre">Nombre</label> </div> </div> </div> <div class="col s12"> <div class="col s12 m4"> <h5>Descripción</h5> </div> <div class="col s12 m8"> <div class="input-field"> <textarea id="textarea1" class="materialize-textarea" ng-model="RECETA.descripcion" ng-change="RECETA.$save()" length="200"></textarea> <label ng-class="RECETA.descripcion ? \'active\':\'\'" for="textarea1">Ingrese una descripción</label> </div> </div> </div> <div class="col s12"> <div class="col s12 m4"> <h5>Imagen</h5> </div> <div class="col s12 m8"> <form name="formImagen" ng-submit="guardarImagen()"> <div class="file-field input-field"> <div class="btn bg-principal"> <span>File</span> <input type="file" required> </div> <div class="file-path-wrapper"> <input class="file-path" type="text" ng-model="RECETA.imagen.nombre" required> </div> </div> <button class="btn waves-effect waves-light col s12 bg-principal" type="submit" ng-disabled="formImagen.$invalid"> guardar imagen </button> </form> </div> </div> <div class="col s12"> <div class="col s12 m4"> <h5>Paso a paso</h5> </div> <div class="col s12 m8"> <form name="formPaso" ng-submit="guardarPaso()"> <div class="input-field"> <textarea id="textarea2" class="materialize-textarea" length="300" ng-model="paso" required></textarea> <label for="textarea2">Ingrese paso a paso</label> </div> <button class="btn waves-effect waves-light col s12 bg-principal" type="submit" ng-disabled="formPaso.$invalid"> guardar paso </button> </form> <div class="col s12" style="height: 20px"></div> <div ng-show="!RECETA.pasos"> <h5>No tienes pasos creados.</h5> </div> <div ng-show="RECETA.pasos"> <h4>Listado de los pasos a seguir.</h4> <div ng-repeat="paso in RECETA.pasos"> <h5>Paso {{$index + 1}}</h5> <ul class="collection"> <li class="collection-item"> <div class="color-principal">{{paso.texto}} <a href="" class="secondary-content" ng-click="abrirEliminarModal(paso, \'Paso\', ($index + 1), RECETA.id)" style="color: #ef5350"> <i class="material-icons">delete</i> </a> <a href="" class="secondary-content" ng-click="abrirPasosModal(paso, \'Paso\',($index + 1), RECETA.id)" style="margin-right: 10px"> <i class="material-icons">mode_edit</i> </a> </div> </li> </ul> </div> </div> </div> </div> </div> </div> <div class="container"> <div class="row"> <div class="col s12"> <div class="col s12 m4"> <h5>Ingredientes</h5> </div> <div class="col s12 m8"> <form name="formIngrediente" ng-submit="guardarIngrediente()"> <div class="input-field"> <input id="crearIngrediente" type="text" ng-model="ingrediente" required> <label for="crearIngrediente">Ingrese un ingrediente</label> </div> <button class="btn waves-effect waves-light col s12 bg-principal" type="submit" ng-disabled="formIngrediente.$invalid"> guardar ingrediente </button> </form> <div class="col s12" style="height: 20px"></div> <div ng-show="!RECETA.ingredientes"> <h5>No tienes ingredientes creados.</h5> </div> <div ng-show="RECETA.ingredientes"> <h4>Listado de los ingredientesr.</h4> <div ng-repeat="ingrediente in RECETA.ingredientes"> <h5>Ingrediente {{$index + 1}}</h5> <ul class="collection"> <li class="collection-item"> <div class="color-principal">{{ingrediente.texto}} <a href="" class="secondary-content" ng-click="abrirEliminarModal(ingrediente, \'Ingrediente\', ($index + 1), RECETA.id)" style="color: #ef5350"> <i class="material-icons">delete</i> </a> <a href="" class="secondary-content" ng-click="abrirPasosModal(ingrediente, \'Ingrediente\', ($index + 1), RECETA.id)" style="margin-right: 10px"> <i class="material-icons">mode_edit</i> </a> </div> </li> </ul> </div> </div> </div> </div> </div> </div>   <!-- MODALES --> <div class="pasosModal"> <div class="pasosModalContenedor"> <div class="pasosModalInterno"> <div class="row"> <div class="col s12" style="padding: 0 20px"> <h4>{{seccion}} {{pasoIndex}}</h4> <textarea id="textarea2" class="materialize-textarea" length="300" ng-model="pasoTexto"></textarea> <button class="btn waves-effect waves-light right bg-principal" type="submit" style="margin-bottom: 20px" ng-click="cambiarPaso(pasoTexto, pasoId, recetaId, seccion)"> guardar </button> </div> <div class="col s12" style="border-top: 1px solid rgba(0,0,0,0.1);padding: 20px 20px 0px"> <a class="waves-effect waves-light btn-flat right" ng-click="cerrarPasosModal()"> cerrar </a> </div> </div> </div> </div> </div> <div class="eliminarModal"> <div class="eliminarModalContenedor"> <div class="eliminarModalInterno"> <div class="row"> <div class="col s12" style="padding: 0 20px"> <h6>Esta seguro que desea eliminar</h6> <h4>{{seccion}} {{eliminarIndex}}</h4> </div> <div class="col s12" style="border-top: 1px solid rgba(0,0,0,0.1);padding: 20px 20px 0px"> <a class="waves-effect waves-light btn red lighten-1" ng-click="eliminarPaso(eliminar, eliminarRecetaId, seccion)">eliminar</a> <a class="waves-effect waves-light btn-flat right" ng-click="cerrarEliminarModal()"> cerrar </a> </div> </div> </div> </div> </div>'),a.put("views/inicio.html",'<div class="row" style="margin-top:7px"> <div ng-show="!recipes" class="col 12"> <h4>Cargando recetas ...</h4> <p>{{recipes}}</p> </div> <div class="col s12"> <div id="columnas"> <div class="carta" ng-repeat="receta in recipes"> <div class="card hoverable"> <div class="card-image"> <img src="images/tastyhouselarge.efdaca73.gif" lazy-img="{{receta.imagen.url}}"> <span class="card-title">{{receta.nombre}}</span> </div> <div class="card-content"> <p>{{receta.descripcion}}</p> <div class="call-data-contenedor"> <div class="favorite-contenedor"> <i class="material-icons">favorite</i> <span>46</span> </div> <div class="basket-contenedor"> <i class="material-icons">shopping_basket</i> <span>95</span> </div> </div> </div> <ul class="collection" style="border-right: none; border-left: none; border-bottom: none; margin:0"> <li class="collection-item avatar"> <img ng-show="!receta.usuario.avatar.url" src="images/avatar.aae362c2.jpg" alt="" class="circle"> <img ng-show="receta.usuario.avatar.url" src="images/tastyhouse.875aeee2.gif" lazy-img="{{receta.usuario.avatar.url}}" alt="" class="circle"> <span class="title">{{receta.usuario.nombre}} {{receta.usuario.apellido}}</span> <p>{{receta.date | date: "longDate"}}</p> </li> </ul> <div class="call-to-action"> <a class="waves-effect waves-light btn white favorito"> <i class="material-icons left grey-text">favorite_border</i> </a> <a class="waves-effect waves-light btn bg-principal right guardar"> <i class="material-icons left">shopping_basket</i> guardar </a> </div> </div> </div> </div> </div> </div> <!-- BUSCAR BOTON --> <div class="fixed-action-btn"> <a class="btn-floating btn-large waves-effect waves-light bg-principal" ng-click="abrirBuscador()"> <i class="large material-icons">search</i> </a> </div> <div class="buscadorContenedor"> <i class="material-icons">search</i> <form> <input id="buscador" type="text"> </form> <ul> <li> <a ng-click="cerrarBuscador()">Cerrar</a> </li> </ul> </div>'),a.put("views/privado.html",'<div class="container" style="margin-top:7px"> <div class="row"> <div class="col s12"> <ul class="tabs"> <li class="tab col s6"> <a class="active" href="#recetas">Resetas</a> </li> <li class="tab col s6"> <a href="#perfil">Perfil</a> </li> </ul> </div> <div id="recetas" class="col s12"> <div class="col s12"> <h4>Crear receta</h4> <form name="formCrearReceta" ng-submit="crearReceta(newReceta)"> <div class="input-field col s12 m10"> <i class="material-icons prefix">content_paste</i> <input id="crearReceta" type="text" ng-model="newReceta" required> <label for="crearReceta">Crear una receta</label> </div> <button class="btn waves-effect waves-light col s12 m2 bg-principal" type="submit" ng-disabled="formCrearReceta.$invalid" style="margin-top: 12px"> crear </button> </form> </div> <div class="col s12"> <h4>Mis recetas</h4> <ul class="collection"> <li class="collection-item" ng-repeat="receta in LISTADORECETAS"> <div class="color-principal">{{receta.nombre}} <a href="" class="secondary-content" ng-click="abrirEliminarModal(receta)" style="color: #ef5350"> <i class="material-icons">delete</i> </a> <a ui-sref="detalles({id: receta.id})" class="secondary-content" style="margin-right: 10px"> <i class="material-icons">mode_edit</i> </a> </div> </li> </ul> </div> </div> <div id="perfil" class="col s12"> <div class="col s12"> <div class="col s12 m4"> <h5>Nombre</h5> </div> <div class="col s12 m8"> <div class="input-field"> <input id="nombreUsuario" type="text" ng-model="USUARIO.nombre" ng-change="USUARIO.$save()"> </div> </div> <div class="col s12 m4"> <h5>Apellido</h5> </div> <div class="col s12 m8"> <div class="input-field"> <input id="apellidoUsuario" type="text" ng-model="USUARIO.apellido" ng-change="USUARIO.$save()"> </div> </div> <div class="col s12 m4"> <h5>Avatar</h5> </div> <div class="col s12 m8"> <form name="formAvatar" ng-submit="guardarAvatar()"> <div class="file-field input-field"> <div class="btn bg-principal"> <span>File</span> <input type="file" required> </div> <div class="file-path-wrapper"> <input class="file-path" type="text" ng-model="USUARIO.avatar.nombre" required> </div> </div> <button class="btn waves-effect waves-light col s12 bg-principal" type="submit" ng-disabled="formAvatar.$invalid"> guardar avatar </button> </form> </div> </div> </div> </div> </div> <div class="eliminarModal"> <div class="eliminarModalContenedor"> <div class="eliminarModalInterno"> <div class="row"> <div class="col s12" style="padding: 0 20px"> <h6>Esta seguro que desea eliminar la receta</h6> <h4>{{eliminarReceta.nombre}}</h4> </div> <div class="col s12" style="border-top: 1px solid rgba(0,0,0,0.1);padding: 20px 20px 0px"> <a class="waves-effect waves-light btn red lighten-1" ng-click="eliminarUnaReceta(eliminarReceta)">eliminar</a> <a class="waves-effect waves-light btn-flat right" ng-click="cerrarEliminarModal()"> cerrar </a> </div> </div> </div> </div> </div>')}]);