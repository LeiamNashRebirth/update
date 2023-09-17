 function leiamnash(){
 return{
  "name": "seen",
  "author": "leiamnash",
  "version": "1.0.0", 
  "noPrefix": "seen"
 }
}

async function seen(event, api, alice) {
try{
    api.markAsReadAll(() => {});
  } catch (err) {} 
}

module.exports = {
    seen,
    leiamnash
}
