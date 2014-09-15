var app = angular.module('MyAngularApp', ['ui.bootstrap']);

app.directive('svgItem', function ($timeout) {

    return {
        restrict: 'AEC',
        link: function(scope, lElement, lAttr) {
	      var path = makeNode('rect', lElement, lAttr);
	      var newGuy = path.cloneNode(true);
	      $timeout(function() {
	        lElement.replaceWith(newGuy);
	      })
	      console.log('Replacing ', lElement, ' with ', newGuy);
	    } 
	}} ) ;



/* Create a shape node with the given settings. */
function makeNode(name, element, settings) {
  var ns = 'http://www.w3.org/2000/svg';
  var node = document.createElementNS(ns, name);
  for (var attribute in settings) {
    var value = settings[attribute];
    if (value !== null && value !== null && !attribute.match(/\$/) &&
      (typeof value !== 'string' || value !== '')) {
      node.setAttribute(attribute, value);
    }
  }
  return node;
}