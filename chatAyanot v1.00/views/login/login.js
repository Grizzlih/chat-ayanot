/**
 * Created by Kronenberg on 12/11/15.
 */

app.controller('loginController',function($scope, $state) {
    Parse.initialize("e9WVl4n231PutaxreVqya8m2zBtxx8mCQYhOv96E", "BhtqSMvhIRobQGyPF1hvwsibB2cFbssYuX1NXr3v");




    // ЭТО 100 ПРОЦЕНТОВ РАБОТАЕТ!!!!

    $scope.$parent.checkLogin = function() {
        if(Parse.User.current()) {
            $scope.$parent.checkUser = Parse.User.current().get("username");
            console.log($scope.$parent.checkUser = Parse.User.current().get("username"));
            $state.go('testChat');
        }
        else {
            $scope.checkUser2 = "User logedOff!";
        }
    }
    $scope.checkLogin();


    $scope.myLogOut = function() {
        Parse.User.logOut();
        console.log("loged out!!");

    }

    $scope.myLogIn = function() {
        Parse.User.logIn($scope.logName, $scope.logPassword, {
            success: function (user) {
                console.log("User : " + Parse.User.current().get("username") + " loged in!!!");

            },
            error: function (user, error) {
                console.log(error);
            }
        });

    }
})