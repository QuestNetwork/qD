const fs = require('fs');
const { execSync } = require("child_process");

let peerList = JSON.parse(fs.readFileSync('swarm-peers.json',"utf8"))['Peers'];
console.log(peerList);
for(let p of peerList){
  try{
    let ma = p['Addr'] + "/p2p/" + p['Peer'];
    execSync('(ipfs swarm connect '+ma+')',{stdio: 'inherit'});
  }catch(e){}
}
