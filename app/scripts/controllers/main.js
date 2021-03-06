'use strict';

angular.module('pomasanaAppApp')
    .controller('MainCtrl', ['$scope', 'AuthService', '$location', '$routeParams', '$rootScope', 'UserService', '$resource', 'ErrorService', 'ToastService', 'baseUrl', 'redirectBaseUrl',
        function($scope, AuthService, $location, $routeParams, $rootScope, UserService, $resource, ErrorService, ToastService, baseUrl, redirectBaseUrl) {

            $scope.loginUrl = baseUrl + "/registration?redirect_url=" + redirectBaseUrl + "personal-page";

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
                    AuthService.setUser(response.data);
                    ToastService.welcome();
                });

                //clean path
                $location.url($location.path());


            }

        }
    ]);