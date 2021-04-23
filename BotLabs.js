const fetch = require('petitio');

class BotLabs {
  constructor(client, token) {
    if(client == null || client == undefined || token == "" || token == null || token == undefined) throw "Client or Token wrong or missing!"
    this.client = client;
    this.token = token;
    this.interval = setInterval(() => this.post(), 1800000);
    this.stop = () => {
      clearInterval(this.interval);
    }
  }
  async post() {
      let shards = 0;
      if (client.shard != null) shards = client.shard.count
      const body = {
        'token': this.token,
        'server_count': this.client.guilds.cache ? this.client.guilds.cache.size : this.client.guilds.size,
        'shard_count': shards
      }
      fetch(`https://bots.discordlabs.org/v2/bot/${client.user.id}/stats`, 'POST').header('Content-Type', 'application/json').body(JSON.stringify(body)).send()
  }
  async getInfo(BotID) {
    const result = (await fetch(`https://bots.discordlabs.org/v2/bot/${BotID}`, 'GET')).json();
    if (result.error == 'true') throw result.message;
    return result;
  }
}

module.exports = BotLabs
