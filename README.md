AngularJs CRUD Backedn using asp.net API
============

It has been build by using AngularJs and working with asp.net API as backend.

This is what I follow with one video in youtube.com https://www.youtube.com/watch?v=Ja2xDrtylBw

It take me a while to figure out all of this,Don't know why there are dependents is missing in the video It works, so I put it here hope that could help other people.

There are some points I like to point out:

1)For the sort and query in this a sample I followed what the video did. But It is totally not necessary.Because angularjs could do the sort and query so don't need to retrieve all the info from service again. that will be save time for retrieve data.

2)In the Video, to remove return xml result is not necessary, because for what result will return it up to the http quest. if you quest Json result, api smart enought will return json result for you.And when you using angularjs to make request it indeed ask for json result.

3)In the video that didn't provide customize direction solution,but in my files I already included it.

4)The validation in the video that doesn't work. Check below code for form  validate solution

The imporve is here you could at the list.html change the ```html<th>```like below:
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
            IQueryable<Todo> items = db.Todoes.OrderBy(r=>r.Priority);
            //the skip must follew by OrderBy, otherwise will return 500 error
            if (offset > 0) items = items.Skip(offset);
            if (limit.HasValue) items = items.Take(limit.Value);
            return items;
        }

```

For validate the detail page, what the video tutorial doesn't work, here is the solution for form validation

change the detail.html like below

```html

<div class="row">
    <div class="col-lg-5 col-lg-offset-2">
        <h2>{{action}} Todo</h2>
        <form name="form" class="form-horizontal" ng-submit="submitForm(form.$valid)" novalidate><!-- novalidate prevents HTML5 validation since we will be validating ourselves -->
            <div class="form-group" ng-class="{ 'has-error' : form.Text.$invalid && !form.Text.$pristine }">
                <label>Todo</label>
                <input type="text" ng-model="item.Text" id="Text" name="Text" class="form-control" placeholder="" ng-minlength="3" ng-maxlength="200" required>
                <p ng-show="form.Text.$invalid && !form.Text.$pristine" class="help-block">Todo is required.</p>
                <p ng-show="form.Text.$error.minlength" class="help-block">Must great then list 3 characters.</p>
                <p ng-show="form.Text.$error.maxlength" class="help-block">Must less then 200 characters.</p>
            </div>

            <div class="form-group" >
                <label>Priority</label>
                <input type="number" ng-model="item.Priority" id="Priority" class="form-control" name="Priority" placeholder="">


            </div>


            <div class="form-group" ng-class="{ 'has-error' : form.DueDate.$invalid && !form.DueDate.$pristine }">
                <label>DueDate</label>
                <input type="text" ng-model="item.DueDate" id="DueDate" name="DueDate" class="form-control" placeholder="" required>
                <p ng-show="form.DueDate.$invalid && !form.DueDate.$pristine" class="help-block">DueDate is required.</p>
            </div>
            <div class="form-group">
                <!--<button ng-click="save()" class="btn btn-primary" ng-disabled="form.$invalid">
                    {{action}}
                </button>-->

                <button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">{{action}}</button>
                <a href="#/" class="btn">Cancel</a>
            </div>
        </form>
   </div>
   
</div>
```

change the CreateCtrl controller to this
```html

var CreateCtrl = function ($scope, $location, Todo) {
    $scope.action = "Add";       
    //function to submit the form after all validation has occurred            
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

```


  
  Have fun!

