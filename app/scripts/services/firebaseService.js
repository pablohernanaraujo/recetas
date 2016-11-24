'use strict';

angular.module('recetasApp')
  .factory('Fire', function (firebase) {

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

    return{
      firebaseAuth: function(){
        return firebaseAuth;
      },
      firebaseDb: function(){
        return firebaseDb;
      },
      firebaseST: function(){
        return firebaseST;
      }
    };

  });
