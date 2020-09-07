(function(){
  'use strict';
  
  angular.module('searchListApp', [])
  .controller('searchListController', searchListController)
  .service('searchListService', searchListService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('searchList', SearchListDirective);

  function SearchListDirective() {
    var ddo = {
      templateUrl: 'searchList.html', 
      scope: {
          found: '<',
          searchTerm: '<',
          onRemove : '&'
      }, 
      controller: searchListController, 
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }


  searchListController.$inject = ['searchListService'];
  function searchListController( searchListService) {

    var list = this;
    
    list.searchTerm = "";
    list.found = [];

    list.removeItem = function(index) {
      list.found.splice(index,1);
    }

    list.getItems = function(searchTerm) {
      var tmp = searchListService.getMatchedItems();
      var i = 0;
      for(; i<tmp.length; ++i) {
        var j = 0;
        console.log(tmp[i]);
        for(;j<tmp[i].length;++j) {
          list.found.push(tmp[i][j]);
        }
      }
      console.log(list.found);
    }

  }

  searchListService.$inject = ['$http', 'ApiBasePath']; 
  function searchListService($http, ApiBasePath) {
    var service = this;

    service.getMatchedItems = function() {
      return $http({
        method: 'GET', 
        url: ApiBasePath
      }).then(function (result) {
        let items = result.data;

        // console.log(items);
        // process result and only keep items that match
        // var foundItems = items.filter(function(str){return str.include(searchTerm)});
        // return processed items
        return items;
      }).catch(function(error){
        console.log('Error: cannot get menu items.');
      });
    }
    
    
  }
  
  })();

 