# BotLabsAPI

A package with 2 simple methods that help you interact with the DiscordLabs Bot API

To set it up go:

```javascript
const BotLabs = new (require('botlabsapi'))(client,"YOURTOKEN")
client.on('ready', async function() {
   BotLabs.startAuto()
})
```


to get infos about a Bot you can use:

```javascript
 BotLabs.getInfo("BotID")
 ```