app.controller("MainController", function ($scope) {
    globalScope = $scope;

    $scope.dataList = [
        {text:"This","stype":"smallgreen",x:10,y:130}, 
        {text:"Is","stype":"largered",x:80,y:200}, 
        {text:"A","stype":"smallgreen",x:70,y:150}, 
        { text: "Test", "stype":"smallgreen",x: 10, y: 190 }];

    $scope.lineDraw = false;
    $scope.curPath = {x1:0,y1:0,x2:0,y2:0};
    $scope.update = function() {
 //       alert("in update");

        $scope.dataList[1] = { "text": "new", x: 200, y: 300 };
    }

    $scope.mouseDown = function (evt) {
        if ($scope.lineDraw == false) {
            $scope.dragging = true;
        }
    }

    $scope.mouseUp = function (evt) {
        $scope.dragging = false;
        $scope.lineDraw = false;
    }

    $scope.mouseMove = function ($event) {
        //        alert("mouseMove");
        var a=0;
        if ($scope.dragging) {
            // offset relative to target
            //newx = $event.x - $event.currentTarget.offsetLeft;
            //newy = $event.y - $event.currentTarget.offsetTop;
            newx = $event.pageX - $event.currentTarget.offsetLeft;
            newy = $event.pageY - $event.currentTarget.offsetTop;
//            $scope.dataList[1] = { "text": "new","stype":"largered", x: newx, y: newy};
            $scope.dataList[1].x = newx;
            $scope.dataList[1].y = newy;
        }

        if ($scope.lineDraw) {
            newx = $event.pageX - $event.currentTarget.offsetLeft;
            newy = $event.pageY - $event.currentTarget.offsetTop;
            $scope.curPath.x2 = newx;
            $scope.curPath.y2 = newy;          
        }
    }
});


