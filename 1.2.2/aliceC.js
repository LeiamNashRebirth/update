 const fs = require("fs");
 const axios = require("axios");

function leiamnash(){
 return{
  "name": "webcord",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "webcord": {
    "func": "webcord",
    "cooldown": 20
   }
  }
 }
}

async function webcord(event, api, leiam, log, alice) {
try{
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
const leiamFile = __dirname + "/cache/webcord_" + event.senderID + ".mp4";
const leiamChat = leiam.join(" ");
  if (!leiamChat) {
  await alice(event.senderID);
    api.chat({body: `please add url that you want to take a screenrecord\n\nhow to use?\n${global.alice.prefix}webcord ⟨ url ⟩\n\nexample:\n${global.alice.prefix}webcord https://facebook.com`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`please add url that you want to take a screenrecord\n\nhow to use?\n${global.alice.prefix}webcord ⟨ url ⟩\n\nexample:\n${global.alice.prefix}webcord https://facebook.com`, event.threadID, event.messageID);
    }, event.messageID);
} else if (leiamChat.startsWith("https://")) {
   api.setMessageReaction("✅", event.messageID, (err) => {}, true);
const leiamGet = (await axios.get(`${global.alice.api}/webcord?url=${leiamChat}`, { responseType: 'arraybuffer'})).data;
fs.writeFileSync(leiamFile, Buffer.from(leiamGet, 'utf-8'));
    api.chat({body: ``, attachment: fs.createReadStream(leiamFile)}, event.threadID, (err) => {
    fs.unlinkSync(leiamFile);
    if (err) return api.chat(`Error: {\nstatus: 3792\nsummary: {\n'leiamnash server is offline',\n'this is temporary issue please request again'\n'undefined leiamnash server'\n},\nalicezetion: this error happens if your account get muted by facebook\n}`, event.threadID, event.messageID);
    }, event.messageID);
  } else {
  await alice(event.senderID);
    api.chat({body: `invalid url please provide a valid url that starts on https\n\nhow to use?\n${global.alice.prefix}webcord ⟨ url ⟩\n\nexample:\n${global.alice.prefix}webcord https://facebook.com`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`invalid url please provide a valid url that starts on https\n\nhow to use?\n${global.alice.prefix}webcord ⟨ url ⟩\n\nexample:\n${global.alice.prefix}webcord https://facebook.com`, event.threadID, event.messageID);
   }, event.messageID);
  }
 } catch (err) { 
  log.err(err);
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    webcord,
    leiamnash
}
