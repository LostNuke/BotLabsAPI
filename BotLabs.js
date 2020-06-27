var request = require('request');

class BotLabs {
  constructor(client, token) {
    if(client == null || client == undefined || token == "" || token == null || token == undefined) throw "Client or Token wrong or missing!"
    this.client = client
    this.token = token
  }

  async getInfo(BotID) {
    var options = {
      'method': 'GET',
      'url': `https://bots.discordlabs.org/v2/bot/${BotID}`,
    };
    let result = await new Promise(function (resolve, reject) {
      request(options, function (error, response) {
        if (error) throw new Error(error);
        resolve(JSON.parse(response.body))
      });
    })
    return result
  }

  startAuto() {
    let post = () => {
      let shards = 0;
      if(this.client.shard != null) shards = this.client.shard.count

      var options = {
        'method': 'POST',
        'url': `https://bots.discordlabs.org/v2/bot/${this.client.user.id}/stats`,
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          'token': this.token,
          'server_count': `${this.client.guilds.cache.keyArray().length}`,
          'shard_count': `${shards}`
        }
      };
  
      request(options, function (error, response) {
        if (error) throw new Error(error);
      });
    }

    post()
    setInterval(function() {
      post()
    },1800000)
    

  }



}

module.exports = BotLabs
