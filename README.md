# Express Walker
This is a helper module to allow easily loading express routers for APIs. Routes are determined by the directory structure and filenames you use. Also, it allows the passing of parameters in any fashion you wish to each router as its loaded, allowing the easy passing of models and other variables throughout your project. 

##Example

### Your index.js
```
var app = require('express')();
var walker = new require('express-walker')(
    {
      directory: './api',
      app: app,
      root: '/api/v0.1/'
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
...doStuff.js
```
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

```
  /api/admin/users
  /api/admin/sales
  /register/
  /doStuff/
```

## Documentation

### Setup

```
var walker = new require('express-walker')();
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

var walker = new require('express-walker')(
    {
      app: app,
      directory: './targetDir',
      root: 'targetAPIRoot'
    }
  )
  .pass(list, of, arguments, to, pass)
  .load(function(){
    app.listen(3000);
  });

```
