var StarChatDSEControllers = angular.module("StarChatDSEControllers", ["StarChatDSE", "StarChatDSEServices", "pdf", "ionic", "ionic-audio", "ngCordova"]);

StarChatDSEControllers.controller("homeCtrl", ["$scope", "$localStorage", "$sessionStorage", "$state", "$rootScope", "$ionicPlatform", function($scope, $localStorage, $sessionStorage, $state, $rootScope, $ionicPlatform){
  // Show Tutorial
  /*$localStorage.$reset(); //DELETE DURING PRODUCTION
  if(!$localStorage.launchNumber) {
    console.log("first time");
    var state = "intro";
    $state.go(state);
    $localStorage.launchNumber = 1;
  } else {
    $localStorage.launchNumber = $localStorage.launchNumber + 1;
  };
  console.log($localStorage.launchNumber);*/

  
}]);

StarChatDSEControllers.controller("introCtrl", ["$scope", "$ionicSlideBoxDelegate", function($scope, $ionicSlideBoxDelegate){
  $scope.image_list = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,1];
}]);

StarChatDSEControllers.controller("aboutCtrl", ["$scope", function($scope){
}]);

StarChatDSEControllers.controller("navCtrl", ["$scope", "$ionicSideMenuDelegate", "$timeout", function($scope, $ionicSideMenuDelegate, $timeout){
}]);

StarChatDSEControllers.controller("browseCtrl", ["$scope", "$http", "Fetch", "$ionicPopover", "$ionicLoading", function($scope,$http,Fetch, $ionicPopover, $ionicLoading){
  Fetch.list(function(info) {
    $scope.topicinfo = info;
    $ionicLoading.hide();
  });

  $scope.searchInput = "";
  $scope.sortType = ["year","questionNumber","fullQuestion"];

  $ionicPopover.fromTemplateUrl('partials/browse_popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.sortItems = function(type) {
    if (type == 1) {$scope.sortType = ["year","questionNumber","fullQuestion"]};
    if (type == 2) {$scope.sortType = ["-year","-questionNumber","fullQuestion"]};
    if (type == 3) {$scope.sortType = ["fullQuestion","year","questionNumber"]};
    if (type == 4) {$scope.sortType = ["-fullQuestion","year","questionNumber"]};
    $scope.popover.hide();
  };

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
}]);

StarChatDSEControllers.controller("teachBrowseCtrl", ["$scope", "$http", "Fetch", "$ionicPopover", "$ionicLoading", "$state", "$ionicHistory", "$rootScope", function($scope,$http,Fetch, $ionicPopover, $ionicLoading, $state, $ionicHistory, $rootScope){
  Fetch.list(function(info) {
    $scope.topicinfo = info;
    $ionicLoading.hide();
  });

  $scope.searchInput = "";
  $scope.sortType = ["year","questionNumber","fullQuestion"];

  $ionicPopover.fromTemplateUrl('partials/browse_popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.sortItems = function(type) {
    if (type == 1) {$scope.sortType = ["year","questionNumber","fullQuestion"]};
    if (type == 2) {$scope.sortType = ["-year","-questionNumber","fullQuestion"]};
    if (type == 3) {$scope.sortType = ["fullQuestion","year","questionNumber"]};
    if (type == 4) {$scope.sortType = ["-fullQuestion","year","questionNumber"]};
    $scope.popover.hide();
  };

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.clearCache = function(year,id){
    console.log("year: " + year + "id: " + id);
    $ionicHistory.clearCache().then(function(){
      $rootScope.yearid = "";
      $state.go("teach", {year : year, id : id});
    }); 
  };
}]);

StarChatDSEControllers.controller("teachCtrl", ["$scope", "$stateParams", "$ionicLoading", "$http", "$cordovaToast", "$timeout", function($scope, $stateParams, $ionicLoading, $http, $cordovaToast, $timeout){
  $ionicLoading.show({
    template: "<img src='partials/loading.svg'></img>",
    scope: $scope
  });
  $scope.groupToggle = 1;
  $scope.Loaded = 0;
  $scope.title = [];
  $scope.title.year = $stateParams.year;
  $scope.title.id = $stateParams.id;

  var url = $stateParams.year + "/" + $stateParams.id.slice(0,1) + $stateParams.id.slice(2,3);
  console.log("url:" + url);

  var groupUrl = "http://starchatdse.com/pdf/groupTranscript/" + url + "di";
  var indUrl = "http://starchatdse.com/pdf/indTranscript/" + url + "ii";

  $scope.pdfUrl = groupUrl;

  $scope.topicSelect = function(id){
    $ionicLoading.show({
      template: "<img src='partials/loading.svg'></img>",
      scope: $scope
    });
    if(id == 1){
      $scope.pdfUrl = groupUrl;
      $scope.groupToggle = 1;
    };
    if(id == 2){
      $scope.pdfUrl = indUrl;
      $scope.groupToggle = 0;
    };
  };

  $scope.onLoad = function(){
    console.log("loaded");
    $timeout(function(){
      $ionicLoading.hide();
      console.log("hidden");
    },3000);
  };

  $scope.onError = function(error) {
    $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
  };
}]);

StarChatDSEControllers.controller("topicCtrl", ["$scope", "$stateParams", "$filter", "$sce", "$cordovaFileTransfer", "$cordovaFile", "$ionicLoading", "$http", "$cordovaToast", "$ionicPopup", function($scope, $stateParams, $filter, $sce, $cordovaFileTransfer, $cordovaFile, $ionicLoading, $http, $cordovaToast, $ionicPopup){
  $scope.groupToggle = 1;
  $scope.Loaded = 0;
  $scope.showDetails = function(){
    $scope.detailsShow = !$scope.detailsShow;
    console.log($scope.detailsShow);
  };
  var url = $stateParams.year + "/" + $stateParams.id.slice(0,1) + $stateParams.id.slice(2,3);
  console.log("url:" + url);
  var GetData = function(){
      $ionicLoading.show({
        template: "<img src='partials/loading.svg'></img>",
      });
      $http.get('http://starchatdse.com/json/' + url).success(function(data){
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

  $scope.topicSelect = function(id){    
    if(id == 1){
      $scope.dialogue = $scope.topicdata.Dialogue.g;
      $scope.youtubeUrl = $scope.topicdata.Links.g;
      $scope.groupToggle = 1;
    };
    if(id == 2){
      $scope.dialogue = $scope.topicdata.Dialogue.i;
      $scope.youtubeUrl = $scope.topicdata.Links.i;
      $scope.groupToggle = 0;
    };
  };

  $scope.confirmDownload = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Comfirm Download',
     template: 'Are you sure you want to download an offline version?',
     scope: $scope
   }).then(function(res) {
     if(res) {
      $cordovaToast.show('Download Started', 'long', 'bottom');
      $scope.testFileDownload();
     } else {
       $cordovaToast.show('Cancelled', 'long', 'bottom');
     }
   });
  };

  $scope.testFileDownload = function () {
    // File for download
    var url1 = "http://starchatdse.com/audio/" + url + "d";
    var url2 = "http://starchatdse.com/audio/" + url + "i";
    var url3 = "http://starchatdse.com/pdf/groupTranscript/" + url + "d";
    var url4 = "http://starchatdse.com/pdf/groupTranscript/" + url + "di";
    var url5 = "http://starchatdse.com/pdf/indTranscript/" + url + "i";
    var url6 = "http://starchatdse.com/pdf/indTranscript/" + url + "ii";
     
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
                            $ionicLoading.hide();
                            $cordovaToast
                            .show('Download Successful! =)', 'long', 'center')
                            .then(function(success) {
                              $ionicLoading.hide();
                            }, function (error) {
                              $ionicLoading.hide();
                            });
                        }, function (error) {
                            $ionicLoading.hide();
                            $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
                            console.log('Error');
                        }, function (progress) {
                            $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                            $ionicLoading.show({
                              template: "<img src='partials/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (6/6)</p>",
                              scope: $scope
                            });
                        });
                    }, function (error) {
                        $ionicLoading.hide();
                        $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
                        console.log('Error');
                    }, function (progress) {
                        $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                        $ionicLoading.show({
                          template: "<img src='partials/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (5/6)</p>",
                          scope: $scope
                        });
                    });
                }, function (error) {
                    $ionicLoading.hide();
                    $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
                    console.log('Error');
                }, function (progress) {
                    $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                    $ionicLoading.show({
                      template: "<img src='partials/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (4/6)</p>",
                      scope: $scope
                    });
                });
            }, function (error) {
                $ionicLoading.hide();
                $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
                console.log('Error');
            }, function (progress) {
                $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
                $ionicLoading.show({
                  template: "<img src='partials/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (3/6)</p>",
                  scope: $scope
                });
            });
        }, function (error) {
            $ionicLoading.hide();
            $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
            console.log('Error');
        }, function (progress) {
            $scope.downloadProgressi = Math.round(progress.loaded / progress.total * 100);
            $ionicLoading.show({
              template: "<img src='partials/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressi}}% (2/6)</p>",
              scope: $scope
            });
        });
    }, function (error) {
        $ionicLoading.hide();
        $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
        console.log('Error');
    }, function (progress) {
        $scope.downloadProgressd = Math.round(progress.loaded / progress.total * 100);
        $ionicLoading.show({
          template: "<img src='partials/loading.svg'></img><br><p style='font-size: 20px'>{{downloadProgressd}}% (1/6)</p>",
          scope: $scope
        });
    });
  };
}]);
  
StarChatDSEControllers.controller("downloadCtrl", ["$scope", "$ionicPlatform", "$cordovaFile", "$cordovaMedia", "$filter", "$http", "ShowDownloads", "$cordovaFile", "$cordovaToast", "$ionicPopup", "$state", "$ionicHistory", "$rootScope", function($scope, $ionicPlatform, $cordovaFile, $cordovaMedia, $filter, $http, ShowDownloads, $cordovaFile, $cordovaToast, $ionicPopup, $state, $ionicHistory, $rootScope){
    $scope.filedir = cordova.file.externalRootDirectory + "StarChatDSE/";
    $scope.deletepath = cordova.file.externalRootDirectory;

    $scope.checkFiles = function(filedir){
      ShowDownloads(filedir).then(function(entries){
        $scope.files = entries;
        console.log(entries);
        console.log($scope.files.length);
      }, function(error){
        console.log("error");
        $scope.files = [];
        console.log($scope.files.length);
      });
    };

    $scope.checkFiles($scope.filedir);

    $scope.show = function(message){
      console.log(message);
    };

    $scope.Sorter = function(file) {
      return file.name.split("_____")[1].substring(0, 6);
    };

    $scope.removeAll = function(){
      $cordovaFile.removeRecursively($scope.deletepath,"StarChatDSE")
        .then(function (success) {
          $cordovaToast.show('All Local Files Deleted!', 'long', 'bottom');
          $scope.checkFiles($scope.filedir);
        }, function (error) {
          $cordovaToast.show('Folder is Already Empty =(', 'long', 'bottom');
      });
    };

    $scope.confirmRemovalAll = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Comfirm Removal',
       template: 'Are you sure you want to remove all downloaded files?',
       scope: $scope
     }).then(function(res) {
       if(res) {
         $scope.removeAll();
       } else {
         $cordovaToast.show('Cancelled', 'long', 'bottom');
       }
     });
    };

    /* ADD THIS TO ION-ITEM : on-hold="confirmRemovalItem(file.name.split('d.pdf'))"

    $scope.confirmRemovalItem = function(fileName) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Comfirm Removal',
        template: 'Are you sure you want to remove this file?',
        scope: $scope
        }).then(function(res) {
        if(res) {
          var name = fileName.slice(0, -1);
          $cordovaFile.removeFile($scope.filedir, name + "d.pdf").then(function (success) {
            $cordovaFile.removeFile($scope.filedir, name + "i.mp3").then(function (success) {
              $cordovaFile.removeFile($scope.filedir, name + "d.mp3").then(function (success) {
                $cordovaFile.removeFile($scope.filedir, name + "di.pdf").then(function (success) {
                  $cordovaFile.removeFile($scope.filedir, name + "i.pdf").then(function (success) {
                    $cordovaFile.removeFile($scope.filedir, name + "ii.pdf").then(function (success) {
                      $cordovaToast.show('Files Successfully Deleted!', 'long', 'bottom');
                      $scope.checkFiles($scope.filedir);
                      }, function (error) {$cordovaToast.show('An Error Occurred =(', 'long', 'bottom');
                    });
                    }, function (error) {$cordovaToast.show('An Error Occurred =(', 'long', 'bottom');
                  });
                  }, function (error) {$cordovaToast.show('An Error Occurred =(', 'long', 'bottom');
                });
                }, function (error) {$cordovaToast.show('An Error Occurred =(', 'long', 'bottom');
              });
              }, function (error) {$cordovaToast.show('An Error Occurred =(', 'long', 'bottom');
            });
            }, function (error) {$cordovaToast.show('An Error Occurred =(', 'long', 'bottom');
          });
        } else {
          $cordovaToast.show('Cancelled', 'long', 'bottom');
        };
      });
    };*/

    $scope.goToBrowse = function(length){
      if(length == 0){
        $state.go("browse");
      };
    };

    $scope.goToOfflineView = function(yearid){
      console.log(yearid);
      if ($rootScope.yearid != yearid && $rootScope.yearid) {
        $ionicHistory.clearCache().then(function(){
          console.log("Cache is cleared!");
          $state.go("offline", {yearid : yearid});
        });
      } else {
        $state.go("offline", {yearid : yearid});
      };
      
    };
}]);

StarChatDSEControllers.controller("offlineCtrl", ["$scope", "$ionicPlatform", "$cordovaFile", "$stateParams", "$timeout", "$rootScope", "$ionicLoading", "$ionicPopover", "MediaManager", function($scope, $ionicPlatform, $cordovaFile, $stateParams, $timeout, $rootScope, $ionicLoading, $ionicPopover, MediaManager){

    $rootScope.yearid = $stateParams.yearid;
    $scope.groupInd = 'd';
    $scope.verbatimImprove = '';
    $scope.localDatabase = cordova.file.externalRootDirectory + "StarChatDSE/";
    $scope.filename = $stateParams.yearid.replace(",","");
    $scope.dynamicTrack = {};
    $scope.tracks = [
        {
            url: $scope.localDatabase + $scope.filename + "d.mp3",  // audio file from the cloud
            title:'Group'
        },
        {
            url: $scope.localDatabase + $scope.filename + "i.mp3", // audio file stored in device's app folder
            title: 'Individual'
        }
    ];
    

    $scope.stopPlayback = function() {
        MediaManager.stop();  // will stop any audio currently playing
    };

    $scope.playTrack = function(index) {
        $scope.dynamicTrack = $scope.tracks[index];
    };

    $scope.readPDF = function(groupInd, verbatimImprove){
      $ionicLoading.show({
        template: "<img src='partials/loading.svg'></img>",
      });
      $cordovaFile.readAsArrayBuffer($scope.localDatabase, $scope.filename + groupInd + verbatimImprove + ".pdf")
      .then(function (success) {
        PDFBlob = new Blob([success], {type: 'application/pdf'});
        $scope.pdfUrl = URL.createObjectURL(PDFBlob);
        if(groupInd == 'd'){$scope.playTrack(0);};
        if(groupInd == 'i'){$scope.playTrack(1);};
      }, function (error) {
      });
    };

    $scope.readPDF($scope.groupInd, $scope.verbatimImprove);

    $scope.onLoad = function(){
      console.log("loaded");
      $timeout(function(){
        $ionicLoading.hide();
        console.log("hidden");
      },1000);
    };

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    $ionicPopover.fromTemplateUrl('partials/offline_settings.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });
}]);
