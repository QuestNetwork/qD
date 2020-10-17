const axios = require('axios').default;
const fs = require('fs');

try{
  repositoriesData = await axios.get('https://api.github.com/users/QuestNetwork/repos');
  repositories = repositoriesData['data'];
fs.writeFileSync('repositories.json',JSON.stringify(repositories),{encoding:'utf8',flag:'w'});
}catch(e){console.log(e)}
