define(['angular'], function(angular) {
    'use strict';

    var TEXT_CLASS = 'icls:text';

    return function($scope, ItemListLoader) {
        $scope.params = {
            sort: '[("firstCreated", -1)]',
            where: {itemClass: TEXT_CLASS},
            skip: 0,
            limit: 25
        };

        $scope.fetch = function(options) {
        	angular.extend($scope.params, options);
        	$scope.items = ItemListLoader($scope.params);
        };

        $scope.prev = function() {
            var skip = $scope.params.skip - $scope.params.limit;
            if (skip < 0) {
                skip = 0;
            }
            $scope.fetch({skip: skip});
        };

        $scope.next = function() {
            var skip = $scope.params.skip + $scope.params.limit;
            $scope.fetch({skip: skip});
        }

        $scope.search = function(query) {
        	if (query && query.length > 2) {
        		$scope.fetch({
                    q: query,
        			skip: 0
        		});
        	} else if (query.length === 0) {
        		$scope.fetch({
                    q: null,
        			skip: 0
        		});
        	}
        };

        $scope.fetch();
    };
});