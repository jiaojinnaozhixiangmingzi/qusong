// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform, $rootScope) {
    $rootScope.courierId = '';
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'SigninCtrl'
    })

    .state('findPasswd', {
        url: '/findPasswd',
        templateUrl: 'templates/findPasswd.html',
        controller: 'FindPasswdCtrl'
    })

    .state('tab.resetPasswd', {
        url: '/resetPasswd',
        views: {
            'tab-account': {
                templateUrl: 'templates/resetPasswd.html',
                controller: 'ResetPasswdCtrl'
            }
        }
        //    templateUrl: 'templates/resetPasswd.html',
        //    controller: 'ResetPasswdCtrl'
    })

    .state('zhu', {
        url: '/zhu',
        templateUrl: '#/tab/dash',
        controller: 'ZhuCtrl'
    })

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('showProduct', {
        url: '/showProduct',
        templateUrl: 'templates/showProduct.html',
        controller: 'ShowProductCtrl'
    })
    
    .state('orderMgt', {
        url: '/orderMgt',
        templateUrl: 'templates/orderMgt.html',
        controller: 'OrderMgt'
    })
    .state('order-detail', {
            url: '/order-detail',
            templateUrl: 'templates/order-detail.html',
            controller: 'OrderDetailCtrl',
            cache: false

    })
    
    .state('tab.chatsssss', {
            url: '/chatse',
            
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl',
                    cache: false
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    //  $urlRouterProvider.otherwise('/tab/dash');

});