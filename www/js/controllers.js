var StarChatDSEControllers = angular.module("StarChatDSEControllers", ["StarChatDSE", "StarChatDSEServices", "pdf", "ionic", "ionic-audio", "ngCordova"]);

StarChatDSEControllers.controller("homeCtrl", ["$scope", "$http", function($scope, $http){
}]);

StarChatDSEControllers.controller("aboutCtrl", ["$scope", function($scope){
}]);

StarChatDSEControllers.controller("navCtrl", ["$scope", "$ionicSideMenuDelegate", "$timeout", function($scope, $ionicSideMenuDelegate, $timeout){
}]);

StarChatDSEControllers.controller("browseCtrl", ["$scope", "$http", "Fetch", "$ionicPopover", function($scope,$http,Fetch, $ionicPopover){
  Fetch.list(function(info) {
    $scope.topicinfo = info;
  });

  $scope.searchInput = "";
  $scope.sortType = "year";
  $scope.sortReverse = false;

  $ionicPopover.fromTemplateUrl('partials/modal.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.sortItems = function(type) {
    if (type == 1) {$scope.sortType = "year"; $scope.sortReverse = false};
    if (type == 2) {$scope.sortType = "year"; $scope.sortReverse = true};
    if (type == 3) {$scope.sortType = "fullQuestion"; $scope.sortReverse = false};
    if (type == 4) {$scope.sortType = "fullQuestion"; $scope.sortReverse = true};
    $scope.popover.hide();
  };

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
}]);

StarChatDSEControllers.controller("topicCtrl", ["$scope", "$stateParams", "$filter", "$sce", "$cordovaFileTransfer", "$cordovaFile", "$ionicLoading", "$http", "$timeout", function($scope, $stateParams, $filter, $sce, $cordovaFileTransfer, $cordovaFile, $ionicLoading, $http, $timeout){
  $scope.groupToggle = 1;
  $scope.indToggle = 0;
  $scope.Loaded = 0;
  $scope.showDetails = function(){
    $scope.detailsShow = !$scope.detailsShow;
    console.log($scope.detailsShow);
  };
  var url = $stateParams.year + "/" + $stateParams.id.slice(0,1) + $stateParams.id.slice(2,3);
  console.log("url:" + url);
  var GetData = function(){
      $ionicLoading.show({
        template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>Loading</p>",
        scope: $scope
      });
      $http.get('https://mean-tutorial-2-ppeetteerrs.c9users.io/json/' + url).success(function(data){
        $scope.topicdata = data;
        $scope.youtubeUrl = $scope.topicdata.Links.g;
        $scope.dialogue = $scope.topicdata.Dialogue.g;
        console.log("got topic.json");
        $scope.Loaded = 1;
        $ionicLoading.hide();
      },function(err){
        console.log(err);
        $ionicLoading.hide();
        alert("Please Check Your Connection");
      });
  };

  GetData();

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.topicSelect = function(){
    $scope.groupToggle = !$scope.groupToggle;
    $scope.indToggle = !$scope.indToggle;
    if($scope.groupToggle == 1){
      $scope.dialogue = $scope.topicdata.Dialogue.g;
      $scope.youtubeUrl = $scope.topicdata.Links.g;
    };
    if($scope.indToggle == 1){
      $scope.dialogue = $scope.topicdata.Dialogue.i;
      $scope.youtubeUrl = $scope.topicdata.Links.i;
    };
  };

  $scope.testFileDownload = function () {
    // File for download
    var url1 = "https://mean-tutorial-2-ppeetteerrs.c9users.io/audio/" + url + "d";
    var url2 = "https://mean-tutorial-2-ppeetteerrs.c9users.io/audio/" + url + "i";
    var url3 = "https://mean-tutorial-2-ppeetteerrs.c9users.io/pdf/groupTranscript/" + url + "d";
    var url4 = "https://mean-tutorial-2-ppeetteerrs.c9users.io/pdf/groupTranscript/" + url + "di";
    var url5 = "https://mean-tutorial-2-ppeetteerrs.c9users.io/pdf/indTranscript/" + url + "i";
    var url6 = "https://mean-tutorial-2-ppeetteerrs.c9users.io/pdf/indTranscript/" + url + "ii";
     
    // File name only
    var filename = $scope.topicdata.Details.Full_Question.split(" ").join("__").replace("?","questionmark") + "_____" + url.split("/")[0] + url.split("/")[1];
    console.log("filename:" + filename);
     
    // Save location
    var targetPath1 = cordova.file.externalRootDirectory + "StarChatDSE/" + filename + "d.mp3";
    var targetPath2 = cordova.file.externalRootDirectory + "StarChatDSE/" + filename + "i.mp3";
    var targetPath3 = cordova.file.externalRootDirectory + "StarChatDSE/" + filename + "d.pdf";
    var targetPath4 = cordova.file.externalRootDirectory + "StarChatDSE/" + filename + "di.pdf";
    var targetPath5 = cordova.file.externalRootDirectory + "StarChatDSE/" + filename + "i.pdf";
    var targetPath6 = cordova.file.externalRootDirectory + "StarChatDSE/" + filename + "ii.pdf";
     
    $cordovaFileTransfer.download(url1, targetPath1, {}, true)
    .then(function (result) {
        $cordovaFileTransfer.download(url2, targetPath2, {}, true)
        .then(function (result) {
            $cordovaFileTransfer.download(url3, targetPath3, {}, true)
            .then(function (result) {
                $cordovaFileTransfer.download(url4, targetPath4, {}, true)
                .then(function (result) {
                    $cordovaFileTransfer.download(url5, targetPath5, {}, true)
                    .then(function (result) {
                        $cordovaFileTransfer.download(url6, targetPath6, {}, true)
                        .then(function (result) {
                            alert("Download Successful! :)");
                            $ionicLoading.hide();
                        }, function (error) {
                            alert("Please Ensure Stable Connection");
                            $ionicLoading.hide();
                            $timeout(function(){
                              $ionicLoading.hide()
                            },1000);
                            console.log('Error');
                        }, function (progress) {
                            $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                            $ionicLoading.show({
                              template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (6/6)</p>",
                              scope: $scope
                            });
                        });
                    }, function (error) {
                        $ionicLoading.hide();
                        alert("Please Ensure Stable Connection");
                        console.log('Error');
                    }, function (progress) {
                        $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                        $ionicLoading.show({
                          template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (5/6)</p>",
                          scope: $scope
                        });
                    });
                }, function (error) {
                    $ionicLoading.hide();
                    alert("Please Ensure Stable Connection");
                    console.log('Error');
                }, function (progress) {
                    $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                    $ionicLoading.show({
                      template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (4/6)</p>",
                      scope: $scope
                    });
                });
            }, function (error) {
                $ionicLoading.hide();
                alert("Please Ensure Stable Connection");
                console.log('Error');
            }, function (progress) {
                $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                $ionicLoading.show({
                  template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (3/6)</p>",
                  scope: $scope
                });
            });
        }, function (error) {
            $ionicLoading.hide();
            alert("Please Ensure Stable Connection");
            console.log('Error');
        }, function (progress) {
            $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
            $ionicLoading.show({
              template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (2/6)</p>",
              scope: $scope
            });
        });
    }, function (error) {
        $ionicLoading.hide();
        alert("Please Ensure Stable Connection");
        console.log('Error');
    }, function (progress) {
        $scope.downloadProgressd = Math.round(progress.loaded / progress.total * 100);
        $ionicLoading.show({
          template: "<img src='img/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressd}}% (1/6)</p>",
          scope: $scope
        });
    });
  };
}]);
  
StarChatDSEControllers.controller("downloadCtrl", ["$scope", "$ionicPlatform", "$cordovaFile", "$cordovaMedia", "$filter", "$http", "ShowDownloads", function($scope, $ionicPlatform, $cordovaFile, $cordovaMedia, $filter, $http, ShowDownloads){
    /*$ionicPlatform.ready(function(){
      
      console.log($scope.path);
      var media = $cordovaMedia.newMedia($scope.path, null, null);
      $scope.audioPlay = media.play();
      $scope.audioPause = media.pause();
      $scope.audioStop = media.stop();
    });
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };
    $scope.track = {
      url: $scope.path,
      artist: 'Somebody',
      title: 'Song name',
      art: 'img/album_art.jpg'
    };*/
    var file = cordova.file.externalRootDirectory + "StarChatDSE/";
    ShowDownloads(file).then(function(entries){
      $scope.files = entries;
      console.log(entries);
    }, function(error){
      console.log(error);
    });
    $scope.show = function(message){
      console.log(message);
    };
}]);

StarChatDSEControllers.controller("offlineCtrl", ["$scope", "$ionicPlatform", "$cordovaFile", "$stateParams", function($scope, $ionicPlatform, $cordovaFile, $stateParams){
    var localDatabase = cordova.file.externalRootDirectory + "StarChatDSE/";
    var filename = $stateParams.yearid.replace(",","");
    console.log($stateParams.yearid.replace(",",""));
    console.log(localDatabase + filename + "d.mp3");
    $cordovaFile.readAsArrayBuffer(localDatabase, filename + "d.pdf")
      .then(function (success) {
        PDFBlob = new Blob([success], {type: 'application/pdf'});
        $scope.pdfUrl = URL.createObjectURL(PDFBlob);
      }, function (error) {
        // error
      });
    console.log(localDatabase + filename + "d.mp3");

    $scope.track = {
      url: localDatabase + filename + "d.mp3",
      artist: 'Somebody',
      title: 'Song name',
      art: 'img/album_art.jpg'
    };
}]);

/* 

    console.log(file);
    $cordovaFile.readAsArrayBuffer(file, "201311d.pdf")
      .then(function (success) {
        PDFBlob = new Blob([success], {type: 'application/pdf'});
        $scope.pdfUrl = URL.createObjectURL(PDFBlob);
      }, function (error) {
        // error
      });

    $scope.openopen= function(){
      $cordovaFileOpener2.open(
        $scope.path,
        'application/pdf'
      ).then(function() {
          // Success!
      }, function(err) {
          // An error occurred. Show a message to the user
      });
    };

 */