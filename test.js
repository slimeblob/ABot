yvar utility = require("./utility.js")

utility.xcsrf(function(xtoken){
  utility.authpost(xtoken, "https://auth.roblox.com/", {}, function(err, out){
    if (err){return console.log("error")}

    console.log(out.text)
  })
})