var app = angular.module('tedrssapp.services', []);

app.constant("FEED_URL", "http://www.restaurantbusinessonline.com/rss");

app.factory('FeedService', function ($http, $q, $rootScope, FEED_URL) {

	var self = {
		'posts': []
	};

	self.loadFeed = function () {

		self.posts.length = 0;
		var defer = $q.defer();

		superfeedr.auth('alexrusin', '50b26c6f1c442bb7376c5ec0f42871d3');
		superfeedr.setOnLoadCallback(function() {
			var feed = new superfeedr.Feed(FEED_URL);
			feed.load(function(result) {
				$rootScope.$apply(function() {
					angular.forEach(result.feed.entries, function (entry) {
						if(entry.content==undefined){
							entry.content='';
						}
						self.posts.push(entry);
					});
					defer.resolve(self.posts);
				});				
			});
		});		

		return defer.promise;
	};

	self.getEntry = function (link) {
		for (var i = 0; i < self.posts.length; i++) {
			var entry = self.posts[i];

			if (entry.link == link) {
				return entry;
			}
		}
		return null;
	};

	return self;
});
