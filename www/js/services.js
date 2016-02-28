var StarChatDSEServices = angular.module("StarChatDSEServices", ["StarChatDSE", "StarChatDSEControllers"]);

StarChatDSEServices.service("Fetch", ["$http", "$ionicLoading", "$cordovaToast", function($http, $ionicLoading, $cordovaToast){
    var cachedData;

    function getData(callback){
      $ionicLoading.show({
        template: "<img src='partials/loading.svg'></img>",
      });
      if(cachedData) {
        callback(cachedData);
        console.log("infosheet is cached");
      } else {
        $http.get('http://starchatdse.com/infosheet').success(function(data){
          cachedData = data;
          callback(data);
          console.log("got info.json");
        }, function(error){
          $cordovaToast.show('Please Ensure Stable Connection', 'long', 'bottom');
        });
      }
    }
    return {
        list: getData
    }
}]);

StarChatDSEServices.service("ShowDownloads", ["$q", function($q){
  getEntries = function(path) {
      var deferred = $q.defer();
      window.resolveLocalFileSystemURL(path, function(fileSystem) {
          var directoryReader = fileSystem.createReader();
          directoryReader.readEntries(function(entries) {
              deferred.resolve(entries);
          }, function(error) {
              deferred.reject(error);
          });
      }, function(error) {
          deferred.reject(error);
      });
      return deferred.promise;
  };
  return getEntries;
}]);