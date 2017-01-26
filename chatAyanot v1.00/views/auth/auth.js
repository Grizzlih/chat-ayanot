/**
 * Created by Kronenberg on 12/11/15.
 */

app.controller('authController',function($scope, $state, $http){


    $scope.goLogInPage = function() { // NAV-BAR FUNCTION
        $state.go('login');
    }

    $scope.signUp = function(){
            $http({
                method : 'POST',
                url    : 'https://api.parse.com/1/users',
                headers : {
                    'X-Parse-Application-Id': 'e9WVl4n231PutaxreVqya8m2zBtxx8mCQYhOv96E',
                    'X-Parse-REST-API-Key': '9Wh2r3cLrpuJCeQMEekwUUqCr0kev5VFVO21KQyj',
                    'Content-Type':'application/json'
                },
                data : {
                    "username" : $scope.name,
                    "password" : $scope.password,
                    "email"    : $scope.email
                }
            })
                .success(function (data, status) {
                    alert("ZBS!!!!!!!");
                    $state.go('login');
                })
                .error(function (data, status) {
                    alert("IDI NAHYI");
                });
        }
});

// http://codepen.io/odran037/pen/KdxWdZ ETOT PAREN