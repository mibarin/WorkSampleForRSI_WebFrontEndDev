var Ｊ＿製品マスタ_modalId = getModalId('Ｊ＿製品マスタ');
var Ｊ＿製品マスタ_modalIElement = getModalElement('Ｊ＿製品マスタ');

var app = angular.module('myApp.modalSelector.JyuchuApp.製品マスタ', [
    'myApp.config'
])
.directive(Ｊ＿製品マスタ_modalId, function() {
  return {
    restrict: 'E',
    templateUrl: '/SNY_Factory/modal_selector/JyuchuApp/製品マスタ/製品マスタ.html'
  };
})

//
var 製品マスタModalPanel = ListModalPanel.extend({
    init: function($scope, $modal, $service, $modalInstance, detail) {
        var columnDefs = [
            {name: '型名'},
            {name: '製品グループ', displayName: '製品', width:120},
            {name: '工程グループ', displayName: '工程', width:120},
            {name: '管轄工場', displayName: '管轄', width:120},
        ]
        var conds = [
            {"label": "型名", "input_type": "text", "id_name": "型名", "column_type": "nvarchar", "is_primary_key": true, "text": ""},
            {"label": "管轄工場", "input_type": "text", "id_name": "管轄工場", "column_type": "nvarchar", "is_primary_key": false, "text": ""},
            {"label": "工程グループ", "input_type": "text", "id_name": "工程グループ", "column_type": "nvarchar", "is_primary_key": false, "text": ""},
            {"label": "製品グループ", "input_type": "text", "id_name": "製品グループ", "column_type": "nvarchar", "is_primary_key": false, "text": ""},
        ]
        var props = {}
        var gridOptions = {
            enableRowHeaderSelection: false,
            multiSelect: false,
            columnDefs: columnDefs
        }
        this._super('製品マスタModalPanel', $scope, $modal, $service, $modalInstance, 'SNY_JyuchuDB', 'Ｊ＿製品マスタ', conds, gridOptions, props);        
        this.query();
    },
    
    keypress: function (event, called_from) {
        if (event.keyCode === 112) { // 112=> F1 key
            event.preventDefault();
        } else if (event.keyCode === 13) { // 13=> enter key
            event.preventDefault();
        }
    }
});

var 製品マスタModalInstanceCtrl = function($scope, $modal, SNY_Factory, $modalInstance, detail) {
    $scope.modal = new 製品マスタModalPanel($scope, $modal, SNY_Factory, $modalInstance, detail);
}

function open_製品マスタModal(self, action, detail) {
    self.openModal(Ｊ＿製品マスタ_modalIElement, 製品マスタModalInstanceCtrl, action, detail, MODAL_SIZE_600);
}

function open_製品マスタModalPanel(self, cdNames, propNames, detail) {
    self.openModalPanel(Ｊ＿製品マスタ_modalIElement, 製品マスタModalInstanceCtrl, cdNames, propNames, detail, MODAL_SIZE_600);
}

