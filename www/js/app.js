// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home',{
      url: '/home',
      views: {
        'home-tab':{
          templateUrl: 'templates/home.html'
          
        }
      }
    })
    .state('tabs.fishlist',{
      url: '/fishlist',
      views: {
        'list-tab':{
          templateUrl: 'templates/fishlist.html',
          controller: 'ListController'
        }
      }
    })
     .state('tabs.detail', {
      url: '/fishlist/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    $urlRouterProvider.otherwise('/tab/home')
})

.controller('ListController', ['$scope','$http','$state', 
  function($scope, $http, $state){
  $http.get('js/fresh_fish.json').success(function(data){
    $scope.fishs=data;

  });
 $scope.whichfish=$state.params.aId;
  

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.fishs.splice(fromIndex, 1);
    $scope.fishs.splice(toIndex, 0, item);
  }

}]);
