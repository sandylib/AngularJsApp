var TodoApp = angular.module("TodoApp", ["ngRoute", "ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'detail.html' }).
             when('/edit/:editId', { controller: EditCtrl, templateUrl: 'detail.html' }).
            otherwise({ redirectTo: '/' });
    });

//Direction
TodoApp.directive('sorted', [function () {
    return {
        scope: true,
        restrict: 'A',
        transclude: true,
        template: '<a class="btn btn-link" ng-click="do_sort()" ng-transclude></a>' +
            	  '<span ng-show="do_show(true)">' +
                  '<i class="glyphicon glyphicon-arrow-down"></i>' +
          		  '</span>' +
         		  '<span ng-show="do_show(false)">' +
                  '<i class="glyphicon glyphicon-arrow-up"></i>' +
                  '</span> ',
        controller: function ($scope, $element, $attrs) {
            $scope.sort_by = $attrs.sorted;

            $scope.do_sort = function() {
                $scope.sort($scope.sort_by);
            };

            $scope.do_show = function(is_desc) {
                return (is_desc != $scope.is_desc && $scope.sort_order == $scope.sort_by)
            }
        }
    };
}])




TodoApp.factory('Todo', function ($resource) {
    return $resource('/api/todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var ListCtrl = function ($scope, $location, Todo) {
    $scope.search = function () {
        Todo.query({
            q:$scope.query,
            sort: $scope.sort_order,
            desc: $scope.is_desc,
            offset: $scope.offset,
            limit: $scope.limit
           },
            function (data) {
                $scope.more = data.length === 20;
                $scope.items = $scope.items.concat(data);
        });
    };

    $scope.sort = function (col) {
        if ($scope.sort_order == col)
        {
            $scope.is_desc = !$scope.is_desc;
        }
        else
        {
            $scope.sort_order = col;
            $scope.is_desc = false;

        }
       
        $scope.reset();
    }

    $scope.show_more = function () {
        $scope.offset += $scope.limit;
        $scope.search();
    };

    $scope.has_more = function () {
        return $scope.more;
    };

    $scope.reset = function () {
        $scope.limit = 20;
        $scope.offset = 0;
        $scope.items = [];
        $scope.more = true;
        $scope.search();

    };

    $scope.delete = function () {
        var id = this.item.Id;
        Todo.delete({ id: id }, function () {
            $('#todo_'+id).fadeOut();
        });
    };

    $scope.sort_order = "Priority";
    $scope.is_desc = false;
    
    $scope.reset();
};


var CreateCtrl = function ($scope, $location, Todo) {
    $scope.action = "Add";
     $scope.submitForm = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            //then could create a new Todo             
            //alert('our form is amazing');
            Todo.save($scope.item, function () {
                $location.path('/');
            });
        }
    };

};

var EditCtrl = function ($scope, $location,$routeParams, Todo) {
    $scope.action = "Update";
    var id = $routeParams.editId;
    $scope.item = Todo.get({ id: id });

    $scope.submitForm = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            //then could create a new Todo         
           
            Todo.update({id:id},$scope.item, function () {
                $location.path('/');
            });
        }
    };
};






