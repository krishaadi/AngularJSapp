(function() {
    angular.module('app').controller('HomeController', homeController)
//inject http controller

homeController.$inject = ['$http', 'authService']
    function homeController($http, authService) {
        var vm = this;
        vm.auth = authService;

        vm.message = '';
        vm.getMessage = function() {
            $http.get('/authorized')
            .then(
                function(result)
                {
                    vm.message = result.data.message;
                },
                function(err)
                {
                    console.log(err);//
                }
            );
        };
    }
})();