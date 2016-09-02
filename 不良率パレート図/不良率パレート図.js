'use strict';

var app = angular.module('myApp.不良率パレート図Panel', [
    'myApp.modalSelector.Common',
    'myApp.FuryoCommon',
    'myApp.modalSelector.JyuchuApp.製品マスタ'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '不良率パレート図.html',
    controller: '不良率パレート図Ctrl'
  })  
  .otherwise({redirectTo: '/'});

}])

var 不良率パレート図Panel = PrintPanel.extend(appendTraits([MenuBarTrait], {
    cl_conds: [
        {"label": "実績日", "input_type": "text", "id_name": "実績日", "column_type": "int", "is_primary_key": false, "text": "", proj:"A.実績日"},
        {"label": "型名", "input_type": "text", "id_name": "型名", "column_type": "nvarchar", "is_primary_key": false, "text": "", proj:"A.型名"}
    ],
    init: function(parent, $scope, $window, $modal, $service, params) {
        this._super(parent, '不良率パレート図Panel', $scope, $modal, $service, 'SNY_KoteiDB', 'Ｋ＿工程実績不良ファイル', this.cl_conds,
        { 
            'データ選択':'1', 
            '出力指定':'1', 
            '集計指定':'1',
            'グラフ指定':'0'
        }); 
        this._init_MenuBar($scope, $window, $modal, $service, "FuryoApp", "不良率パレート図Panel", params);
        this.koteigroupPanel = new 工程グループPanel(this, $scope, $modal, $service);
        this.registerModalCtrls('SNY_JyuchuDB', {
            'Ｊ＿製品マスタ': 製品マスタModalInstanceCtrl
        });
        this.conds['実績日'].text = createCurrentDateNum();    
        this.props['期間'] = 12;
    },
    
    keypress: function (event, called_from) {
        var self = this;
        if (event.keyCode === 112) { // 112=> F1 key
            if (called_from === '型名') {
                open_製品マスタModal(this, function (selectedItem) {
                    self.conds['型名'].text = selectedItem['型名'];
                });
            };
            event.preventDefault();
        } else if (event.keyCode === 13) { // 13=> enter key
        } 
    },
    
}));

app.controller('不良率パレート図Ctrl', function($scope, $window, $modal, SNY_Factory, $location) {
    var params = getUrlParameter($location.absUrl());
    $scope.MI = new 不良率パレート図Panel(null, $scope, $window, $modal, SNY_Factory, params);
});

//app.controller('不良率パレート図Ctrl', function($scope, $modal, SNY_Factory) {
//    $scope.MI = new 不良率パレート図Panel(null, $scope, $modal, SNY_Factory);
//    SNY_Factory.async_tokencheck().then(function(data) {
//        $scope.authorized = data.authorized;
//        if (!data.authorized) {
//            alert('unauthorized access!')
//        }
//    })
//});
