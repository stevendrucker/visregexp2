app.controller("MainController", function ($scope) {
    globalScope = $scope;

    $scope.dataList = [
        {text:"This",x:10,y:130}, 
        {text:"Is",x:30,y:110}, 
        {text:"A",x:70,y:150}, 
        { text: "Test", x: 10, y: 190 }];


    $scope.update = function() {
 //       alert("in update");

        $scope.dataList[1] = { "text": "new", x: 200, y: 300 };
    }

    $scope.mouseDown = function (evt) {
        $scope.dragging = true;
    }

    $scope.mouseUp = function (evt) {
        $scope.dragging = false;
 //       alert("up");
    }

    $scope.mouseMove = function (evt) {
        //        alert("mouseMove");
        if ($scope.dragging) {
            // offset relative to target
            newx = evt.x - evt.currentTarget.offsetLeft;
            newy = evt.y - evt.currentTarget.offsetTop;
            $scope.dataList[1] = { "text": "new", x: newx, y: newy};
        }
    }
});


