try{
  require('child_process').execSync('npm run inst');
}catch(e){console.log(e)}
const axios = require('axios').default;
const fs = require('fs');

async function start(){
  let repositories = JSON.parse(fs.readFileSync('repositories.json'));
  try{
    repositories = await axios.get('https://api.github.com/users/QuestNetwork/repos');
  fs.writeFileSync('repositories.json',JSON.stringify(repositories),{encoding:'utf8',flag:'w'});
}catch(e){console.log()}



  let apiPackages = [];
  for( let repo of repositories['data']){
    // checkout the repository as a sibling if it's not this reposito
    if(repo['full_name'] != "QuestNetwork/qDesk"){
      try{
      require('child_process').execSync('(cd .. && git clone https://github.com/'+repo['full_name']+')');
      }catch(e){}
      try{
      require('child_process').execSync('(cd .. && cd '+repo['full_name'].split('/')[1]+' && git checkout 0.9.4)');
      }catch(e){}
    }

  }

}

start();
