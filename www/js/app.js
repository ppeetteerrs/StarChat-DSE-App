var StarChatDSE = angular.module("StarChatDSE", ["StarChatDSEControllers", "StarChatDSEServices", "ionic", "ngCordova", "ionic-audio", "ngAnimate"]);

StarChatDSE.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: "homeCtrl"
    })
    .state('browse', {
      url: "/browse",
      templateUrl: "partials/browse.html",
      controller: "browseCtrl"
    })
    .state('download', {
      url: "/download",
      templateUrl: "partials/download.html",
      controller: "downloadCtrl"
    })
    .state('about', {
      url: "/about",
      templateUrl: "partials/about.html",
      controller: "aboutCtrl"
    })
    .state('topic', {
      url: "/topic/:year/:id/",
      templateUrl: "partials/topic.html",
      controller: "topicCtrl"
    })
    .state('offline', {
      url: "/offline/:yearid",
      templateUrl: "partials/offline.html",
      controller: "offlineCtrl"
    });
});