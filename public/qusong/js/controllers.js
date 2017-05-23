angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    $scope.jump = function (url) {
        window.location = url;
    };
})

//用户登录控制
.controller('LoginCtrl', function ($scope, $http, Login, httpServicePost, $rootScope) {
    $scope.info = {
        mobile: "",
        encrypted_password: ""
    };
    $scope.jump = function (url) {
        window.location = url;
    };
    $scope.showerror = false;
    $scope.submit = function () {
        //        $rootScope.userid = '186';
        var info = $scope.info;
        var checkRet = Login.checkFiled(info);
        if (checkRet != null) {
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(info, '/couriers/8/login.json').then(function (resp) {
            if (resp.data.data == "Login failed") {
                alert("登录失败");
                window.location = "#/login";
            } else if (resp.data.data == "Need activate") {
                alert("您的账号还未激活，请耐心等待激活");
                window.location = "#/login";
            } else {
                alert("登录成功");
                window.location = "#/tab/dash";
                $rootScope.courierId = resp.data.data.id;
            }
            //响应成功时调用，resp是一个响应对象
        });

    }

    $scope.settings = {
        enableFriends: true
    };
})

.controller('SigninCtrl', function ($scope, Signin, httpServicePost) {
    $scope.info = {
        name: "",
        mobile: "",
        encrypted_password: "",
        reencrypted_password: "",
        addr: "",
        range: ""
    };

    $scope.showerror = false;
    $scope.sendMa = function () {

        var info = $scope.info;
        var userinfo = {
            "mobile": info.mobile,
        };
        var checkRet = Signin.checkFiled(info);
        if (userinfo.mobile == null) { //==null验证不通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = "您还未输入邮箱账号！";
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users/8/registerEmail.json').then(function (resp) {
            if (resp.data.data == "Send succ") {
                alert("验证码发送成功，请在有效期内激活，否则验证码失效！");
                //                window.location = "#/login";
            } else {
                alert("您输入的邮箱账号已被使用，请使用其他账号注册！");
            }
        });
    }
    $scope.submit = function () {
        var info = $scope.info;
        var userinfo = {
            "courier[mobile]": info.mobile,
            "courier[encrypted_password]": info.encrypted_password,
            "courier[name]": info.name,
            "courier[range]": info.range,
            "courier[email]": "",
            "courier[address]": info.addr,
        };
        var checkRet = Signin.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/couriers.json').then(function (resp) {
            if (resp.data.data == "succ") {
                alert("注册成功，为您跳转至登录页面！");
                window.location = "#/login";
            }
        });


    }
    $scope.jump = function (url) {
        window.location = url;
    };
})

.controller('FindPasswdCtrl', function ($scope) {
    $scope.jump = function (url) {
        window.location = url;
    };
    //    $scope.username = 'wangaxing';
    //  $scope.settings = {
    //    enableFriends: true
    //  };
})

.controller('ResetPasswdCtrl', function ($scope, $http, $stateParams, ResetPassword, httpServicePost) {
    $scope.info = {
        oldencrypted_password: "",
        newencrypted_password: "",
        renewencrypted_password: ""
    };

    $scope.showerror = false;

    $scope.submit = function () {
        //        var id = $rootScope.userid;
        var info = $scope.info;
        var userinfo = {
            "old_encrypted_password": info.oldencrypted_password,
            "new_encrypted_password": info.newencrypted_password,
        };
        var checkRet = ResetPassword.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/couriers/8/reset.json').then(function (resp) {
            if (resp.data.data == "Retset succ") {
                alert("修改密码成功！");
                window.location = "#/tab/account";
            }
        });


    }
    $scope.jump = function (url) {
        window.location = url;
    };
})




.controller('ShowProductCtrl', function ($scope) {
        $scope.jump = function (url) {
            window.location = url;
        };
        //    alert('www');
        //    $scope.username = 'wangaxing';
        //  $scope.settings = {
        //    enableFriends: true
        //  };
    })
    .controller('ZhuCtrl', function ($scope) {
        var sss = $scope.myVar;
        $scope.myVar = true;
        //    alert('www');
        //    $scope.username = 'wangaxing';
        //  $scope.settings = {
        //    enableFriends: true
        //  };
    })

.controller('ChatsCtrl', function ($scope, Chats, $interval, $rootScope, httpServicePost) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.chatss = [];
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
    //    var tmp = Chats.chatss;
    var timer = $interval(function () {
        //        alert("done");
        var info = {
            "courierId": $rootScope.courierId,
        };
        var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/orders/sendOrder.json').then(function (resp) {
            var tmpinfo = resp;
            Chats.chats = resp.data.data;
            $scope.chatss = Chats.chats;
//            window.location = "#/tab/chatse";
            //            $scope.chatss = resp.data.data;

        });
    }, 10000);

})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, httpServicePost, $rootScope) {
    $scope.chat = {
        id: "",
        total_price: "",
        address_id: "",
        updated_at: "",
    };
    $scope.chat = [];
    for (var i = 0; i < Chats.chats.length; i++) {
        if (Chats.chats[i].id === parseInt($stateParams.chatId)) {
            $scope.chat =Chats.chats[i];
        }
    }
    $scope.qiangdan = function () {
        var info = {
            "courierId": $rootScope.courierId,
            "orderId": $scope.chat.id
        };
        var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/waybills/fightWaybill.json').then(function (resp) {
            var tmpinfo = resp;
            
        });
        alert("抢单成功");
    }
})

.controller('AccountCtrl', function ($scope) {
    //    $scope.jump = function(url) {
    //            window.location = url;
    //    };
    $scope.settings = {
        enableFriends: true
    };
    $scope.jump = function (url) {
        window.location = url;
    };
})
    
.controller('OrderMgt', function ($scope, $rootScope, httpServicePost) {
    //    $scope.jump = function(url) {
    //            window.location = url;
    //    };
    var info = {
            "courierId": $rootScope.courierId,
        };
        var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/waybills/fightWaybill.json').then(function (resp) {
            var tmpinfo = resp;
            $scope.orders = resp.data.data;
        });
    $scope.settings = {
        enableFriends: true
    };
    $scope.jump = function (url) {
        window.location = url;
    };
});