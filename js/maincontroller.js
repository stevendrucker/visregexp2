app.controller("MainController", function ($scope) {
    $scope.nodeWidth = 200;
    $scope.nodeHeight = 100;
    globalScope = $scope;
    $scope.dragObjectIndex = 0;
    $scope.dataList = [
        {text:"This",stype:"smallgreen",x:210,y:330, connections:[0,1]}, 
        { text: "Is", stype: "largered", x: 150, y: 200, connections: [0,2] },
        { text: "A", stype: "smallgreen", x: 370, y: 150, connections: [1] },
        { text: "Test", stype: "smallgreen", x: 110, y: 190, connections: [2] }];

    $scope.connectionList = [
        { start: $scope.dataList[0], end: $scope.dataList[1] },
        { start: $scope.dataList[0], end: $scope.dataList[2] },
        { start: $scope.dataList[1], end: $scope.dataList[3] }
    ]

    $scope.dataList = [];
    $scope.connectionList = [];

    $scope.lineDraw = false;
    $scope.curPath = {x1:0,y1:0,x2:0,y2:0};
    $scope.update = function() {
 //       alert("in update");

        $scope.dataList[1] = { "text": "new", x: 200, y: 300 };
    }

    $scope.dblclick = function(evt) {
        newx = evt.pageX - evt.currentTarget.offsetLeft;
        newy = evt.pageY - evt.currentTarget.offsetTop;
        newnode = new VR_node("newnode","smallgreen",newx,newy,[]);
        $scope.dataList.push(newnode);
    }

    $scope.mouseDown = function (evt) {
        if ($scope.lineDraw == false) {
            $scope.dragging = true;
        }
    }

    $scope.mouseUp = function ($event) {
        $scope.dragging = false;
        if ($scope.lineDraw) {
            $scope.lineDraw = false;
            newx = $event.pageX - $event.currentTarget.offsetLeft;
            newy = $event.pageY - $event.currentTarget.offsetTop;
            aNode = $scope.findNode(newx,newy);
            if (aNode > -1) {
                console.log('Linking node', $scope.mouseDownObject, ' with ', aNode);
                aLink = new VR_connection($scope,$scope.mouseDownObject, aNode);
                alen = $scope.connectionList.length;
                $scope.connectionList.push(aLink);
                $scope.dataList[aNode].connections.push(alen);
                $scope.dataList[$scope.mouseDownObject].connections.push(alen);
            }
        }
    }

    $scope.findNode = function (x,y) {
        nodeWidth = $scope.nodeWidth;
        nodeHeight = $scope.nodeHeight;
        retval = -1;
        $scope.dataList.some (function (node, i ) {
            if (((node.x - nodeWidth/2) < x) && (x<(node.x + nodeWidth/2)) 
                && ((node.y - nodeHeight/2) < y) && (y <(node.y + nodeHeight/2))) {
                retval=i;
                return(true);
            }
            else return(false);  
        });

        return(retval);
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
            $scope.dataList[$scope.dragObjectIndex].x = newx;
            $scope.dataList[$scope.dragObjectIndex].y = newy;
    
            for (conn in $scope.dataList[$scope.dragObjectIndex].connections) {                
                which = $scope.dataList[$scope.dragObjectIndex].connections[conn];
                $scope.connectionList[which] = { start: $scope.connectionList[which].start, end: $scope.connectionList[which].end };
            }
            
            //$scope.connectionList[2]= {start: $scope.dataList[1], end: $scope.dataList[3] }
        }

        if ($scope.lineDraw) {
            newx = $event.pageX - $event.currentTarget.offsetLeft;
            newy = $event.pageY - $event.currentTarget.offsetTop;
            $scope.curPath.x2 = newx;
            $scope.curPath.y2 = newy;          
        }
    }

    $scope.objmousedown = function(theObjIndex)
    {
        $scope.dragObjectIndex = theObjIndex;
    }
});

VR_node = function(name, stype, x,y,conns)
{
    this.text = name;
    this.stype = stype;
    this.x = x;
    this.y=y;
    this.connections = conns;
}

VR_connection = function($scope,startIndex, endIndex)
{
    this.start = $scope.dataList[startIndex];
    this.end = $scope.dataList[endIndex];
}


