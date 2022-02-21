const request = require("request")
const tough = require('tough-cookie')
var url = "https://auth.roblox.com/"
const cookie = process.env.cookie


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
  console.log(httpr.headers["x-csrf-token"])
  options2.headers["X-CSRF-TOKEN"] = httpr.headers["x-csrf-token"]
  request.post(options2, function(err2,res,b){
    console.log(b)
  })
})