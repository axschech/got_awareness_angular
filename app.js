angular.module('app', [
    'ngResource'
])
    .controller('RegisterCtrl', function (
        $scope,
        Organizations,
        User
    ) {
        'use strict';
        $scope.user = {};
        $scope.organizations = [];
        Organizations.resource.get().$promise.then(function (response) {
            $scope.organizations = response.data ;
            $scope.organizations.unshift({name: 'Please choose an organiztion'});
            $scope.user.organization = $scope.organizations[0].id;
        });

        $scope.register = function () {
            $scope.warning = "";
            User.resource
                .save($scope.user)
                .$promise
                .then(function (response) {
                    console.log(response.data);
                }, function (response) {
                    console.log(response.data.error);
                    if (response.data.error) {
                        $scope.warning = response.data.error;
                    }
                });
        };
    })
    .factory('Organizations', function ($resource) {
        'use strict';
        return {
            resource: $resource('/got_awareness_node/api/organizations')
        };
    })
    .factory('User', function ($resource) {
        'use strict';
        return {
            resource: $resource('/got_awareness_node/api/users/:user_id')
        };
    });