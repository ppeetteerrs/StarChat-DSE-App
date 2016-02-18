var StarChatDSEServices = angular.module("StarChatDSEServices", ["StarChatDSE", "StarChatDSEControllers"]);

StarChatDSEServices.service("Fetch", ["$http", function($http){
    var cachedData;

    function getData(callback){
      if(cachedData) {
        callback(cachedData);
        console.log("huh");
      } else {
        $http.get('https://mean-tutorial-2-ppeetteerrs.c9users.io/infosheet').success(function(data){
          cachedData = data;
          callback(data);
          console.log("got info.json");
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