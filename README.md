# Quest Desktop
> The first fully featured, multi-platform, publicly auditable, decentralized, real-time end-to-end encrypted messenger.

![Screenshot](https://github.com/QuestNetwork/quest-messenger-js/raw/0.9.2/doc/images/0.9.2.png?raw=true)

## Lead Maintainer

[StationedInTheField](https://github.com/StationedInTheField)

## Description
Quest Desktop is an Angular window manager for the [Quest OS](https://github.com/QuestNetwork/quest-os-js) with cool open source modules like the [Quest Messenger]((https://github.com/QuestNetwork/quest-messenger-js). Look at what other people have built from this project: [Awesome Quest Network dApps](https://github.com/QuestNetwork/awesome/blob/master/README.md)!

## Support Us
This project is a lot of work and unfortunately we need to eat food (ツ)

| Ethereum| Bitcoin |
|---|---|
| `0xBC2A050E7B87610Bc29657e7e7901DdBA6f2D34E` | `bc1qujrqa3s34r5h0exgmmcuf8ejhyydm8wwja4fmq`   |
|  <img src="doc/images/eth-qr.png" >   | <img src="doc/images/btc-qr.png" > |

## Development

### IPFS Deploy
**Memory** 3.75GB **Storage** 6GB **NodeJS** 14 **NPM** 6 **IPFS** 0.6

`git clone https://github.com/QuestNetwork/qDesktop`

`cd qDesktop

`git checkout 0.9.3`

Configure your favorite modules, qDesktop comes preloaded with the [Quest Messenger JS]((https://github.com/QuestNetwork/quest-messenger-js).

`npm install`

`npm run ipfs`

`ipfs pin add <CID>`

If you have trouble getting the directory discovered by gateways, you can try ```./ipfs-propagate.sh``` from the root git folder.
Keep in mind that the bundled web application is >14MB alone without assets, please be patient until we have a preloader.

### Prerequisites

To fully participate in the development, you'll need:
- [Quest Messenger JS]((https://github.com/QuestNetwork/quest-messenger-js)
- [Quest Network Operating System](https://github.com/QuestNetwork/quest-os-js)
- [Quest Network Bee Process](https://github.com/QuestNetwork/quest-bee-js)
- [Quest Network Ocean Process](https://github.com/QuestNetwork/quest-ocean-js)
- [Quest Network Dolphin Process](https://github.com/QuestNetwork/quest-dolphin-js)
- [Quest Network PubSub Process](https://github.com/QuestNetwork/quest-pubsub-js)

```
git clone https://github.com/QuestNetwork/qDesktop && git clone https://github.com/QuestNetwork/quest-os-js && git clone https://github.com/QuestNetwork/quest-bee-js && git clone https://github.com/QuestNetwork/quest-ocean-js && git clone https://github.com/QuestNetwork/quest-dolphin-js && git clone https://github.com/QuestNetwork/quest-pubsub-js && git clone https://github.com/QuestNetwork/quest-messenger-js
```

### Commands

**Prepare Package**

To The same directory you're cloning this repository to.

``npm run inst`` Removes `package-lock.json` and runs ``npm install``

**Build For Linux**

``npm run linux`` Builds Linux AppImage and Snap files to `dist/`

**Build For Mac**
```
sed -i 's/"@questnetwork\/quest-messenger-js"/"quest-messenger-js"/g' package.json
&& npm run mac```
sed -i  's/"quest-messenger-js"/"@questnetwork\/quest-messenger-js"/g'  package.json
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

## License

GNU Affero GPLv3
