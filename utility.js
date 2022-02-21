const request = require("request")
const cookie = process.env.cookie

exports.xcsrf = async function(cb){
  var cookiejar = request.jar()
  cookiejar.setCookie(".ROBLOSECURITY=" + cookie,"https://auth.roblox.com/")



  var options = {
    "url":"https://auth.roblox.com/",
    "jar": cookiejar
  }

  var options2 = {
    "url":"https://auth.roblox.com/",
    "jar": cookiejar,
    "headers":{
      "X-CSRF-TOKEN": undefined
    }
  }

  request.post(options, function(err, httpr, bodyr){
    //console.log(httpr.headers["x-csrf-token"])
    options2.headers["X-CSRF-TOKEN"] = httpr.headers["x-csrf-token"]
    request.post(options2, function(err2,res,b){
      if (err2){
        console.log("err : " + __dirname)
        return
      }
      console.log("--Auth success-- " + __filename + "/utility.js")
      cb(httpr.headers["x-csrf-token"])
    })
  })
}


exports.authpost = function(xcsrf, url, options, cb){
  var cookiejar = request.jar()
  cookiejar.setCookie(".ROBLOSECURITY=" + cookie, url)

  options.url = url
  options.jar = cookiejar
  if (options.headers == undefined){
    options.headers = {}
    options.headers["X-CSRF-TOKEN"] = xcsrf
  } else {
    options.headers["X-CSRF-TOKEN"] = xcsrf
  }

  request.post(options, function(err,res,text){
    if (err){
      cb(err, {res, text})
      return
    }
    cb(undefined, {res, text})
  })

}

exports.authget = function(xcsrf, options, url, cb){
  var cookiejar = request.jar()
  cookiejar.setCookie(".ROBLOSECURITY=" + cookie, url)

  options.url = url
  options.jar = cookiejar
  if (options.headers == undefined){
    options.headers = {}
    options.headers["X-CSRF-TOKEN"] = xcsrf
  } else {
    options.headers["X-CSRF-TOKEN"] = xcsrf
  }

  request.get(options, function(err,res,text){
    if (err){
      cb(err, {res, text})
      return
    }
    cb(undefined, {res, text})
  })

}