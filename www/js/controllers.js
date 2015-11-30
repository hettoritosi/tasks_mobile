angular.module('starter')

// Login Controller
.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http, $ionicLoading) {
    $scope.data = {};


    $scope.login = function() {
                   $ionicLoading.show({
                    template: 'Carregando...'
                });
               $http({
            method: 'POST',
            url: 'https://studiare-tasks.herokuapp.com/login/mobile',
              params: { 
                    email: $scope.data.username , password: $scope.data.password
                  }
            })
        .success(function(data) {
            $ionicLoading.hide();
            window.localStorage.setItem("profile", JSON.stringify(data));
            console.log(data)
            $state.go('improvements');
        }).error(function(data) {
            $ionicLoading.hide();
            console.log(data)
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'User/Password is Wrong'
            });
        });
    }
})


//----------------------------------------------------------

//Improvement Controller

.controller('ImprovementController', function ($scope, $state, $http, $ionicPopup,$window, mybaseurl ) {
    

    //Current User
    var user_mobile = JSON.parse(window.localStorage.getItem("profile"));
    $scope.user_mobile = parseInt(user_mobile[0]);
    $scope.user_admin = user_mobile[1];
    $scope.user_name = user_mobile[2];

    // var user_mobile = JSON.parse(window.localStorage.getItem("profile"));
    // $scope.user_mobile = parseInt(user_mobile["user_id"]);
    // $scope.user_admin = user_mobile["admin"];
    // $scope.user_name = user_mobile["name"];

    //Base Url
    $scope.myurlsite = mybaseurl.mywebsite;

    //Get All Users  
    $scope.users = [];
    $scope.improvement = {};
    $http.get( $scope.myurlsite + 'users.json')
      .success(function(retorno) {
        console.log(retorno);
        $scope.users = retorno;
    $scope.improvement.responsible_id = retorno[0].id;
      })
        .error(function(erro) {
        console.log(erro);
      });


    // New Task
        $scope.submeter = function() {
       $http({
            method: 'POST',
            url: $scope.myurlsite + 'improvements/new',
            params: { responsible_id: $scope.improvement.responsible_id,
                  title: $scope.improvement.title,
                  category: $scope.improvement.category,
                  content: $scope.improvement.content,
                  user_id: user_mobile[0]
                  }
            })
            .success(function() {
                $state.go('improvements')
                var alertPopup = $ionicPopup.alert({
                title: 'New Task!',
                template: 'Your New Task was Created'
            });
        })
            .error(function() {
                console.log($scope.improvement.responsible)
                $state.go('improvements')
                var alertPopup = $ionicPopup.alert({
                title: 'Nova Tarefa!',
                template: 'Sua Nova Tarefa foi Criada'
            });
        });
    };
})

//----------------------------------------------------------

//Conteudo Controller

.controller('ConteudoController', function ($scope, $state, $http, improvementservice, $ionicPopup, $stateParams, mybaseurl,$ionicLoading,$ionicSideMenuDelegate) {

    //Get All tasks using *GetAllTasksService
  //  GetAllTasksService.async().then(function() {
  //  $scope.improvements = GetAllTasksService.improvements()
  //  });
    $scope.sidemenu = function() {
    $ionicSideMenuDelegate.sidemenu();
  };
  

  // $scope.doRefresh = function() {
  //   $scope.improvements.unshift({title: 'Incoming todo ' + Date.now()})
  //   $scope.$broadcast('scroll.refreshComplete');
  //   $scope.$apply()
  // };
    
   //Ionic Loading
   $ionicLoading.show({
    template: 'Carregando...'
    });

    //Current User
    var user_mobile = JSON.parse(window.localStorage.getItem("profile"));
    $scope.user_mobile = parseInt(user_mobile[0]);
    $scope.user_admin = user_mobile[1];
    $scope.user_name = user_mobile[2];

    //Base Url
    $scope.myurlsite = mybaseurl.mywebsite;

    // Get All tasks
        $scope.improvements = [];

            $http.get( $scope.myurlsite +'improvements' + '/mobile.json')
            .success(function(retorno) {
                $ionicLoading.hide();
                console.log(retorno)
                $scope.improvements = retorno;
            })
            .error(function(erro) {
                console.log(erro);
            }); 


   //Pull to Refresh
   $scope.doRefresh = function() {
        $scope.improvements = [];

            $http.get( $scope.myurlsite +'improvements' + '/mobile.json')
            .success(function(retorno) {
                $ionicLoading.hide();
                console.log(retorno)
                $scope.improvements = retorno;
            })
            .finally(function() {
            $scope.$broadcast('scroll.refreshComplete')
            });

        }


    // Getting more about an improvement
        $scope.improvement = {};
        if($stateParams.improvement_id) {
            $http.get( $scope.myurlsite + "improvements/" + $stateParams.improvement_id +".json")
            .success(function(retorno) {
                $ionicLoading.hide();
                console.log(retorno)
                $scope.improvement = retorno;
            })
            .error(function(erro) {
                console.log(erro);
            });
        } 

})

//----------------------------------------------------------

//Users Controller

.controller('UsersController', function ($scope, $state, $http, improvementservice,mybaseurl,$ionicPopup,$ionicLoading ) {
       
    //Get All tasks using *GetAllTasksService
 //   GetAllTasksService.async().then(function() {
 //   $scope.improvements = GetAllTasksService.improvements();
 //  });

    //Ionic Loading
   $ionicLoading.show({
    template: 'Carregando...'
    });

    //Current User
    var user_mobile = JSON.parse(window.localStorage.getItem("profile"));
    $scope.user_mobile = user_mobile[0];
    $scope.user_mobile = parseInt(user_mobile[0]);
    $scope.user_admin = user_mobile[1];
    $scope.user_name = user_mobile[2];

    //Base Url
    $scope.myurlsite = mybaseurl.mywebsite;

    // Get All tasks
        $scope.improvements = [];
            $http.get( $scope.myurlsite +'improvements' + '/mobile.json')
            .success(function(retorno) {
                $ionicLoading.hide();
                console.log(retorno)
                $scope.improvements = retorno;
            })
            .error(function(erro) {
                console.log(erro);
            }); 

    //Pull to Refresh
   $scope.doRefresh = function() {
        $scope.improvements = [];

            $http.get( $scope.myurlsite +'improvements' + '/mobile.json')
            .success(function(retorno) {
                $ionicLoading.hide();
                console.log(retorno)
                $scope.improvements = retorno;
            })
            .finally(function() {
            $scope.$broadcast('scroll.refreshComplete')
            });

        }        

    //Get All Users  
    $scope.users = [];
    $http.get($scope.myurlsite + 'users.json')
      .success(function(retorno) {
        $ionicLoading.hide();
        console.log(retorno);
        $scope.users = retorno;
      })
      .error(function(erro) {
        console.log(erro);
      });

    // Information User Button
    $scope.user = improvementservice;
    $scope.information = function(user) {
        improvementservice.name = user.name;
        improvementservice.id = user.id;
        improvementservice.responsible.id = user.id;
        console.log(user.id)
        $state.go('user')
        };
})

