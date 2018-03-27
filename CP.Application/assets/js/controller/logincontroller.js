angular.module('starter').controller("logincontroller", function ($scope, vendedores, $modal, $rootScope, $modalInstance, $http) {
    $scope.register = true;

    $scope.autentication = function (login, password) {
        $http({
            "method": "GET",
            "url": 'http://localhost:5656/UserService.svc/user/find/' + login + "/" + password,
            "headers": {
                'Content-Type': 'application/json; charset=UTF-8',
                "Accept": "application/json, text/plain, */*"
            }
        })
            .success(function (data) {
                localStorage.setItem("email", data.Email);
                window.location.href = "index.html";
            })
            .error(function (error) {
                crosslibrary.ExibirMensagem((error != null ? error.message : "User dont´t exists"), 'erro', $modal, false);
            });
    };

    $scope.newregister = function (status) {
        $scope.register = status;
    }

    $scope.registration = function (email, password) {
        $http({
            "method": "POST",
            "url": 'http://localhost:5656/UserService.svc/user/add',
            "data": { userdto: { Email: email, Password: password } },
            "headers": {
                'Content-Type': 'application/json; charset=UTF-8',
                "Accept": "application/json, text/plain, */*"
            }
        })
           .success(function (data) {
               if (data === true) {
                   $scope.register = false;
                   localStorage.setItem("email", email);
                   valelibrary.ExibirMensagem("Successful registration", 'sucesso', $modal, false);
                   window.location.href = "index.html";
               }
               else
                   valelibrary.ExibirMensagem("Error saving data, please try again later!", 'erro', $modal, false);
           })
           .error(function (error) {
               valelibrary.ExibirMensagem((error != null ? error.message : "User dont´t exists"), 'erro', $modal, false);
           });

    };

})