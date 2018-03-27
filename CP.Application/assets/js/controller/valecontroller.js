angular.module("starter").controller('valecontroller', ["$scope", "$http", "$modal", function ($scope, $http, $modal) {
        
    $scope.informData = function () {
        $scope.name = null;
    };

    $scope.leaveSistem = function () {
        localStorage.clear();
        $scope.email = null;
        $scope.logoff = null;
        $scope.ShowLogin();
    }

    $scope.sendData = function () {
        if ($scope.emailreturn == null) {
            valelibrary.ExibirMensagem("Please add email!", 'erro', $modal, false);
            return;
        }

        if (($scope.name == null) && ($scope.dateofbirth == null) && ($scope.occupation == null)) {
            valelibrary.ExibirMensagem("Please, inform item", 'erro', $modal, false);
            return;
        }
        $('.contentProcess').append('<div class="overlay"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i><span class="sr-only"></span></div>');

        var person = {};
        person.Name = $scope.name;
        person.dateofbirth = $scope.dateofbirth;
        person.occupation = $scope.occupation;

        $http({
            "method": "POST",
            "url": 'http://localhost:5656/PhysicalPersonService.svc/person/physical/add',
            "data": { physicalpersondto: person },
            "headers": {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
   .success(function (data) {
       if (data === true) {           
           $scope.name = null;
           $scope.dateofbirth = null;
           $scope.occupation = null;
           $(".overlay").remove();
           valelibrary.ExibirMensagem("Request sent successfully", 'sucesso', $modal, false);
       }
       else
           valelibrary.ExibirMensagem("There was an error submitting your data, please try again later!", 'erro', $modal, false);
   })
   .error(function (error) {
       valelibrary.ExibirMensagem((error != null ? error.message : "User dont´t exists"), 'erro', $modal, false);
   });
    }

    $scope.ShowLogin = function () {
        localStorage.clear();

        $modal.open({
            templateUrl: "autentication.html",
            backdrop: "static",
            keyboard: true,
            controller: "logincontroller",
            resolve: {
                vendedores: function () {

                    return [];
                }
            }
        });
    };

    var jsonObject = localStorage.getItem("email");
    if ((jsonObject != null) && (jsonObject !== "undefined")) {
        $scope.email = "Hi " + localStorage.getItem("email") + ", ";
        $scope.logoff = "log off";
        $scope.password = localStorage.getItem("password");
        $scope.emailreturn = localStorage.getItem("email");
        if ($scope.email == null)
            $scope.ShowLogin();
    } else {
        $scope.ShowLogin();
        return;
    }


}])