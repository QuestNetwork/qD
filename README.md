# qDesk
![Completion](https://img.shields.io/badge/completion-12%25-orange) ![Help Wanted](https://img.shields.io/badge/%20-help--wanted-%23159818) ![Version 0.9.3](https://img.shields.io/badge/version-v0.9.3-blue) ![Sponsors](https://img.shields.io/badge/sponsors-2-brightgreen)

> The Quest Network Cross-Platform Window Platform

![Screenshot](https://github.com/QuestNetwork/quest-messenger-js/raw/0.9.2/doc/images/0.9.2.png?raw=true)

## Description
qDesk is a window platform for the [Quest OS](https://github.com/QuestNetwork/quest-os-js) with cool open source modules like [qDesk Messages](https://github.com/QuestNetwork/quest-messenger-js). Look what other people have built with qDesk: [Awesome Quest Network dApps](https://github.com/QuestNetwork/awesome/blob/master/README.md)!

qDesk allows to lazy load modules. 

## Lead Maintainer

[StationedInTheField](https://github.com/StationedInTheField)

## Support Us
This project is a lot of work and unfortunately we need to eat food (ツ)

| Ethereum| Bitcoin |
|---|---|
| `0xBC2A050E7B87610Bc29657e7e7901DdBA6f2D34E` | `bc1qujrqa3s34r5h0exgmmcuf8ejhyydm8wwja4fmq`   |
|  <img src="doc/images/eth-qr.png" >   | <img src="doc/images/btc-qr.png" > |

## Development

### IPFS Deploy
**Memory** 3.75GB **Storage** 6GB **NodeJS** 14 **NPM** 6 **IPFS** 0.6

`git clone https://github.com/QuestNetwork/qDesk`

`cd qDesk`

`git checkout 0.9.3`

Configure your favorite modules

qDesk is built for [Quest OS](https://github.com/QuestNetwork/quest-os-js), so until it's published:

`cd .. && git clone https://github.com/QuestNetwork/quest-os-js && cd quest-os-js && git checkout 0.9.3 && cd ../qDesk`

qDesk is built with [Bee for Quest OS](https://github.com/QuestNetwork/quest-bee-js), so until it's published:

`cd .. && git clone https://github.com/QuestNetwork/quest-bee-js && cd quest-bee-js && git checkout 0.9.3 && cd ../qDesk`

qDesk comes preloaded with [qDesk Messages](https://github.com/QuestNetwork/quest-messenger-js), so until it's published:

`cd .. && git clone https://github.com/QuestNetwork/quest-messenger-js && cd quest-messenger-js && git checkout 0.9.3 && cd ../qDesk`

`npm install`

`npm run ipfs`

`ipfs pin add <CID>`

If you have trouble getting the directory discovered by gateways, you can try ```./ipfs-propagate.sh``` from the root git folder.
Keep in mind that the bundled web application is >14MB alone without assets, please be patient until we have a preloader.

### Prerequisites

To fully participate in the development, you'll need:
- [qDesk Messages](https://github.com/QuestNetwork/quest-messenger-js)
- [Quest Network Operating System](https://github.com/QuestNetwork/quest-os-js)
- [Quest Network Bee Process](https://github.com/QuestNetwork/quest-bee-js)
- [Quest Network Ocean Process](https://github.com/QuestNetwork/quest-ocean-js)
- [Quest Network Dolphin Process](https://github.com/QuestNetwork/quest-dolphin-js)
- [Quest Network PubSub Process](https://github.com/QuestNetwork/quest-pubsub-js)

```
git clone https://github.com/QuestNetwork/qDesk && git clone https://github.com/QuestNetwork/quest-os-js && git clone https://github.com/QuestNetwork/quest-bee-js && git clone https://github.com/QuestNetwork/quest-ocean-js && git clone https://github.com/QuestNetwork/quest-dolphin-js && git clone https://github.com/QuestNetwork/quest-pubsub-js && git clone https://github.com/QuestNetwork/quest-messenger-js
```

### Commands

**Prepare Package**

To The same directory you're cloning this repository to.

``npm run inst`` Removes `package-lock.json` and runs ``npm install``

**Build For Linux**

``npm run linux`` Builds Linux AppImage and Snap files to `dist/`

**Build For Mac**
```
sed -i 's/"@questnetwork\/q-desk"/"q-desk"/g' package.json
&& npm run mac```
sed -i  's/"q-desk"/"@questnetwork\/q-desk"/g'  package.json
```
Builds MacOS DMG and .app files to ``dist/`` and ``dist/mac``

**Build For IPFS**

``npm run ipfs``  Creates the bundled application for the web with dynamic base path to ```dist/web```

**Build For Web**

``npm run web`` Creates the bundled application for the web with static base path ```/```  to ```dist/web```

**Serve For Web**

``npm run serve`` Serves the bundled application on ```localhost:4200``` from ```dist/web```

**Serve For Web JIT**

``ng serve`` Serves a just in time compilation of the messenger on ```localhost:4200```

**Rest `node_modules` And Build For Web JIT**

``npm run serve-fresh`` Runs ``rm -rf node_modules && npm run inst && ng serve``

**Clear Watchlist**

``watch-reset`` Cleans the watch list, in case of ```System Limit``` error


We added an example ```swarm.json``` to the ```src/app``` folder with an example node to make reproduction easier, but we strongly recommend to use our [Quest CLI](https://github.com/QuestNetwork/quest-cli) to test and build the app.

Pro Tip: Put a file in your `/bin` that runs the quest-cli like so `node /path/to/quest-cli/index.js` from any folder on your system. It's much nicer!


## Features

**0.9.3**
- Does not depend on the internet
- Does not depend on centralized servers
- No static external address or port forwarding necessary
- Dark Mode
- AutoSave For Settings
- Auto SignIn, if signed in
- Enhanced Mobile UI, Centered Snackbar, New Fonts, Icons & Buttons
- Included All Fonts And Icons In The Bundle
- Export Settings
- SignOut
- Enable Write Lock To Keep All Processes From Writing
- Disable AutoSave
- Change AutoSave Interval
- Dynamic Swarm Peer List On Desktop (add and remove bootstrap peers)
- App is now modular, makes building add-ons easy
- Drive Lock Fixed

## Roadmap

**0.9.3**
- Offer "LocalStorage" As A Storage Container On The Web To Stay Signed In

**0.9.6**
- Encrypt Settings/Message History Files

**0.9.7**
- Add Custom Themes By Pasting CSS Into The Built-In Theme Editor
- Import/Export Themes
- Light Mode

**0.9.8**
- Badges For Notifications
- Desktop Notifications

**0.9.9*
- Ethereum Payment Integration Beta

**1.0.0**
- Dynamic Swarm Peer List Also On The Web (add and remove bootstrap peers)

**2.0.0**
- Ethereum Payment Integration Finalized

**4.0.0**
- [OpenAI GPT3](https://en.wikipedia.org/wiki/GPT-3) Integration For Suggestions, AutoRespond And Completion

**5.0.0**
- Modular Crypto Currency Integration (presets for Bitcoin, Monero and Chainlink)

## License

GNU Affero GPLv3
