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

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.navBar.alignTitle('center');
    

}])

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
    .state('tabs.resources',{
      url: '/resources',
      views: {
        'list-tab':{
          templateUrl: 'templates/resourcelist.html',
          controller: 'ResourceListController'
         }
      }
    })
    .state('tabs.quizes',{
      url: '/quizes',
      views: {
        'quiz-tab':{
          templateUrl: 'templates/practicequizes.html',
          controller: 'SelectQuizController'
         }
      }
    }) 
    .state('tabs.quiz',{
      url: '/quizes/:quizId/:quizName',
      views: {
        'quiz-tab':{
          templateUrl: 'templates/quiz.html',
          controller: 'QuizController'
         }
      }
    })   
    .state('tabs.fishlist',{
      url: '/resources/fishlist',
      views: {
        'list-tab':{
          templateUrl: 'templates/fishlist.html',
          controller: 'ListController'
        }
      }
    })
    .state('tabs.lobcrablist',{
      url: '/resources/lobcrablist',
      views: {
        'list-tab':{
          templateUrl: 'templates/lobcrablist.html',
          controller: 'CrabListController'
        }
      }
    })
    .state('tabs.shellfishlist',{
      url: '/resources/shellfishlist',
      views: {
        'list-tab':{
          templateUrl: 'templates/shellfishlist.html',
          controller: 'ShellfishListController'
        }
      }
    })
     .state('tabs.fishdetail', {
      url: '/resources/fishlist/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/fishdetail.html',
          controller: 'ListController'
        }
      }
    })

     .state('tabs.lobcrabdetail', {
      url: '/resources/lobcrabdetail/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/lobcrabdetail.html',
          controller: 'CrabListController'
        }
      }
    })

     .state('tabs.shellfishdetail', {
      url: '/resources/shellfishdetail/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/shellfishdetail.html',
          controller: 'ShellfishListController'
        }
      }
    })

     .state('tabs.cracklobster', {
      url: '/resources/cracklobster',
      views: {
        'list-tab' : {
          templateUrl: 'templates/cracklobster.html',
          controller: 'CrackLobsterController'
        }
      }
    })
     .state('tabs.servewine', {
      url: '/resources/servewine',
      views: {
        'list-tab' : {
          templateUrl: 'templates/servewine.html',
          controller: 'ServeWineController'
        }
      }
    })
    .state('tabs.tipshare', {
      url: '/resources/tipshare/:postId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/tipshare.html',
          controller: 'ResourceListController'
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
  
  

  $scope.data={showReorder: false};
  $scope.whichfish=$state.params.aId;
  

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.fishs.splice(fromIndex, 1);
    $scope.fishs.splice(toIndex, 0, item);
  }

}])

.controller('CrabListController', ['$scope','$http','$state', 
  function($scope, $http, $state){

    $http.get('js/lobcrablist.json').success(function(data){
    $scope.lobcrab=data;

  });
    

  $scope.data={showReorder: false};
  $scope.whichfish=$state.params.aId;
  

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.lobcrab.splice(fromIndex, 1);
    $scope.lobcrab.splice(toIndex, 0, item);
  }

}])

.controller('ShellfishListController', ['$scope','$http','$state', 
  function($scope, $http, $state){

    $http.get('js/shellfishlist.json').success(function(data){
    $scope.shellfish=data;

  });
    

  $scope.data={showReorder: false};
  $scope.whichfish=$state.params.aId;
  

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.shellfish.splice(fromIndex, 1);
    $scope.shellfish.splice(toIndex, 0, item);
  }

}])

.controller('CrackLobsterController', ['$scope','$http', 
  function($scope, $http){
    $http.get('js/lobster.json').success(function(data){
    $scope.cracklobster=data;

  });
 
}])
.controller('ServeWineController', ['$scope','$http', 
  function($scope, $http){
  $http.get('js/servewine.json').success(function(data){
    $scope.wines=data;
  });

}])
.controller('ResourceListController', ['$scope','$http','$state', '$sce',
  function($scope, $http, $state, $sce){
  $http.get('http://rusin-barqz.herokuapp.com/api/tipshare').success(function(data){
   data.forEach(function(datum){
      datum.article = $sce.trustAsHtml(datum.article);
    });
    $scope.tipshares=data;
  }).error(function(){
        $scope.err = 'Tipshare is unavailable';
      });
  $scope.whichtip=$state.params.postId;
}])
  .controller('SelectQuizController', ['$scope','$http',
  function($scope, $http){
  $http.get('http://rusin-barqz.herokuapp.com/api/quizes').success(function(data){
   
    $scope.quizes=data;
  }).error(function(){
        $scope.err = 'Quizes are unavailable';
      });
  
  
}])
  .controller('QuizController', ['$scope','$http','$state',
  function($scope, $http, $state){
 
    $scope.score = 0;
      $scope.activeQuestion = -1;
      $scope.activeQuestionAnswer = 0;
      $scope.percentage = 0;
    $scope.quizName = $state.params.quizName;
 
  $http.get('http://rusin-barqz.herokuapp.com/api/quizes/'+$state.params.quizId).success(function(data){
    $scope.myQuestions=shuffleSlice(data);
    $scope.totalQuestions = $scope.myQuestions.length;
  }).error(function(){
        $scope.err = 'Sorry, questions are unavailble.  Please try later';
   });

  $scope.selectAnswer = function(qIndex, aIndex){
        var questionState = $scope.myQuestions[qIndex].questionState;
      

        if( questionState != 'answered'){
          $scope.myQuestions[qIndex].selectedAnswer = aIndex;
          var correctAnswer = $scope.myQuestions[qIndex].correct;
          $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

          if(aIndex === correctAnswer){
            $scope.myQuestions[qIndex].correctness = 'correct';
            $scope.score += 1;
          } else{
            $scope.myQuestions[qIndex].correctness = 'incorrect';
          }

          $scope.myQuestions[qIndex].questionState = 'answered';

        }

        $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);

      }

      $scope.isSelected = function(qIndex, aIndex){
        return  $scope.myQuestions[qIndex].selectedAnswer === aIndex;
      }

      $scope.isCorrect = function(qIndex, aIndex){
        return  $scope.myQuestions[qIndex].correctAnswer === aIndex;
      }

      $scope.selectContinue = function(){

        return $scope.activeQuestion += 1;

      }

      shuffleSlice = function(array) {
        var currentIndex = array.length,
          temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        if (array.length > 20) {
          array = array.slice(0, 20);
        }

        return array;
      }


 
}]);
