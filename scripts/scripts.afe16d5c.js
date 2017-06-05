"use strict";angular.module("mediosSuciosFrontApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial","restangular","ngMessages","chart.js"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"}),moment.locale("es")}]).config(["RestangularProvider",function(a){a.setBaseUrl("https://medios-sucios-api.herokuapp.com/")}]).config(["$mdThemingProvider",function(a){var b=a.extendPalette("indigo",{500:"#2D303A"});a.definePalette("pinkMS",b),a.theme("default").primaryPalette("pinkMS")}]).config(["ChartJsProvider",function(a){a.setOptions({colors:["#f0b4bd","#fff","#DCDCDC","#46BFBD","#FDB45C","#949FB1","#4D5360"]})}]),angular.module("mediosSuciosFrontApp").controller("MainCtrl",["msApiService","metadataService","$mdSidenav","$filter",function(a,b,c,d){function e(){return k.loadingReports=!0,a.getReports().then(k.setReports)}function f(){k.getReports(),k.setupCharts(),k.motives=[{title:"Étnia"},{title:"Nacionalidad"},{title:"Clase"},{title:"Género"},{title:"Religión"},{title:"Orientación Sexual"},{title:"Discapacidad"}]}function g(a){return k.loadingReports=!1,k.reports=a.map(function(a){return console.log(a),a.info=b.getBasicInfo(a.metadata),a}),k.reports}function h(){k.reporting=!0,a.submitReport(k.report).then(function(a){k.reporting=!1,k.metadata=a,k.toggleSidenav(),k.getReports()})}function i(){c("left").toggle()}function j(){a.getSourceCount().then(function(a){console.log(a);var b=a.data;k.sourceData=b.reduce(function(a,b){return{labels:a.labels?a.labels.concat(b._id):[b._id],data:a.data?a.data.concat(b.total):[b.total]}},{}),k.sourceData.options={scales:{yAxes:[{ticks:{beginAtZero:!0}}]}},console.log("vm.mediaData",k.mediaData)}).catch(function(a){console.log(a)}),a.getMotiveCount().then(function(a){console.log(a);var b=a.data;k.motiveData=b.reduce(function(a,b){return{labels:a.labels?a.labels.concat(b._id):[b._id],data:a.data?a.data.concat(b.total):[b.total]}},{}),k.motiveData.options={scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}}).catch(function(a){console.log(a)}),a.getDateReportCount().then(function(a){console.log(a);var b=a.data;k.dateData=b.reduce(function(a,b){var c=moment(b._id,"MM").toDate(),e=d("date")(c,"MMMM");return{labels:a.labels?a.labels.concat(e):[e],data:a.data?a.data.concat(b.total):[b.total]}},{})}).catch(function(a){console.log(a)}),k.datesData.labels=["January","February","March","April","May","June","July"],k.datesData.series=["Series A"],k.datesData.data=[[65,59,80,81,56,55,40]],k.datesData.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"}]}},k.reasonsData.labels=["Sexismo","Racismo","Religioso","Homofobia"],k.reasonsData.series=["Series A"],k.reasonsData.data=[[65,59,80,81,56,55,40]]}var k=this;k.loadingReports=!1,k.report={},k.reporting=!1,k.reports=[],k.getReports=e,k.init=f,k.setReports=g,k.submitReport=h,k.toggleSidenav=i,k.setupCharts=j,k.mediaData={},k.datesData={},k.reasonsData={},k.init()}]),angular.module("mediosSuciosFrontApp").service("msApiService",["$http","Restangular",function(a,b){this.Report=b.all("report"),this.submitReport=function(a){return this.Report.post(a)},this.getReports=function(a){var b={sort:"createdAt DESC"};return angular.extend(b,a),this.Report.getList(b)},this.getSourceCount=function(){var c=b.configuration.baseUrl;return a.get(c+"/sourcecount")},this.getMotiveCount=function(){var c=b.configuration.baseUrl;return a.get(c+"/motivecount")},this.getDateReportCount=function(){var c=b.configuration.baseUrl;return a.get(c+"/datecount")}}]),angular.module("mediosSuciosFrontApp").service("metadataService",function(){this.getBasicInfo=function(a){var b={title:a.general.title,description:a.general.description};return a.openGraph&&(b.title=a.openGraph.title,b.description=a.openGraph.description,a.openGraph.image&&(b.image=a.openGraph.image.url)),b}}),angular.module("mediosSuciosFrontApp").run(["$templateCache",function(a){a.put("views/footer.html",'<div id="footer"> <div class="footer-inner"> <div layout="row"> <div flex="50"> <p><a href="/"><img class="logo-footer" src="images/Logo-Medios-Sucios2.7459ffec.png" alt="medios sucios"></a></p> <ul class="sitemap"> <li><a href>¿Por qué Reportar?</a></li> <li><a href>¿Cómo Funciona?</a></li> <li><a href>¿Reportes?</a></li> <li><a href>¿Qué es discurso de odio?</a></li> <li><a href>¿Quiénes sómos?</a></li> </ul> </div> </div> <div layout="row" layout-align="space-between start" layout-wrap> <div flex="50" flex-sm="100" flex-xs="100"> <p> <span class="icon icon-instagram"></span> <span class="icon icon-facebook"></span> <span class="icon icon-twitter"></span> </p> </div> <div flex-sm="100" flex-xs="100"> <p class="final-links"> <a href="">Legales</a> <a href="">Aviso de privacidad</a> <a href="">Contacto</a> </p> <p class="copyright"> <span>&copy; 2017 medios sucios</span> | Todos los derechos reservados </p> </div> </div> </div> </div>'),a.put("views/gridlist.html",'<md-grid-list md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="12" md-row-height-gt-md="1:1" md-row-height="4:3" md-gutter="8px" md-gutter-gt-sm="4px"> <md-grid-tile ng-repeat="report in vm.reports" md-rowspan="3" md-colspan="3" md-colspan-sm="1" md-colspan-xs="1" class="grid-tile"> <div class="md-padding"> <h3>{{report.motive}}</h3> <h4><a ng-href="{{report.link}}">{{ report.info.title }}</a></h4> <p> {{report.info.description}} </p> </div> <md-grid-tile-footer> {{report.source.domain}} </md-grid-tile-footer> </md-grid-tile> </md-grid-list>'),a.put("views/main.html",'<div flex layout="row" layout-wrap layout-fill> <div class="main-box" flex flex-xs="100" flex-sm="100"> <md-toolbar layout="row" class="md-toolbar-tools main-toolbar"> <h1 flex>Contacto: + 52 <span>(555) 555-5555</span></h1> <span class="icon icon-instagram"></span> <span class="icon icon-facebook"></span> <span class="icon icon-twitter"></span> <!--<md-button class=\'md-secondary md-raised\' ng-click=\'vm.toggleSidenav()\' >Reportar</md-button> --> </md-toolbar> <md-content layout="row" layout-wrap class="marquee" layout-fill> <div class="marquee-inner"> <div layout-align="space-between start" layout="row" class="menu-container"> <a href>¿Por qué reportar?</a> <a href>¿Cómo Funciona?</a> <a href>¿Reportes?</a> <a href>¿Qué es discurso de odio?</a> <a href>¿Quiénes Sómos?</a> <a href>Contacto</a> </div> <div class="intro-content"> <h1><strong>Medios sucios</strong> es un sitio que recopila el discurso de odio en medios de latinoamérica</h1> <h2>Haz un reporte</h2> <p> <button class="action-btn"> Conoce más </button> </p> </div> </div> </md-content> </div> <ng-include src="&quot;views/sidenav.html&quot;" layout="row" class="sidenav-container"></ng-include> </div> <div class="charts-section"> <h1>Reportes</h1> <div layout="row" layout-wrap layout-align="space-between center" class="charts-section-inner"> <div flex="33" flex-xs="100" class="chart-item"> <canvas id="bar" class="chart chart-bar" chart-data="vm.sourceData.data" chart-options="vm.sourceData.options" chart-labels="vm.sourceData.labels"> </canvas> <h2>Medios</h2> </div> <div flex="33" flex-xs="100" class="chart-item"> <canvas id="line" class="chart chart-line" chart-data="vm.dateData.data" chart-labels="vm.dateData.labels"> </canvas> <h2>Fecha</h2> </div> <div flex="33" flex-xs="100" class="chart-item"> <canvas id="bar" class="chart chart-bar" chart-data="vm.motiveData.data" chart-labels="vm.motiveData.labels" chart-series="vm.motiveData.series"> </canvas> <h2>Motivo</h2> </div> </div> </div> <div class="title-banner"> <h2>Los marranitos...</h2> </div> <div flex layout="row" layout-fill> <md-content flex class="md-padding" ng-include="&quot;views/simplelist.html&quot;"></md-content> </div> <ng-include src="&quot;views/footer.html&quot;"></ng-include>'),a.put("views/sidenav.html",'<md-sidenav md-component-id="left" class="md-sidenav-left" md-is-locked-open="$mdMedia(\'gt-md\')" flex layout-fill> <div class="head"> <a href="/"><img src="images/logo1.5eae2d9f.png" alt="medios sucios"></a> </div> <form name="reportForm" ng-submit="vm.submitReport()" class="report-form"> <div class="md-padding"> <h1>¿Cómo participar?</h1> <h2>Simplemente llena el formulario</h2> <div> <md-input-container> <label>URL de el Artículo</label> <input ng-model="vm.report.url" ng-disabled="vm.reporting" required type="url" name="reportUrl"> <div ng-messages="reportForm.reportUrl.$error" role="alert"> <div ng-message="url">Debe ser un URL valido.</div> <div ng-message="required">Este campo es obligatorio.</div> </div> </md-input-container> </div> <div> <md-input-container> <label>Tipo de discriminación</label> <md-select aria-label="motivo" ng-model="vm.report.motive" ng-disabled="vm.reporting" name="reportMotive" class="select-type" required> <md-option ng-repeat="motive in vm.motives" value="{{motive.title}}"> {{motive.title}} </md-option> </md-select> <div ng-messages="reportForm.reportMotive.$error" role="alert"> <div ng-message="required">Este campo es obligatorio.</div> </div> </md-input-container> </div> <md-input-container class="md-block"> <label>Comentario</label> <textarea maxlength="256" ng-model="vm.report.coment" ng-disabled="vm.reporting" md-maxlength="256" rows="4" md-select-on-focus name="reportComment"></textarea> <div ng-messages="reportForm.reportComment.$error" role="alert"> <div ng-message="md-maxlength">Máximo 256 caracteres</div> </div> </md-input-container> </div> <md-button type="submit" class="reportbtn" ng-if="!vm.reporting" layout="row" layout-align="center center"> <span>Reportar</span> <span class="btn-icon"></span> <!--<span class="btn-icon"></span>--> </md-button> <md-progress-circular ng-if="vm.reporting" md-mode="indeterminate"></md-progress-circular> </form> </md-sidenav>'),a.put("views/simplelist.html",'<div layout-align="center center" layout="row" flex layout-fill ng-if="vm.loadingReports"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <md-list flex class="reports-list"> <md-list-item class="md-3-line md-long-text report" ng-repeat="report in vm.reports" layout="row" layout-wrap> <div class="img-container" flex-gt-sm="20" flex-md="30" flex="100" style="background-image: url(\'{{report.info.image}}\')"> <div class="overlay"></div> <div class="md-padding" style="position:relative"> <h2>{{report.source.domain}}</h2> <h3>{{report.motive}}</h3> <h3 ng-bind="report.createdAt | date:\'dd-MM-yyyy\'"></h3> </div> </div> <div flex-gt-sm="80" flex-md="70" flex="100" class="md-list-item-text md-padding"> <h3><a ng-href="{{report.link}}">{{ report.info.title }}</a></h3> <h4><a ng-href="{{report.link}}" target="_blank">{{report.link}}</a></h4> <p> {{report.info.description}} </p> </div> </md-list-item> <div> <button class="action-btn action-btn-block action-btn-inverted"> Cargar más </button> </div> </md-list>')}]);