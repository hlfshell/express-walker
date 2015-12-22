# Express Walker
This is a helper module to allow easily loading express routers for APIs. Routes are determined by the directory structure and filenames you use. Also, it allows the passing of parameters in any fashion you wish to each router as its loaded, allowing the easy passing of models and other variables throughout your project. 

## Installation
```sh
npm install express-walker
```

## Example

### Your index.js
```js
var app = require('express')();
var walker = new (require('express-walker'))(
    {
      directory: './api/v0.1/',
      app: app,
      root: '/api/'
    }
  )
  .pass(app, models, yetAnotherArgument)
  .load()
  .then(function(){
    //All routers have been loaded into the express app now.
    app.listen(3000);
  });
```

### Your directory structure:

```
|
|--api
|----v0.1
|------admin
|--------users.js
|--------sales.js
|------register.js
|------doStuff.js
```

### Your typical router
_doStuff.js_
```js
var express = require('express');

module.exports = function(app, models, yetAnotherArgument){

  var doStuffRouter = express.Router();
  
  doStuffRouter.route('/')
    .get(function(req, res){
      console.log("Hello World!");
    });

  return doStuffRouter
};
```
_Note the return_

### And, finally, your resulting API paths:

```no-highlight
  /api/admin/users
  /api/admin/sales
  /api/register/
  /api/doStuff/
```

## Documentation

### Setup

```js
var walker = new (require('express-walker'))();
walker
  .directory('./targetDir')
  .root('targetAPIRoot')
  .app(app)
  .pass(list, of, arguments, to, pass)
  .load()
  .then(function(){
    app.listen(3000);
  });
  
//OR

var walker = new (require('express-walker'))(
    {
      app: app,
      directory: './targetDir',
      root: 'targetAPIRoot',
      args: [list, of, arguments, to, pass] 
    }
  )
  .load(function(){
    app.listen(3000);
  });
```

### Parameters

#### Directory
The directory you wish to walk through. All sub-directories are also traversed.

#### Root
The root of the API to be added as ap refix to each router when its added. If a router had an endpoint of '/test/something' A root of '/' would not add anything as a prefix - the resulting route would be '/test/something'. A root of '/api/' would result in an endpoint of '/api/test/something'.

#### app
The express app you've created - it's used to add each router to the app.

#### args
Optional. When added in the constructor, it's an array of values or variables. when using the .pass() method, it's called with as many arguments as you wish (without the array). You can have as many or as little as you wish.

These arguments are passed, in the same order, to each router on require-time.
