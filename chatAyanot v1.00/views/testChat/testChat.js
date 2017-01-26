/**
 * Created by Kronenberg on 13/11/15.
 */
(function(){
    ////////////////////////////////////
    /// app עיינות 2015 ////////////////////////////
    ////////////////////////////////////
    angular.module('chatroom', [])
        .config(httpProvider)
        .controller('mainController', mainController)
        .service('parseService', parseService)
        .factory('httpRequestInterceptor', httpRequestInterceptor)
    //    .directive('draggable', function($document) {
    //    return function(scope, element, attr) {
    //        var startX = 0, startY = 0, x = 0, y = 0;
    //        element.css({
    //            position: 'relative',
    //            cursor: 'pointer',
    //            display: 'inline-block',
    //        });
    //        element.on('mousedown', function(event) {
    //            // Prevent default dragging of selected content
    //            event.preventDefault();
    //            startX = event.screenX - x;
    //            startY = event.screenY - y;
    //            $document.on('mousemove', mousemove);
    //            $document.on('mouseup', mouseup);
    //        });
    //
    //        function mousemove(event) {
    //            y = event.screenY - startY;
    //            x = event.screenX - startX;
    //            element.css({
    //                top: y + 'px',
    //                left:  x + 'px'
    //            });
    //        }
    //
    //        function mouseup() {
    //            $document.off('mousemove', mousemove);
    //            $document.off('mouseup', mouseup);
    //        }
    //    };
    //});

    ////////////////////////////////////
    /// Config /////////////////////////
    ////////////////////////////////////

    function httpProvider($httpProvider){
        $httpProvider.interceptors.push('httpRequestInterceptor');
    };

    ////////////////////////////////////
    /// Controller /////////////////////
    ////////////////////////////////////
    function mainController(parseService, $scope, $state){
        var vm = this;
        Parse.initialize("e9WVl4n231PutaxreVqya8m2zBtxx8mCQYhOv96E", "BhtqSMvhIRobQGyPF1hvwsibB2cFbssYuX1NXr3v");

        $scope.myLogOut = function() {
            Parse.User.logOut();
            console.log("loged out!!");
            $state.go('auth');

        }
        // chto delat? tak on schitaet chto  eto toje samoe
        // nu emu ob etom skaji
        // pfff nu davai
        // ya ne budu govorit' mne po suti pohui
        // a dodelivat konechno nenado tam polnii pizdec ti je videl tam nereal prosto
        // mi v nawih treh strochkah ne mojem razobratsa a tam prikin'

        //
        var _Users = new Parse.Query(Parse.User);
        $scope.usersNickNames = [];
        $scope.usersEmails = [];
        _Users.find({success:function(items,i,item){
            $scope.chatUsers = (items.length);
            for(var i = 0; i < items.length; i++) {
                $scope.usersNickNames.push(items[i].get("username"));
            }
            for(var i = 0; i < items.length;i++) {
                $scope.usersEmails.push(items[i].get("email"));
            }

            $.each(items,function(i,item){
                //console.log(i+":"+JSON.stringify(item.get("username")));
                $scope.lol = item.get("username"); // eto prosto pizdec
                $scope.lol2 = JSON.stringify(item.get("email")); // nahyi eto nado vawe

            });

        }});





        vm.getParseData = function() {
            parseService.getData().then(function(response){
                vm.messages = response.data.results;
            });
        };

        vm.postData = function() {
            parseService.postData(vm.message).then(function(success){
                console.log('SUCCESS:', success.status, success.statusText);
            }, function(error){
                console.log('ERROR:', error.status, error.statusText);
            });
            vm.message = '';
        };

        setInterval(function(){
            vm.getParseData();
        }, 1500)
    }

    ////////////////////////////////////
    /// Service ////////////////////////
    ////////////////////////////////////

    function parseService($http){
        this.getData = function() {
            return $http({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/chat?order=-createdAt'
            });
        };

        this.postData = function(message) {
            !message ? message = 'אני גר בעיינות!' : message; // :D
            return $http({
                method: 'POST',
                url: 'https://api.parse.com/1/classes/chat',
                data: {
                    text: message,
                    chatUser: Parse.User.current().get("username"), // POBEDA BLEAD
                }
            });
        }
    }

    //////////////K/T/O/P/A/P/A/?///////
    /// Headers E/D/&/M/I/S/H/A ////////
    ////////////////////////////////////
    function httpRequestInterceptor() {
        return {
            request: function (config) {
                config.headers = {
                    'X-Parse-Application-Id': 'e9WVl4n231PutaxreVqya8m2zBtxx8mCQYhOv96E',
                    'X-Parse-REST-API-Key': '9Wh2r3cLrpuJCeQMEekwUUqCr0kev5VFVO21KQyj'
                }
                return config;
            }
        };
    }

})();