var app = angular.module('MyAngularApp', ['ui.bootstrap']);

app.directive('svgItem', function () {

    return {
        restrict: 'AE',
        replace: 'true',
        template: '<g transform=translate({{obj.x}},{{obj.y}})> <rect width="10" height="10" x="0" y="0" fill="blue"></rect></g>'
        //template: '<p>{{obj.text}} {{obj.x}} {{obj.y}}</p>'
    }});

