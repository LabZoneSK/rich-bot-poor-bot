
# Rich Bot, Poor Bot

## About

This is simple tools set for trading and monitoring your digital assets portfolio a.k.a. cryptocurrencies. I have
been inspired by great book from Robert Kiyosaki - Rich Dad, Poor Dad. This tool should provide suite of different
trading bots and it should help you to manage and monitor your assets.

**IMPORTANT** This code is draft and not ready for production yet! 

Bot back-end is based on code created in this repository:
[Stop-loss bot CLI](https://github.com/LabZoneSK/stop-loss-bot)

To create GUI I have used (Electron)[https://electronjs.org/] which allows to build desktop applications 
for Microsoft Windows, Linux or iOS written in JavaScript.

For **DOCUMENTATION** see [Wiki](https://github.com/LabZoneSK/stop-loss-bot-GUI/wiki)

## Basic commands

Usage
---
 
Install all dependecies
 
```
npm install
```
 
Run the bot in development mode
---
 
```
npm run electron:start
```

Create desktop application
---
 
```
npm run preelectron-pack
npm run electron:pack
```

If you want Linux desktop application
---

```
npm run preelectron-pack
npm run electron:pack-linux
```

**Current code is work in progress. Please, use with caution. Do not connect to
your Kraken account until you are sure that you know what you are doing. Otherwise you can loose your money!!!**

If you want to contribute or you have any ideas or questions, do not hesitate to contact me.

Twitter: [@starosta83](https://twitter.com/starosta83)

Email: martin.starosta83@gmail.com

I will be very happy if this bot helps you to loss your money and provide you "safety net" in times when cryptocurrency
market crashes.

