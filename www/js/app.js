var StarChatDSE = angular.module("StarChatDSE", ["StarChatDSEControllers", "StarChatDSEServices", "ionic", "ngCordova", "ionic-audio", "ngAnimate", "ngTouch", "ngStorage"]);

StarChatDSE.config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  console.log("configuring");
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('intro', {
      url: "/intro",
      templateUrl: "partials/intro.html",
      controller: "introCtrl",
      cache: false
    })
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: "homeCtrl",
      cache: false
    })
    .state('browse', {
      url: "/browse",
      templateUrl: "partials/browse.html",
      controller: "browseCtrl",
      cache: false
    })
    .state('teach_browse', {
      url: "/teach_browse",
      templateUrl: "partials/teach_browse.html",
      controller: "teachBrowseCtrl",
      cache: false
    })
    .state('teach', {
      url: "/teach/:year/:id",
      templateUrl: "partials/teach.html",
      controller: "teachCtrl",
      cache: false
    })
    .state('download', {
      url: "/download",
      templateUrl: "partials/download.html",
      controller: "downloadCtrl",
      cache: false
    })
    .state('about', {
      url: "/about",
      templateUrl: "partials/about.html",
      controller: "aboutCtrl",
      cache: false
    })
    .state('topic', {
      url: "/topic/:year/:id",
      templateUrl: "partials/topic.html",
      controller: "topicCtrl",
      cache: false
    })
    .state('offline', {
      url: "/offline/:yearid",
      templateUrl: "partials/offline.html",
      controller: "offlineCtrl"
    });

    $ionicConfigProvider.views.transition('none');
    /* install ionic-native-transitions to use
    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 800, // in milliseconds (ms), default 400,
      slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
      iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
      androiddelay: -1, // same as above but for Android, default -1
      winphonedelay: -1, // same as above but for Windows Phone, default -1,
      fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      triggerTransitionEvent: '$ionicView.enter', // internal ionic-native-transitions option
      backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    });
    $ionicNativeTransitionsProvider.setDefaultTransition({
      type: 'fade'
    });
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
      type: 'fade'
    });*/
}]);

StarChatDSE.run(["$ionicPlatform", function($ionicPlatform) {
  console.log("running");

}]);


