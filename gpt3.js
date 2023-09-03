 const fs = require("fs");
 const axios = require("axios");

function leiamnash(){
 return{
  "name": "gpt3",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "gpt3": {
    "func": "gpt3",
    "cooldown": 20
   }
  }
 }
}

async function gpt3(event, api, leiam, log, alice) {
try{
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
const leiamChat = leiam.join(" ");
  if (!leiamChat) {
  await alice(event.senderID);
    api.chat({body: `please ask me to do anything\n\nhow to use?\n${global.alice.prefix}gpt3 ⟨ question ⟩\n\nexample:\n${global.alice.prefix}gpt3 please make a conclusion about anime`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`please ask me to do anything\n\nhow to use?\n${global.alice.prefix}gpt3 ⟨ question ⟩\n\nexample:\n${global.alice.prefix}gpt3 please make a conclusion about anime`, event.threadID, event.messageID);
    }, event.messageID);
         return;
}
api.setMessageReaction("✅", event.messageID, (err) => {}, true);
  const leiamRes = (await axios.get(`${global.alice.api}/gpt3?ask=${leiamChat}`)).data.answer;
  api.chat(leiamRes, event.threadID, event.messageID);
 } catch (err) { 
  log.err(err);
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    gpt3,
    leiamnash
}
