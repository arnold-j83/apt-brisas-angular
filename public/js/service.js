angular.module('myService', [])
    .factory('MyService', function($http) {
 
        MyService = {
            getPrice: function(url) {
                //return $http.post(url, data);
                return $http.get(url);
            }
        };
        return MyService;
    });