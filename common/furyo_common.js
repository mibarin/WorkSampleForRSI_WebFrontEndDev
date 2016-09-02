'use strict';

var app = angular.module('myApp.FuryoCommon', [
 //   'myApp.sf_base'
])

.directive("sfFuryoDataSelection", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-data-selection.html'))
.directive("sfFuryoShutsuryokuSelection", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-shutsuryoku-selection.html'))
.directive("sfFuryoShutsuryokujunSelection", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-shutsuryokujun-selection.html'))
.directive("sfFuryoKakeritsutankaFields", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-kakeritsutanka-fields.html'))
.directive("sfFuryoGraphSelection", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-graph-selection.html'))
.directive("sfFuryoKatamei", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-katamei.html'))
.directive("sfFuryoShukeiOption", registerAddPrint('/SNY_Factory/main/FuryoApp/common/html/sf-furyo-shukei-option.html'));

// [WARNING] type of 集計区分 must be int. do not use string! e.g, don't use {'集計区分': '1', '集計区分名': '対象外'},
var shukei_kubun_master = [
    {'集計区分': 0, '集計区分名': '対象外'},
    {'集計区分': 1, '集計区分名': '外観'},
    {'集計区分': 2, '集計区分名': 'コイル'},
    {'集計区分': 3, '集計区分名': '動作特性'},
    {'集計区分': 4, '集計区分名': 'スイッチ特性'},
    {'集計区分': 5, '集計区分名': '耐電圧'},
    {'集計区分': 6, '集計区分名': '絶縁抵抗'},
    {'集計区分': 7, '集計区分名': '波形'},
    {'集計区分': 8, '集計区分名': '手直し'},
    {'集計区分': 9, '集計区分名': '技術不良'}
];
var seihin_group_master = [
    {'製品グループコード': '', '製品グループ': ''},
    {'製品グループコード': 'L', '製品グループ': 'L (ULR)'},
    {'製品グループコード': 'P', '製品グループ': 'P (UPM・UPT)'},
    {'製品グループコード': 'T', '製品グループ': 'T (特殊)'},
    {'製品グループコード': 'TJ', '製品グループ': 'TJ (モールド)'},
    {'製品グループコード': 'V', '製品グループ': 'V (OEM)'},
    {'製品グループコード': 'W', '製品グループ': 'W (DIP)'},
    {'製品グループコード': 'Y', '製品グループ': 'Y (RF(Y))'},
    {'製品グループコード': 'Z', '製品グループ': 'Z (DC-DC)'},
    {'製品グループコード': 'RF', '製品グループ': 'RF (RF(RF))'},
    {'製品グループコード': 'C', '製品グループ': 'C (東京測器)'},
    {'製品グループコード': 'S', '製品グループ': 'S (ピン・ソケット)'},
    {'製品グループコード': 'NA', '製品グループ': 'NA (NA)'},
    {'製品グループコード': 'NB', '製品グループ': 'NB (NB)'},
    {'製品グループコード': 'ND', '製品グループ': 'ND (ND)'},
    {'製品グループコード': 'NE', '製品グループ': 'NE (NE)'},
    {'製品グループコード': 'NF', '製品グループ': 'NF (NF)'},
    {'製品グループコード': 'NG', '製品グループ': 'NG (NG)'}
];

function setKakeritsuFileds(props) {
    props['技術売上金掛率'] = 1.000.toFixed(3);
    props['製造直単価'] = 0.00.toFixed(2);
    props['検査仕損金掛率'] = 0.900.toFixed(3);
    props['手直し単価'] = 0.00.toFixed(2);
    props['工程仕損金掛率'] = 0.625.toFixed(3);    
}

var 工程グループPanel = SimpleListPanel.extend({
    init: function (parent, $scope, $modal, $service, isAllSelected) {
        this._super(parent, '工程グループPanel', $scope, $modal, $service, 'SNY_KoteiDB', 'Ｋ＿工程設定マスタ', [
            {name: '工程グループ名', cellTemplate:''}            
//            ng-class="{'ui-grid-row-selected': row.isSelected}"
        ]);
        this.setData(kotei_group_master);
        this.gridOptions.multiSelect = true;
        //this.gridOptions.rowTemplate = "<div ng-class="{sny_grid_selected:row.isSelected}"></div>";
        if (isAllSelected){
            this.gridOptions.initSelectAllRows = true;
        }
    },
    selectKoteiGroupAll: function () {
        this.selectAllRows();
    },
    //@Overrides
    query: function() {}
});