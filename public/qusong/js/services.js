angular.module('starter.services', [])

.factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Orders', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var orders = [];

        return {
            all: function () {
                return orders;
            },
            remove: function (chat) {
                orders.splice(orders.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].id === parseInt(chatId)) {
                        return orders[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Login', function () {
        // Might use a resource here that returns a JSON array
        return {
            all: function () {
                return chats;
            },
            checkFiled: function (userInfo) {
                if (userInfo.mobile == null || userInfo.mobile == undefined || userInfo.mobile == "") {
                    return "用户名格式错误，请重新输入！";
                }
                if (userInfo.encrypted_password == null || userInfo.encrypted_password == undefined || userInfo.encrypted_password == "") {
                    return "密码格式错误，请重新输入！";
                }
                return;
                //      chats.splice(chats.indexOf(chat), 1);
            },
            //    get: function(chatId) {
            //      for (var i = 0; i < chats.length; i++) {
            //        if (chats[i].id === parseInt(chatId)) {
            //          return chats[i];
            //        }
            //      }
            //      return null;
            //    }
        };
    })
    .factory('Signin', function () {
        // Might use a resource here that returns a JSON array
        return {
            all: function () {
                return chats;
            },
            checkFiled: function (userInfo) {
                if (userInfo.mobile == null || userInfo.mobile == undefined || userInfo.mobile == "") {
                    return "用户名格式错误，请重新输入！";
                }
                if (userInfo.encrypted_password == null || userInfo.encrypted_password == undefined || userInfo.encrypted_password == "") {
                    return "密码格式错误，请重新输入！";
                }
                if (userInfo.reencrypted_password == null || userInfo.reencrypted_password == undefined || userInfo.reencrypted_password == "") {
                    return "确认密码格式错误，请重新输入！";
                }
                if (userInfo.reencrypted_password != userInfo.encrypted_password) {
                    return "您输入的两次密码不一致，请重新输入！";
                }
                if (userInfo.range == null || userInfo.range == undefined || userInfo.range == "") {
                    return "您还未选择取送范围，请重新输入！";
                }
                if (userInfo.range == null || userInfo.range == undefined || userInfo.range == "") {
                    return "您还未输入工作地点，请重新输入！";
                }
                return;
                //      chats.splice(chats.indexOf(chat), 1);
            },
            //    get: function(chatId) {
            //      for (var i = 0; i < chats.length; i++) {
            //        if (chats[i].id === parseInt(chatId)) {
            //          return chats[i];
            //        }
            //      }
            //      return null;
            //    }
        };
    })
    .factory('ResetPassword', function () {
        // Might use a resource here that returns a JSON array
        return {
            all: function () {
                return chats;
            },
            checkFiled: function (userInfo) {
                
                if (userInfo.oldencrypted_password == null || userInfo.oldencrypted_password == undefined || userInfo.oldencrypted_password == "") {
                    return "密码格式错误，请重新输入！";
                }
                if (userInfo.newencrypted_password == null || userInfo.newencrypted_password == undefined || userInfo.newencrypted_password == "") {
                    return "确认密码格式错误，请重新输入！";
                }
                if (userInfo.renewencrypted_password == null || userInfo.renewencrypted_password == undefined || userInfo.renewencrypted_password == "") {
                    return "确认密码格式错误，请重新输入！";
                }
                if (userInfo.newencrypted_password != userInfo.renewencrypted_password) {
                    return "您输入的两次密码不一致，请重新输入！";
                }
                return;
                //      chats.splice(chats.indexOf(chat), 1);
            },
            //    get: function(chatId) {
            //      for (var i = 0; i < chats.length; i++) {
            //        if (chats[i].id === parseInt(chatId)) {
            //          return chats[i];
            //        }
            //      }
            //      return null;
            //    }
        };
    })

.factory('httpServicePost', function ($http) {
    // Might use a resource here that returns a JSON array
    return {
        posthttp: function (info, url) {
            var info = info;
            var promise = $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: info,
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            });
            return promise;
        }

    };
});