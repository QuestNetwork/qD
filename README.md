![Completion](https://img.shields.io/badge/completion-19%25-orange) ![Help Wanted](https://img.shields.io/badge/%20-help--wanted-%23159818) ![Version 0.9.3](https://img.shields.io/badge/stable-v0.9.4-green) ![Version 0.9.3](https://img.shields.io/badge/dev-v0.9.5-blue) ![Sponsors](https://img.shields.io/badge/sponsors-1-orange)

## qDesk
> Cross-Platform Trustless Social Network

![Screenshot](https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.3/doc/images/0.9.3.png?raw=true)

>In case you are experiencing connectivity issues, on the app you can try using different [star node configurations](#troubleshooting) in Settings > IPFS.

## Description
qDesk is an example app for our JavaScript p2p library [Quest OS](https://github.com/QuestNetwork/quest-os-js) with cool open source modules like [qDesk Messages](https://github.com/QuestNetwork/qd-messages-ts) and [qDesk Social](https://github.com/QuestNetwork/qd-social-ts), as well as the upcoming [qDesk Markets](https://github.com/QuestNetwork/qd-market-ts), [qDesk News](https://github.com/QuestNetwork/qd-news-ts) and [qDesk Games](https://github.com/QuestNetwork/qd-games-ts).

We have chosen Angular/Electron as an example environment because we believe it offers the best accessibility for developers coming from any other language/framework. It is already being used in Python on PyQt5 and we aim to provide the underlying library in Go and wherever possible in Rust as well. 

qDesk makes it possible to build custom, secure and decentralized social networks in less than 20 days.

Our quest network aims to allow the creation and (distributed) completion of quests supported by a feature rich decentralized social network.

0.9.5+ allow to connect qDesk Social profiles to Twitter without sharing information with Twitter as an additional layer of verification. It is planned to add passive verification for a custom list of external networks to verify the peer identities.

1.0.0+ complies with privacy regulations and can be used for confidential information as a production social network for enterprises worldwide. 

This app is built on [Quest OS](https://github.com/QuestNetwork/quest-os-js) which makes use of the [Interplanetary Filesystem](https://ipfs.io), [IPFS GossipSub](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1/) and [IPFS DAGs](https://docs.ipfs.io/concepts/merkle-dag/).

Look what other people have built with qDesk: [Awesome Quest Network dApps](https://github.com/QuestNetwork/awesome/blob/master/README.md)!

qDesk allows to lazy load modules.

## Security

![Completion 1.0.0](https://img.shields.io/badge/OAEP-4096%20Bit-green) ![EC](https://img.shields.io/badge/EC-P&#8208;521-green) ![AES](https://img.shields.io/badge/AES-256%20Bit-yellow)

[Quest OS](https://github.com/QuestNetwork/quest-os-js) uses [4096 Bit RSA-OAEP](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Operation) encryption, [256 Bit AES-CBC](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) encryption and [NIST P-521 EC](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)) signatures.


## Download

| Version | Linux | Mac | Windows |
|---------:|------------------------------|------------------------------|------------------------------|
| 0.9.4 | [qDesk-0.9.4.AppImage](https://github.com/QuestNetwork/qDesk/releases/download/0.9.4/qDesk-0.9.4.AppImage) | [qDesk-0.9.4.dmg](https://github.com/QuestNetwork/qDesk/releases/download/0.9.4/qDesk-0.9.4.dmg) | No Official Build |
| 0.9.3-rc1 | [q-desk-0.9.3.AppImage](https://github.com/QuestNetwork/qDesk/releases/download/0.9.3-rc1/q-desk-0.9.3.AppImage)  |  [q-desk-0.9.3.dmg](https://github.com/QuestNetwork/qDesk/releases/download/0.9.3-rc1/q-desk-0.9.3.dmg) | No Official Build |
| 0.9.2 | [quest-messenger-0.9.2.AppImage](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.2/quest-messenger-0.9.2.AppImage) | [quest-messenger-0.9.2.dmg](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.2/quest-messenger-0.9.2.dmg) | No Official Build |
| 0.9.1 | [quest-messenger-0.9.1.AppImage](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.1/quest-messenger-0.9.1.AppImage) | [quest-messenger-0.9.1.dmg](https://github.com/QuestNetwork/qd-messages-ts/releases/download/0.9.1/quest-messenger-0.9.1.dmg) | No Official Build |

If you want anything else, you'll have to build from sources and probably fix some stuff.

**WARNING:** 3rd party dependencies not audited. We recommend to use the downloaded app in a virtual machine until version 1.0.0.

## Web Demo

**0.9.4**

Try our example application live in your browser. We recommend Chrome & Firefox.

<img src='https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.4/doc/images/pinatalink.png?raw=true' width=25%> <img src='https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.4/doc/images/cloudflarelink.png?raw=true' width=25%> <img src='https://github.com/QuestNetwork/qd-messages-ts/raw/0.9.4/doc/images/ipfsiolink.png?raw=true' width=25%>

https://gateway.pinata.cloud/ipfs/QmZNvMbTPCEW1vebsEc5L2dx18PeYCKgwP5oMCVREkmr3p/

https://cloudflare-ipfs.com/ipfs/QmZNvMbTPCEW1vebsEc5L2dx18PeYCKgwP5oMCVREkmr3p/

https://ipfs.eternum.io/ipfs/QmZNvMbTPCEW1vebsEc5L2dx18PeYCKgwP5oMCVREkmr3p/

https://ipfs.io/ipfs/QmZNvMbTPCEW1vebsEc5L2dx18PeYCKgwP5oMCVREkmr3p/

http://ipfs.infura.io/ipfs/QmZNvMbTPCEW1vebsEc5L2dx18PeYCKgwP5oMCVREkmr3p/

**0.9.3-rc1**

<img src='https://github.com/QuestNetwork/qDesk/raw/0.9.3-rc1/doc/images/pinatalink.png?raw=true' width=25%> <img src='https://github.com/QuestNetwork/qDesk/raw/0.9.3-rc1/doc/images/cloudflarelink.png?raw=true' width=25%> <img src='https://github.com/QuestNetwork/qDesk/raw/0.9.3-rc1/doc/images/ipfsiolink.png?raw=true' width=25%>

https://gateway.pinata.cloud/ipfs/QmTSuYWm2LXyYndEq2W62raSpjjUioSoSW3otSJRFQ1wra/

https://cloudflare-ipfs.com/ipfs/QmTSuYWm2LXyYndEq2W62raSpjjUioSoSW3otSJRFQ1wra/

https://ipfs.eternum.io/ipfs/QmTSuYWm2LXyYndEq2W62raSpjjUioSoSW3otSJRFQ1wra/

https://ipfs.io/ipfs/QmTSuYWm2LXyYndEq2W62raSpjjUioSoSW3otSJRFQ1wra/

http://ipfs.infura.io/ipfs/QmTSuYWm2LXyYndEq2W62raSpjjUioSoSW3otSJRFQ1wra/

## Manual & Documentation

See our automated documentation for more information: https://questnetwork.github.io/docs

## Lead Maintainer

[StationedInTheField](https://github.com/StationedInTheField)

## Support Us
Please consider supporting us, so that we can build a non-profit for this project (ツ)

| Ethereum| Bitcoin |
|---|---|
| `0xBC2A050E7B87610Bc29657e7e7901DdBA6f2D34E` | `bc1qujrqa3s34r5h0exgmmcuf8ejhyydm8wwja4fmq`   |
|  <img src="https://github.com/QuestNetwork/qDesk/raw/master/doc/images/eth-qr.png" >   | <img src="https://github.com/QuestNetwork/qDesk/raw/master/doc/images/btc-qr.png" > |

## Development

### Planning 

See our [Kanban](https://github.com/orgs/QuestNetwork/projects/1) for the development of 0.9.5, feel free to add or pick up features!

### Prerequisites

1.) 

Clone & Checkout essential repositories:
```
git clone https://github.com/QuestNetwork/qd-social-ts && git clone https://github.com/QuestNetwork/qd-messages-ts && git clone https://github.com/QuestNetwork/qDesk && cd qd-social-ts   && git checkout 0.9.4 && cd ..  &&  cd qd-messages-ts   && git checkout 0.9.4 && cd ..  &&  cd qDesk   && git checkout 0.9.4 && cd ..
```

OR 

Clone & Checkout all repositories on the latest dev branch:
``` 
git clone https://github.com/QuestNetwork/qDesk && cd qDesk && git checkout 0.9.5-dev && npm run q-dev && cd ..
````

2.) Install Dependencies & Enter qDesk Repository:
```
cd quest-utilities-js && npm install && cd .. && cd quest-crypto-js && npm install && cd .. && cd quest-os-js && npm install && cd .. && cd qd-social-ts && npm run inst && cd .. && cd qd-messages-ts && npm run inst && cd .. && cd qDesk && npm run inst
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

``ipfs daemon & npm run ipfs``  Creates the bundled application for the web with dynamic base path to ```dist/web```

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


**IPFS Deploy**

System Requirements: **Memory** 3.75GB **Storage** 6GB **NodeJS** 14 **NPM** 6 **IPFS** 0.6

`ipfs daemon & npm run ipfs`

`ipfs pin add <CID>`

If you have trouble getting the directory discovered by gateways, you can try ```./ipfs-propagate.sh``` from the root of this repository.
Keep in mind that the bundled web application is >14MB alone without assets, please be patient until we have a preloader.




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
- Offer "LocalStorage" As A Storage Container On The Web To Stay Signed In
- [qDesk Messages](https://github.com/QuestNetwork/qd-messages-ts)
- [qDesk Social](https://github.com/QuestNetwork/quest-social-js)

**0.9.4**
- Encrypt Settings/Message History Files
- Change Swarm Peers In The Browser
- [Quest Network Coral Process](https://github.com/QuestNetwork/quest-coral-js)
- Additional Peering, option to pull from GitHub.
- Module Upgrades

## Roadmap

**0.9.5**
- [qDesk Games](https://github.com/QuestNetwork/qd-market-ts) (for free items)
- [qDesk Apps](https://github.com/QuestNetwork/qd-market-ts) (for free items)
- More Message Types And Inline Previews
- Native Audio/Video

**0.9.6**- 
- [qDesk Apps](https://github.com/QuestNetwork/qd-market-ts) (for paid items)
- [qDesk Games](https://github.com/QuestNetwork/qd-market-ts) (for paid items)
- [qDesk Market Beta](https://github.com/QuestNetwork/qd-market-ts)
- [qDesk News](https://github.com/QuestNetwork/qd-news-ts)
- Ethereum Payment Integration Beta

**0.9.7**
- Add Custom Themes By Pasting CSS Into The Built-In Theme Editor
- Import/Export Themes
- Light Mode
- Unlimited Custom Emojis

**0.9.8**
- Badges For Notifications
- Desktop Notifications

**0.9.9**
- Additional Patch
- [qDesk Music Beta](https://github.com/QuestNetwork/qd-music-ts) 
- [qDesk Video Beta](https://github.com/QuestNetwork/qd-video-ts)

**1.0.0**
- [qDesk Quests Beta](https://github.com/QuestNetwork/qd-calendar-ts)
- [qDesk Calendar Beta](https://github.com/QuestNetwork/qd-calendar-ts) personal & shared calendars. Add events from other modules on qDesk.
- [qDesk Messages Stable](https://github.com/QuestNetwork/qd-messages-ts)
- [qDesk Social Stable](https://github.com/QuestNetwork/quest-social-js)
- [qDesk Apps Stable](https://github.com/QuestNetwork/qd-market-ts) (for paid items)
- Fork into [Vibenarium](https://github.com/Vibenarium/vibenarium-platform)
- Third Party Dependencies Audited, Security Issues Fixed
- Complies with global privacy laws

**2.0.0**
- [qDesk Calendar Stable](https://github.com/QuestNetwork/qd-calendar-ts)
- [qDesk Market Stable](https://github.com/QuestNetwork/qd-market-ts)
- [qDesk Music Stable](https://github.com/QuestNetwork/qd-music-ts) 
- [qDesk Video Stable](https://github.com/QuestNetwork/qd-video-ts)
- Ethereum Payment Integration Finalized

**3.0.0**
- [qDesk Quests Stable](https://github.com/QuestNetwork/qd-calendar-ts)
- [qDesk Games Stable](https://github.com/QuestNetwork/qd-market-ts) (for paid items)

**4.0.0**
- [OpenAI GPT3](https://en.wikipedia.org/wiki/GPT-3) Integration For Suggestions, AutoRespond And Completion

**5.0.0**
- Modular Crypto Currency Integration (presets for Bitcoin, Monero and Chainlink)


# Troubleshooting
**:warning: Messages are not being delivered || Participants won't update || Can't join channels**<br>
>Solution: qDesk ``^0.9.4`` go to ``Settings > IPFS`` and either download an example swarm peer list from GitHub (https://github.com/QuestNetwork/qDesk/blob/0.9.4/src/app/swarm.json) or enter your own.

If your problem is not solved here, please file an [issue](https://github.com/QuestNetwork/qDesk/issues/new) on GitHub.


## License

GNU Affero GPLv3
