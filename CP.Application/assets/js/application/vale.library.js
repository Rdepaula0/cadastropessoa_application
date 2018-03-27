var valelibrary = {};

valelibrary.ExibirMensagem = function (mensagem, tipoMensagem, $modal, callback) {
    var modalInstance = $modal.open({
        templateUrl: 'modalMensagem',
        controller: function ControllerMensagem($scope, $modalInstance, Mensagem, callBack) {
            $scope.mensagem = Mensagem;
            switch (tipoMensagem) {
                case "erro":
                    $scope.tipomensagem = "alert-danger";
                    break;
                case "sucesso":
                    $scope.tipomensagem = "alert-success";
                    break;
                case "info":
                    $scope.tipomensagem = "alert-info";
                    break;
                default:
                    $scope.tipomensagem = "alert-success";
                    break;
            }


            $scope.YesNo = false;
            $scope.ok = function () {
                $modalInstance.close();
                if (callback)
                    callBack();
            };
            $scope.close = function () {
                $modalInstance.close();
            };
        },
        resolve: {
            Mensagem: function () {
                return mensagem;
            },
            callBack: function () {
                return callback;
            }
        }
    });
};