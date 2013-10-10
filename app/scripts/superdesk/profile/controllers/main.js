define(['angular'], function(angular) {
    'use strict';

    return ['$scope', 'user', 'usersResource', 'activityResource',
        function($scope, user, usersResource, activityResource) {

            $scope.userroles = ["administrator","journalist","photographer","editor"];
            $scope.user = angular.extend(user, {role: []});

            usersResource.get(function(data){
                $scope.privacy = data.privacy;  
                $scope.showrow = data.showrow;            
            });
    		
                		
            activityResource.get(function(data){
                $scope.activityfeed = data.activityfeed;
            });

            $scope.selectrole = function(role) {
                if ($scope.user.role.indexOf(role) == -1) {         //if not in array
                     $scope.$apply($scope.user.role.push(role));    //put it
                }
                else {                                              //if is in array
                    if ($scope.user.role.length !== 1)   {          //and there is more than one value
                        $scope.$apply($scope.user.role.splice($scope.user.role.indexOf(role),1)); //remove it
                    }
                }  
            }
            
    }];
});