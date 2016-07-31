var app = angular.module('tedrssapp.controllers', []);

app.controller('FeedCtrl', function ($scope, $ionicLoading, FeedService) {


	$ionicLoading.show({template: 'Loading feed...'});
	$scope.feed = FeedService;
	$scope.feed.loadFeed().then(function(){
		$ionicLoading.hide();
	});
	

	$scope.doRefresh = function () {
		$scope.feed.loadFeed().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
});

app.controller('PostCtrl', function ($scope, $window, $stateParams, $cordovaSocialSharing, $state, FeedService) {
	
	
	$scope.postId = $stateParams.id;
	$scope.post = FeedService.getEntry($scope.postId);

	$scope.share = function () {
		$cordovaSocialSharing.share($scope.post.contentSnippet, $scope.post.title, $scope.post.thumbnail, $scope.post.link);
	};

	$scope.readMore = function () {
		
		$window.open($scope.post.link, "_system", "location=yes");
	};

	$scope.goBack = function(){
		$state.go("tabs.feed");
	}

});
