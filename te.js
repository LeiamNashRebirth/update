function leiamnash(){
 return{
  "name": "cosplay",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "cosplay": {
    "func": "cosplay",
    "cooldown": 0
   }
  }
 }
}

async function cosplay(event, api, leiam, log) {
try{
 
 } catch (err) { 
  log.err(err); 
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    cosplay,
    leiamnash
}
