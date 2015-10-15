angular.module('app', [
    'ngResource'
])
    .controller('RegisterCtrl', function (
        $scope,
        Organizations
    ) {
        'use strict';
        $scope.organizations = [];
        Organizations.resource.get().$promise.then(function (response) {
            $scope.organizations = response.data ;
            $scope.organizations.unshift({name: 'Please choose an organiztion'});
            $scope.organization = $scope.organizations[0];
        });
    })
    .factory('Organizations', function ($resource) {
        'use strict';
        return {
            resource: $resource('/got_awareness_node/api/organizations')
        };
    });