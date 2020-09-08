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
          data: '<',
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
    list.data = [];

    list.removeItem = function(index) {
      list.found.splice(index,1);
    }

    list.getItems = function(searchTerm) {
      searchListService.getMatchedItems().then(function(items){
        // list.found = items;
        list.found = [];
        let menu = items['menu_items'];
        console.log('Menu:', items['menu_items'][0]);
        for(var i =0; i<menu.length;++i) {
          if(menu[i].name.includes(searchTerm)) {
            list.found.push(menu[i]);
          }
        }

      });
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
        // console.log('Result data: ', JSON.parse(items));
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

 