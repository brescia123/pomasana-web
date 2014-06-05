'use strict';

angular.module('pomasanaAppApp')
    .controller('MainCtrl', function($scope, AuthService, $location, $routeParams, $rootScope, UserService, $resource, ErrorService, ToastService, baseUrl) {

        if ($routeParams.access_token) {

            AuthService.login($routeParams.access_token);

            var userRes = $resource(baseUrl + '/users/me', {}, {
                getMe: {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': $routeParams.access_token
                    }
                }
            })

            userRes.getMe(function(response) {
                $rootScope.currentUser = response.data;
                ToastService.welcome();
            });

            //clean path
            $location.url($location.path());
        }

    });