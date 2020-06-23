var request = require('request');

class BotLabs {
  constructor(client, token) {
    this.client = client
    this.token = token
  }

  async getInfo(BotID) {
    var options = {
      'method': 'GET',
      'url': `https://bots.discordlabs.org/v2/bot/${BotID}`,
      'headers': {
        'x-api-key': 'bd2bde9c-02c8-49d1-a45d-bad46fabbf5d',
        'Cookie': '__cfduid=d0d403fc2427b12bf7c1b1f78caabe2d31592937598'
      }
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
          'x-api-key': 'bd2bde9c-02c8-49d1-a45d-bad46fabbf5d',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '__cfduid=d0d403fc2427b12bf7c1b1f78caabe2d31592937598'
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