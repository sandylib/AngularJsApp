AngularJs CRUD Backedn using asp.net API
============

It has been build by using AngularJs and working with asp.net mvc as backend.

This is what I follow with one video in youtube.com https://www.youtube.com/watch?v=Ja2xDrtylBw

It take me a while to figure out all of this. It works, so I put it here hope that could help other people.

For the sort and query in this a sample I followed what the video did. But It is totally not necesely.

Because angularjs could do the sort and query so don't need to retrieve all the info from service. that will be save time.

Here you could at the list.html change the ```html<th>```like below:
```html
 <thead>
    <th>
      <a ng-click="sortField='Text'; reverse=!reverse">Todo</a> 
        <span ng-show="reverse==true && sortField=='Text'" ><i class="glyphicon glyphicon-arrow-down"></i></span>
        <span ng-show="reverse==false && sortField=='Text'" ><i class="glyphicon glyphicon-arrow-up"></i></span>       
    </th>
    <th>
        <a ng-click="sortField='Priority'; reverse=!reverse">Priority</a>     
        <span ng-show="reverse==true && sortField=='Priority'" ><i class="glyphicon glyphicon-arrow-down"></i></span>
        <span ng-show="reverse==false && sortField=='Priority'"><i class="glyphicon glyphicon-arrow-up"></i></span>       
    </th>
    <th>
        <a ng-click="sortField='DueDate'; reverse=!reverse">DueDate</a>   
        <span ng-show="reverse==true && sortField=='DueDate'" ><i class ="glyphicon glyphicon-arrow-down"></i></span>
        <span ng-show="reverse==false && sortField=='DueDate'" ><i class="glyphicon glyphicon-arrow-up"></i></span>       
    </th>
  
    </thead>
```
    
for the query just add this to the ```html<tr>```
```html
<tr ng-repeat="todo in items | filter:query | orderBy:sortField:reverse">
```
Then you could simpfy the listController like below
```html
$scope.search = function () {
        Todo.query({ limit: $scope.limit, offset: $scope.offset },
            function (items) {
                var cnt = items.length;
                $scope.no_more = cnt < 20;
                $scope.items = $scope.items.concat(items);
            }
        );
    };
```  

The backend method also could simpify like this, I mean the Todocontroller in your API
```html

 public IQueryable<Todo> GetTodoes(int? limit = null, int offset = 0)
        {
            IQueryable<Todo> items = db.Todoes;

            if (offset > 0) items = items.Skip(offset);
            if (limit.HasValue) items = items.Take(limit.Value);
            return items;
        }

```


  if I got time, I will update a new impoved version to it.
  
  Have fun!

