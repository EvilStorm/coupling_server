var jwt = require('jsonwebtoken');
var response = require('./response_util');

var {ResponseCode } = require('../components/response_code_store');
var {ExceptionType, createException, convertException} = require('../components/exception_creator');
const { header } = require('express/lib/request');

auth = {}


auth.isSignIn = function(req, res, next) {

  var token = req.headers['identifyid'];
  var userId = req.headers['userid'];
  
  if (!token || !userId) {
    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));
  } else {
    req.decoded = {
      token: token,
      id: Number(userId),
    };
  
    console.log("req.decoded" )
    console.log(req.decoded )
    
    next();
  }
}

auth.isAdmin = function(req, res, next) {
  var token = req.headers['identifyId'];

  if(token != null && token == 'admin') {
    req.decoded = {
      token: req.headers['identifyId'],
      id: req.headers['userId'],
    };
    next();
  } else {
    var error = createException(ExceptionType.REQUIRED_JWT_TOKEN);
    res.json(response.fail(error, error.errmsg, error.code));

  }
}

module.exports = auth;
