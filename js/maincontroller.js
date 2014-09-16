app.controller("MainController", function ($scope) {
    globalScope = $scope;

    $scope.dataList = [
        {text:"This","stype":"smallgreen",x:10,y:130}, 
        {text:"Is","stype":"largered",x:80,y:200}, 
        {text:"A","stype":"smallgreen",x:70,y:150}, 
        { text: "Test", "stype":"smallgreen",x: 10, y: 190 }];


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

    $scope.mouseMove = function ($event) {
        //        alert("mouseMove");
        var a=0;
        if ($scope.dragging) {
            // offset relative to target
            newx = $event.x - $event.currentTarget.offsetLeft;
            newy = $event.y - $event.currentTarget.offsetTop;
            $scope.dataList[1] = { "text": "new","stype":"largered", x: newx, y: newy};
        }
    }
});


