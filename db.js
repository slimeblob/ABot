const queue = []
const fs = require("fs")
const slicer = "Ꝟ"
const filelocation = "./dbfile.txt"

function edit(key,infodata,callback){
  fs.readFile(filelocation, function(err, data){
    if (err) {
      return callback(err)
    }
    const lines = data.toString().split("\n")
    var out = ""
    var found = false

    for (var i = 0; i < lines.length; i++){
      if (i == lines.length -1){
        //console.log("End Reached.")
        if (lines[i].startsWith(key + slicer)){
          out = out + key + slicer + infodata
          found = true
        } else {
          out = out + lines[i]
        }
      } else {
        //console.log("Other")
        if (lines[i].startsWith(key + slicer)){
          out = out + key + slicer  + infodata + "\n"
          found = true
        } else {
          out = out + lines[i] + "\n"
        }
      }
    }

    if (found){
      fs.writeFile(filelocation, out, function(err){
        if (err){
          callback(err)
          queue.shift()
          return 
        }
        callback(undefined, true)
        queue.shift()
        return 
      })
    } else {

      out = out + "\n" + key + slicer + infodata

      fs.writeFile(filelocation, out, function(err){
        if (err){
          callback(err)
          queue.shift()
          return 
        }
        callback(undefined, true)
        queue.shift()
        return 
      })
    }
  })
}


exports.set = function(key, data, callback){
  queue.push({type: "write", key: key, data: data, callback: callback})
}
exports.get = function(key, callback){
  //console.log(" obj : ")
  //console.log(callback)
  queue.push({type: "read", key: key, "callback": callback})
}


setInterval(function(){
  if (queue.length > 0){
    const selected = queue[0]
   // console.log(selected)


    if (selected.type == "write"){
      //console.log("Edit activated")
      edit(selected.key, selected.data, selected.callback)
    } else {
      fs.readFile(filelocation, function(err,data){
        var lines = data.toString().split("\n")
        for (var i = 0; i< lines.length; i++){
          if (lines[i].startsWith(selected.key + slicer)){

            selected.callback(undefined, lines[i].split(slicer)[1])
            queue.shift()
            return 
            
            
          }
        }
        
        selected.callback("not_found", false)//dont rename or comment this line (its essential and will break on rename)
        queue.shift()
        return 
      })
    }

  }
},10)

// RedDB V2
//   © Itsredstonepro#0979 and Kian with love<3 2021