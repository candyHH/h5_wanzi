var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var redis = require('redis');
var config = require('../config.js');
var client  = redis.createClient(config.redis.port,config.redis.ip);
client.auth(config.redis.pwd);

/* GET home page. */
router.get('/', function(req, res, next) {
  // var isApp = 0;
  // var agentID = req.headers['user-agent'].toLowerCase().search(/(micromessenger)/);
  // if (agentID > 0) {
  //     isApp = 1;
  // } else {
  //     isApp = 0;
  // }
  var isApp = req.query.isApp;
  if(isApp !=null && isApp!=''){
    isApp = 1;
  }else{
    isApp = 0;
  }
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  // console.log(thisUrl);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  superagent
    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
    .end(function(err2, res2) {
      if (res2 !== undefined && res2.ok) {
        res2.body.isApp = isApp;
        res2.body.browserUrl = global.browserURL;
        res.render('index', res2.body);
      } else {
        console.error('微信分享api错误。');
      }
    });
});

router.get('/index', function(req, res, next) {
  var isApp = req.query.isApp;
  if(isApp !=null && isApp!=''){
    isApp = 1;
  }else{
    isApp = 0;
  }
  console.log(isApp);
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  // console.log(thisUrl);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  superagent
    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
    .end(function(err2, res2) {
      if (res2 !== undefined && res2.ok) {
        res2.body.isApp = isApp;
        res2.body.browserUrl = global.browserURL;
        res.render('index', res2.body);
      } else {
        console.error('微信分享api错误。');
      }
    });
});

router.get('/success', function(req, res, next) {
  var isWechat = req.query.flag;
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  // console.log(thisUrl);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  superagent
    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
    .end(function(err2, res2) {
      if (res2 !== undefined && res2.ok) {
        res2.body.flag = isWechat;
        res2.body.browserUrl = global.browserURL;
        res.render('success',res2.body);
      } else {
        console.error('微信分享api错误。');
      }
    });
});

router.get('/show', function(req, res, next) {
  var number = [];
  var date = [];
  client.select(config.redis.db,function (error) {
    if(error){
      console.log(error);
    }else{
      client.hgetall('user',function (err,user) {
        // console.log(user);
        for(var key in user){
          number.push(key);
          console.log(user[key]);
          date.push(user[key]);
        }
        res.render('show',{num:number,data:date});
      })
    }
  });
});

router.post('/pass',function (req,res,next) {
  console.log('记录时间');
  var num = req.body.num;
  var data = req.body.data;
  client.select(config.redis.db,function (error) {
      if(error){
        console.log(error);
      }else{
        client.hset('user',num,data);
        // client.set(num,data);
        var result = '成功插入数据';
        res.send({result: result});
      }
    });
})

module.exports = router;
