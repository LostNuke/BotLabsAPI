# BotLabsAPI

A package with 1 simple method that help you interact with the DiscordLabs Bot API

To set it up go:

```javascript
const BotLabs = require('botlabsapi');
client.on('ready', async function() {
   const Lab = new BotLabs(client,"YOURTOKEN")
})
```


To get info about a Bot you can use:

```javascript
 BotLabs.getInfo("BotID")
 ```