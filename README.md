![Completion](https://img.shields.io/badge/completion-16%25-orange) ![Help Wanted](https://img.shields.io/badge/%20-help--wanted-%23159818) ![Version 0.9.3](https://img.shields.io/badge/stable-v0.9.3-green) ![Version 0.9.3](https://img.shields.io/badge/dev-v0.9.4-blue) ![Sponsors](https://img.shields.io/badge/sponsors-2-orange)

# qDesk
> Cross-Platform Trustless Social Network

![Screenshot](https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.3/doc/images/0.9.3.png?raw=true)

## Description
qDesk is an example app for the [Quest OS](https://github.com/QuestNetwork/quest-os-js) with cool open source modules like [qDesk Messages](https://github.com/QuestNetwork/qd-messages-ts) and [qDesk Social](https://github.com/QuestNetwork/qd-social-ts), as well as the upcoming [qDesk Markets](https://github.com/QuestNetwork/qd-market-ts), [qDesk News](https://github.com/QuestNetwork/qd-news-ts) and [qDesk Games](https://github.com/QuestNetwork/qd-games-ts).

This app is built on [Quest OS](https://github.com/QuestNetwork/quest-os-js) which makes use of the [Interplanetary Filesystem](https://ipfs.io) and [IPFS GossipSub](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1/).

Look what other people have built with qDesk: [Awesome Quest Network dApps](https://github.com/QuestNetwork/awesome/blob/master/README.md)!

qDesk allows to lazy load modules.

## Security

![Completion 1.0.0](https://img.shields.io/badge/OAEP-4096%20Bit-green) ![EC](https://img.shields.io/badge/EC-P&#8208;521-green) ![AES](https://img.shields.io/badge/AES-256%20Bit-yellow)

[Quest OS](https://github.com/QuestNetwork/quest-os-js) uses [4096 Bit RSA-OAEP](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Operation) encryption, [256 Bit AES-CBC](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) encryption and [NIST P-521 EC](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)) signatures.

## Download

| Version | Linux | Mac | Windows |
|---------:|------------------------------|------------------------------|------------------------------|
| 0.9.3 | [q-desk-0.9.3.AppImage](https://github.com/QuestNetwork/qDesk/releases/download/0.9.3/q-desk-0.9.3.AppImage)  |  [q-desk-0.9.3.dmg](https://github.com/QuestNetwork/qDesk/releases/download/0.9.3/q-desk-0.9.3.dmg) | No Official Build |
| 0.9.2 | [quest-messenger-0.9.2.AppImage](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.2/quest-messenger-0.9.2.AppImage) | [quest-messenger-0.9.2.dmg](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.2/quest-messenger-0.9.2.dmg) | No Official Build |
| 0.9.1 | [quest-messenger-0.9.1.AppImage](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.1/quest-messenger-0.9.1.AppImage) | [quest-messenger-0.9.1.dmg](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.1/quest-messenger-0.9.1.dmg) | No Official Build |

If you want anything else, you'll have to build from sources and probably fix some stuff.

**WARNING:** 3rd party dependencies not audited. We recommend to use the downloaded app in a virtual machine until version 1.0.0.

## Web

<img src='https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.3/doc/images/pinatalink.png?raw=true' width=25%> <img src='https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.3/doc/images/cloudflarelink.png?raw=true' width=25%> <img src='https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.3/doc/images/ipfsiolink.png?raw=true' width=25%>

https://gateway.pinata.cloud/ipfs/QmeQZ1brST9P52prY14Twuqixx4YwKvybEMkAZftK1iJiZ/

https://cloudflare-ipfs.com/ipfs/QmeQZ1brST9P52prY14Twuqixx4YwKvybEMkAZftK1iJiZ/

https://ipfs.eternum.io/ipfs/QmeQZ1brST9P52prY14Twuqixx4YwKvybEMkAZftK1iJiZ/

https://ipfs.io/ipfs/QmeQZ1brST9P52prY14Twuqixx4YwKvybEMkAZftK1iJiZ/

http://ipfs.infura.io/ipfs/QmeQZ1brST9P52prY14Twuqixx4YwKvybEMkAZftK1iJiZ/

## Lead Maintainer

[StationedInTheField](https://github.com/StationedInTheField)

## Support Us
This project is a lot of work and unfortunately we need to eat food (ツ)

| Ethereum| Bitcoin |
|---|---|
| `0xBC2A050E7B87610Bc29657e7e7901DdBA6f2D34E` | `bc1qujrqa3s34r5h0exgmmcuf8ejhyydm8wwja4fmq`   |
|  <img src="doc/images/eth-qr.png" >   | <img src="doc/images/btc-qr.png" > |

## Development

### Prerequisites

To fully participate in the development, you'll need:
- [qDesk Messages](https://github.com/QuestNetwork/qd-messages-ts)
- [qDesk Social](https://github.com/QuestNetwork/quest-social-js)
- [qDesk UI Service](https://github.com/QuestNetwork/qd-ui-js)
- [Quest Network Operating System](https://github.com/QuestNetwork/quest-os-js)
- [Quest Network Social Process](https://github.com/QuestNetwork/quest-social-js)
- [Quest Network Bee Process](https://github.com/QuestNetwork/quest-bee-js)
- [Quest Network Ocean Process](https://github.com/QuestNetwork/quest-ocean-js)
- [Quest Network Dolphin Process](https://github.com/QuestNetwork/quest-dolphin-js)
- [Quest Network PubSub Process](https://github.com/QuestNetwork/quest-pubsub-js)


1.) Clone & Checkout repositories:
```
git clone https://github.com/QuestNetwork/qd-social-ts && git clone https://github.com/QuestNetwork/qd-messages-ts && git clone https://github.com/QuestNetwork/qDesk && cd qd-social-ts   && git checkout 0.9.3 && cd ..  &&  cd qd-messages-ts   && git checkout 0.9.3 && cd ..  &&  cd qDesk   && git checkout 0.9.3 && cd ..
```


2.) Install Dependencies & Enter qDesk Repository:
```
cd qd-social-ts && npm run inst && cd .. && cd qd-messages-ts && npm run inst && cd .. && cd qDesk && npm run inst
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
&& npm run mac && 
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

**IPFS Deploy**

System Requirements: **Memory** 3.75GB **Storage** 6GB **NodeJS** 14 **NPM** 6 **IPFS** 0.6

`npm run ipfs`

`ipfs pin add <CID>`

If you have trouble getting the directory discovered by gateways, you can try ```./ipfs-propagate.sh``` from the root git folder.
Keep in mind that the bundled web application is >14MB alone without assets, please be patient until we have a preloader.


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
- Offer "LocalStorage" As A Storage Container On The Web To Stay Signed In
- [qDesk Messages](https://github.com/QuestNetwork/qd-messages-ts)
- [qDesk Social](https://github.com/QuestNetwork/quest-social-js)

## Roadmap

**0.9.4**
- Democratically block or mute peers

**0.9.6**
- Encrypt Settings/Message History Files
- [qDesk Markets](https://github.com/QuestNetwork/qd-market-ts)
- [qDesk News](https://github.com/QuestNetwork/qd-news-ts)
- [Quest Network Coral Process](https://github.com/QuestNetwork/quest-coral-js)

**0.9.7**
- Add Custom Themes By Pasting CSS Into The Built-In Theme Editor
- Import/Export Themes
- Light Mode

**0.9.8**
- Badges For Notifications
- Desktop Notifications

**0.9.9**
- [qDesk Games](https://github.com/QuestNetwork/qd-games-ts)
- Ethereum Payment Integration Beta

**1.0.0**
- Fork into [Vibenarium](https://github.com/Vibenarium/vibenarium-platform)
- Dynamic Swarm Peer List Also On The Web (add and remove bootstrap peers)
- Third Party Dependencies Audited, Security Issues Fixed
- Unlimited Custom Emojis
- Quest Network Calendar App Plugin (for shared calendars)

**2.0.0**
- Ethereum Payment Integration Finalized

**4.0.0**
- [OpenAI GPT3](https://en.wikipedia.org/wiki/GPT-3) Integration For Suggestions, AutoRespond And Completion

**5.0.0**
- Modular Crypto Currency Integration (presets for Bitcoin, Monero and Chainlink)

## License

GNU Affero GPLv3
