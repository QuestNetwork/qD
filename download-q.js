const axios = require('axios').default;
const fs = require('fs');

async function start(){
  let repositories = await axios.get('https://api.github.com/users/QuestNetwork/repos');
  let apiPackages = [];
  for( let repo of repositories['data']){
    // checkout the repository as a sibling if it's not this repository
    if(repo['full_name'] != "QuestNetwork/qDesk"){
      require('child_process').execSync('(cd .. && git clone https://github.com/'+repo['full_name']+')');
      require('child_process').execSync('(cd .. && cd repo['full_name']+' && git checkout 0.9.4)');
    }

  }

}

start();
