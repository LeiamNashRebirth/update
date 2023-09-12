 const fs = require("fs");
 const axios = require("axios");
 const turl = require("turl");

function leiamnash(){
 return{
  "name": "hdr",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "hdr": {
    "func": "hdr",
    "cooldown": 10
   }
  }
 }
}

async function hdr(event, api, leiam, log, alice) {
try{
const leiamFile = __dirname + "/cache/hdr_" + event.senderID + ".png";
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
 const leiamnash = leiam.join(" ");
if(event.type == "message_reply") {
  const leiamUrl = await turl.shorten(event.messageReply.attachments[0].url);
  api.setMessageReaction("✅", event.messageID, (err) => {}, true);
 const leiamGet = (await axios.get(`${global.alice.api}/hdr?image=${leiamUrl}`, { responseType: 'arraybuffer'})).data;
fs.writeFileSync(leiamFile, Buffer.from(leiamGet, 'utf-8'));
  api.chat({body: ``, attachment: fs.createReadStream(leiamFile)}, event.threadID, (err) => {
    fs.unlinkSync(leiamFile);
    if (err) return api.chat(`Error: {\nstatus: 3792\nsummary: {\n'leiamnash server is offline',\n'this is temporary issue please request again'\n'undefined leiamnash server'\n},\nalicezetion: this error happens if your account get muted by facebook\n}`, event.threadID, event.messageID);
   }, event.messageID);
} else if (!leiamnash) {
    await alice(event.senderID);
  api.chat({body: `missing image to convert\n\nhow to use?\n${global.alice.prefix}hdr ⟨ url or reply ⟩\n\nexample:\n${global.alice.prefix}hdr https://i.imgur.com/4CMYCrY.jpg\n\nor\n\n${global.alice.prefix}hdr ‹reply to image›`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
    fs.unlinkSync(aliceFile);
    if (err) return api.chat(`missing image to convert\n\nhow to use?\n${global.alice.prefix}hdr ⟨ url or reply ⟩\n\nexample:\n${global.alice.prefix}hdr https://i.imgur.com/4CMYCrY.jpg\nelse\n${global.alice.prefix}hdr ‹reply to image›`, event.threadID, event.messageID);
    }, event.messageID);
} else {
   api.setMessageReaction("✅", event.messageID, (err) => {}, true);
const leiamGet = (await axios.get(`${global.alice.api}/hdr?image=${leiamnash}`, { responseType: 'arraybuffer'})).data;
fs.writeFileSync(leiamFile, Buffer.from(leiamGet, 'utf-8'));
  api.chat({body: ``, attachment: fs.createReadStream(leiamFile)}, event.threadID, (err) => {
    fs.unlinkSync(leiamFile);
    if (err) return api.chat(`Error: {\nstatus: 3792\nsummary: {\n'leiamnash server is offline',\n'this is temporary issue please request again'\n'undefined leiamnash server'\n},\nalicezetion: this error happens if your account get muted by facebook\n}`, event.threadID, event.messageID);
   }, event.messageID);
  }
 } catch (err) {
  log.err(err); 
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    hdr,
    leiamnash
}
