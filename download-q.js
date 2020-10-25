try{
  require('child_process').execSync('npm run inst');
}catch(e){console.log(e)}
const fs = require('fs');

async function start(){
  let repositories = [];
  try{
    repositories = JSON.parse(fs.readFileSync('repositories.json'));
  }catch(e){console.log(e)}


  if(typeof repositories['length'] == 'undefined' || repositories.length == 0){
    return false;
  }

  let apiPackages = [];
  for( let repo of repositories){
    // checkout the repository as a sibling if it's not this reposito
    if(repo['full_name'] != "QuestNetwork/qD"){
      try{
      require('child_process').execSync('(cd .. && git clone https://github.com/'+repo['full_name']+')');
      }catch(e){}
      try{
      require('child_process').execSync('(cd .. && cd '+repo['full_name'].split('/')[1]+' && git checkout 0.9.5-dev)');
      }catch(e){}
    }

  }

}

start();
