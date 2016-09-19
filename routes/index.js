var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var redis = require('redis');
var config = require('../config.js');
var client  = redis.createClient(config.redis.port, '127.0.0.1');
// client.auth(config.redis.pwd);

/* GET home page. */
router.get('/', function(req, res, next) {
  var isWechat = false;
  var agentID = req.headers['user-agent'].toLowerCase().search(/(micromessenger)/);
  if (agentID > 0) {
      isWechat = true;
  } else {
      isWechat = false;
  }
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  // console.log(thisUrl);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  superagent
    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
    .end(function(err2, res2) {
      if (res2 !== undefined && res2.ok) {
        res2.body.isWechat = isWechat;
        res2.body.browserUrl = global.browserURL;
        res2.body.title = '看乐可旅行直播，送旅行好礼';
        res.render('index', res2.body);
      } else {
        console.error('微信分享api错误。');
      }
    });
});

router.get('/index', function(req, res, next) {
  var isWechat = false;
  var agentID = req.headers['user-agent'].toLowerCase().search(/(micromessenger)/);
  if (agentID > 0) {
      isWechat = true;
  } else {
      isWechat = false;
  }
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  // console.log(thisUrl);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  superagent
    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
    .end(function(err2, res2) {
      if (res2 !== undefined && res2.ok) {
        res2.body.isWechat = isWechat;
        res2.body.browserUrl = global.browserURL;
        res2.body.title = '看乐可旅行直播，送旅行好礼';
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
        res2.body.title = '看乐可旅行直播，送旅行好礼';
        res.render('success', res2.body);
      } else {
        console.error('微信分享api错误。');
      }
    });
});

router.get('/share', function(req, res, next) {
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  // console.log(thisUrl);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  superagent
    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
    .end(function(err2, res2) {
      if (res2 !== undefined && res2.ok) {
        res2.body.browserUrl = global.browserURL;
        res2.body.title = '看乐可旅行直播，送旅行好礼';
        res.render('success', res2.body);
      } else {
        console.error('微信分享api错误。');
      }
    });
});

router.get('/show', function(req, res, next) {
  client.select(config.redis.db,function (error) {
    if(error){
      console.log(error);
    }else{
      client.smembers('num',function (err,num) {
        console.log(num);
        console.log(num.length);
        var data = [];
        for(var i =0;i<num.length;i++){
          data.push(client.get(num[i]));
        }
        res.render('show',{num:num,data:data});
      });
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
        client.sadd('num',num);
        client.set(num,data);
        var result = '成功插入数据';
        res.send({result: result});
      }
    });
})

module.exports = router;
