(function(){
    angular
        .module('app', ['auth0.auth0','angular-jwt', 'ui.router'])
        .config(config);
        config.$inject = [
          '$stateProvider',
          '$locationProvider',
          '$urlRouterProvider',
          '$httpProvider',
          'angularAuth0Provider',
          'jwtOptionsProvider',
        ];

        function config(
            $stateProvider, 
            $locationProvider, 
            $urlRouterProvider, 
            $httpProvider,
            angularAuth0Provider,
            jwtOptionsProvider) {
            $stateProvider
            .state('home', {
                url:'/',
                controller:'HomeController',
                templateUrl:'app/home/home.html',
                controllerAs: 'vm'    
            })
            .state('callback', {
                url:'/callback',
                controller:'CallbackController',
                templateUrl: 'app/callback/callback.html',
                controllerAs: 'vm'

                })
            
            .state('profile', {
                url:'/profile',
                controller:'ProfileController',
                templateUrl:'app/profile/profile.html',
                controllerAs: 'vm'    
            });
                angularAuth0Provider.init({
                    clientID: 'flvHqyyMxrTvINVZ7w9xUBbR7RlTp3LF',
                    domain:'dev-auth-delo.auth0.com',
                    responseType: 'token id_token', // token and id token
                    redirectUri: 'https://angularclientauth.herokuapp.com/home', //callback URL
                   // redirectUri: 'http://localhost:3000/home', 
                    scope: 'openid profile',
                    audience: 'http://dev-auth-delo.com/apis'
                }) ;// initiate autorization 


                jwtOptionsProvider.config({
                    tokenGetter: function(){
                        return localStorage.getItem('access_token');
                    },
                    whiteListedDomains: ['localhost']

                });

                $httpProvider.interceptors.push('jwtInterceptor');
                $urlRouterProvider.otherwise('/');
                $locationProvider.hashPrefix('');
                $locationProvider.html5Mode(true);
                     
        }
})();