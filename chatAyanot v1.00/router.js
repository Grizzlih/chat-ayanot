/**
 * Created by Kronenberg on 12/11/15.
 */


app.config(
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/auth');
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'views/auth/auth.html',
            controller: 'authController'
        })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login/login.html',
                controller: 'loginController'
            })
            .state('testChat', {
                url: '/testChat',
                templateUrl: 'views/testChat/testChat.html',
                controller: 'mainController as ctrl'
            })
    });

