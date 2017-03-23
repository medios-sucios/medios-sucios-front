"use strict";angular.module("mediosSuciosFrontApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial","restangular","ngMessages"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("https://medios-sucios-api.herokuapp.com/")}]),angular.module("mediosSuciosFrontApp").controller("MainCtrl",["msApiService","metadataService","$mdSidenav",function(a,b,c){function d(){return i.loadingReports=!0,a.getReports().then(i.setReports)}function e(){i.getReports(),i.motives=[{title:"Étnico"},{title:"Nacionalidad"},{title:"Clase"},{title:"Sexo"},{title:"Religión"},{title:"Orientación Sexual"},{title:"Discapacidad"}]}function f(a){return i.loadingReports=!1,i.reports=a.map(function(a){return console.log(a),a.info=b.getBasicInfo(a.metadata),a}),i.reports}function g(){i.reporting=!0,a.submitReport(i.report).then(function(a){i.reporting=!1,i.metadata=a,i.toggleSidenav(),i.getReports()})}function h(){c("left").toggle()}var i=this;i.loadingReports=!1,i.report={},i.reporting=!1,i.reports=[],i.getReports=d,i.init=e,i.setReports=f,i.submitReport=g,i.toggleSidenav=h,i.init()}]),angular.module("mediosSuciosFrontApp").service("msApiService",["Restangular",function(a){this.Report=a.all("report"),this.submitReport=function(a){return this.Report.post(a)},this.getReports=function(a){var b={sort:"createdAt DESC"};return angular.extend(b,a),this.Report.getList(b)}}]),angular.module("mediosSuciosFrontApp").service("metadataService",function(){this.getBasicInfo=function(a){var b={title:a.general.title,description:a.general.description};return a.openGraph&&(b.title=a.openGraph.title,b.description=a.openGraph.description,a.openGraph.image&&(b.image=a.openGraph.image.url)),b}}),angular.module("mediosSuciosFrontApp").run(["$templateCache",function(a){a.put("views/gridlist.html",'<md-grid-list md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="12" md-row-height-gt-md="1:1" md-row-height="4:3" md-gutter="8px" md-gutter-gt-sm="4px"> <md-grid-tile ng-repeat="report in vm.reports" md-rowspan="3" md-colspan="3" md-colspan-sm="1" md-colspan-xs="1" class="grid-tile"> <div class="md-padding"> <h3>{{report.motive}}</h3> <h4><a ng-href="{{report.link}}">{{ report.info.title }}</a></h4> <p> {{report.info.description}} </p> </div> <md-grid-tile-footer> {{report.source.domain}} </md-grid-tile-footer> </md-grid-tile> </md-grid-list>'),a.put("views/main.html",'<md-toolbar layout="row" class="md-toolbar-tools" md-scroll-shrink> <h1 flex>Medios Sucios</h1> <md-button class="md-secondary md-raised" ng-click="vm.toggleSidenav()" hide-gt-md>Reportar</md-button> </md-toolbar> <div flex layout="row" layout-fill> <ng-include src="&quot;views/sidenav.html&quot;" layout="row"></ng-include> <md-content flex class="md-padding" ng-include="&quot;views/simplelist.html&quot;"></md-content> </div>'),a.put("views/sidenav.html",'<md-sidenav md-component-id="left" class="md-sidenav-left md-padding" md-is-locked-open="$mdMedia(\'gt-md\')" flex> <form name="reportForm" layout="column" ng-submit="vm.submitReport()"> <h2>Ingresa tu Reporte</h2> <p>Nullam tempor ipsum in dolor dapibus laoree eu aliquam bibendum</p> <md-input-container flex> <label>URL de el Articulo</label> <input ng-model="vm.report.url" ng-disabled="vm.reporting" required type="url" name="reportUrl"> <div ng-messages="reportForm.reportUrl.$error" role="alert"> <div ng-message="url">Debe ser un URL valido.</div> <div ng-message="required">Este campo es obligatorio.</div> </div> </md-input-container> <md-input-container flex> <label>Tipo de discriminacion</label> <md-select aria-label="motivo" ng-model="vm.report.motive" ng-disabled="vm.reporting" name="reportMotive" required> <md-option ng-repeat="motive in vm.motives" value="{{motive.title}}"> {{motive.title}} </md-option> </md-select> <div ng-messages="reportForm.reportMotive.$error" role="alert"> <div ng-message="required">Este campo es obligatorio.</div> </div> </md-input-container> <md-input-container class="md-block"> <label>Comentario</label> <textarea maxlength="256" ng-model="vm.report.coment" ng-disabled="vm.reporting" md-maxlength="256" rows="4" md-select-on-focus name="reportComment"></textarea> <div ng-messages="reportForm.reportComment.$error" role="alert"> <div ng-message="md-maxlength">Máximo 256 caracteres</div> </div> </md-input-container> <md-button type="submit" class="md-primary md-raised" ng-if="!vm.reporting">Reportar</md-button> <md-progress-circular ng-if="vm.reporting" md-mode="indeterminate"></md-progress-circular> </form> </md-sidenav>'),a.put("views/simplelist.html",'<div layout-align="center center" layout="row" flex layout-fill ng-if="vm.loadingReports"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <md-list flex> <md-list-item class="md-3-line md-long-text report" ng-repeat="report in vm.reports" layout="row" layout-wrap> <div class="img-container" flex-gt-sm="20" flex-md="30" flex="100" style="background-image: url(\'{{report.info.image}}\')"> <div class="overlay"></div> <div class="md-padding" style="position:relative"> <h2>{{report.source.domain}}</h2> <h3>{{report.motive}}</h3> <h3 ng-bind="report.createdAt | date:\'dd-MM-yyyy\'"></h3> </div> </div> <div flex-gt-sm="80" flex-md="70" flex="100" class="md-list-item-text md-padding"> <h3><a ng-href="{{report.link}}">{{ report.info.title }}</a></h3> <h4>{{report.link}}</h4> <p> {{report.info.description}} </p> </div> </md-list-item> </md-list>')}]);