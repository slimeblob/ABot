var word1 = "bites,highs,burns,ruins,humids,leans,quiets,traffics,homes,crashes,trumps,backs,salts,xboxs,closes,records,stops,sevens,pollutes,kills,rents,cleans,extras,boggles,Taylor's,snaps,questions,coffee's,clicks,pops,ticks,maintains,stars,ties,nys,bills,defends,opens,airs,Americans,steals,drinks,yous,businesses,teleys,invents,thanks,students,computers,frees,weathers,vends,severs,allergies,silences,fires,ambers,pushes,screws,smokes,mrs,reds,consumes,let's,classes,makes,draws,lights,butters,celebrates,drives,pulls,toxics,finds,waters,pets,lags,types,environments,grows,builds,moos,tunas,confuses,classifies,births,fails,breaks,emotionals,booms,calls,taxes,burgers,4s,gases,potatoes,pre owns,sends,mows,tickles,lefts,Saharas,nals,unites,camps,roses,shuts down,macs,apples,cheeses,turns,flexes,moves,trucks,necks,swallows,Harry's,flushes,pays,eyes,cities,increases,trains,cooks,i's,cringes,unders,folds,enters,speeds,roads,spends,tacos,pumps,hearts,Willows,reads,suhs,dogs,rocks,cookies,grinds"

var word2 = "bites,voices,rubber,jokes,weather,dabs,time,jams,depots,parties,country,Clinton,fires,grasses,one,door,videos,signs,elevens,air,mood,movie,rooms,roads,brain cells,points,mind,Swifts,chats,vibe,motives,mugs,pens,buttons,sanity,tocks,office,scouts,shoes,keys,nyes,freedom,will to live,force,flags,Gatorade,sprite,tubes,service,phones,wheel,yous,services,labs,tuition,ford,machines,warnings,alert,phone,extinguishers,dexterious,driver,detector,jos,cross,M&Ms,goes,days,pictures,poles,biscuit,75 years,cars,levers,waters,ways out,burgers,dogs,minecraft,emojis,sciences,trees,legos,buildings,cows,fish,conversation,animals,certificates,science classes,hearts,issues,roasted,horns,friends,kings,Gs,birthdays,stations,chips,vehicles,texts,lawns,pickles,lanes,deserts,genes,rocks,states,outs,coffee,reds,computers,books,watches,milk,steaks,teens,wheels,muscles,homes,stops,self,tattoos,food,Potters,toilets,brows,limits,toasts,towers,volume,tracks,wears,bones,oragamies,zones,kills,money,bells,ups,radios,ways,Donald's,springs,elections,walls,corn,dudes,filters,rolls,tongues,gears"

const reddb = require("../../db.js")
const axios = require("axios")
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  name: "verify",
  aliases: [],
  run: async(client, message, args) => {
    var s = false
    reddb.get(message.author.id, function(err,data){
      if (err){
        reddb.set(message.author.id, JSON.stringify({linked: false, banned: false}), function(){})
      } else {
        var o = JSON.parse(data)
        if (o.banned){
          s = true
          return message.channel.send("You are banned.")
        } else if (o.linked){
          s = true
          return message.channel.send("You are alr linked.")
        }
      }
    })
    setTimeout(function(){
      if (s){
        return
      }
    
      if (!args[0]){
        return message.channel.send("WRONG FORMAT!\nPlease do `;verify [Roblox User ID]`\n\nhere's a tutorial on how to get your roblox user id: <https://youtu.be/azanFiE7ZpE>")
      }
      
      if (isNaN(parseInt(args[0]))){
        return message.channel.send("The provided id is not a valid number")
      }
      
      var word1array = word1.split(",");

      var word2array = word2.split(",");

      var tstring = "That really " + word1array[getRandomNumber(0,142)] + " my " + word2array[getRandomNumber(0,154)]

      
      message.channel.send("Please update your about me to: '**" + tstring + "**'\n\nSay 'done' when you are done.\nSay 'cancel' if you wish to cancel. ")

      const filter = msg => msg.author.id == message.author.id;
          
      const collector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 })

      collector.on('collect', async (msg) => {
        
        if (msg.content.toLowerCase() == "done"){
          msg.reply("📡 Checking your account 📡")

          axios.get("https://users.roblox.com/v1/users/" + args[0]).then((out) => {
            if (out.data.errors){

          return msg.reply("Id doesnt exist or something went wrong.")
            }
            if (out.data.description == tstring){
              reddb.set(message.author.id, JSON.stringify({linked: true, banned: false, linkid: parseInt(args[0])}), function(){})
              return msg.reply("Successfully linked")
            } else {
              return msg.reply("The strings do not match: linking failed.")
            }
          })
        }
        if (msg.content.toLowerCase() == "cancel"){
          return msg.reply("Process canceled.")
        }
      });
    }, 500)
    
  }
}