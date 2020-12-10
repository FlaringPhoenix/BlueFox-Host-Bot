const Discord = require('discord.js');

exports.run = (client, message, args) => {

    client.sendEmbed(message.channel, `Ping?`).then(m => {

        let roundTripLatency = m.createdTimestamp - message.createdTimestamp;
        let websocketLatency = Math.round(client.ws.ping);

        client.editEmbed(message.channel, m.id, 'Pong!', "", [
            {
                name: "RoundTrip",
                value:`${roundTripLatency}ms`},
            {
                name: "Websocket Latency",
                value:`${websocketLatency}ms`
            }
            ]);

    });

}

module.exports.help = {
    name: "ping",
    description: "Pings the Bot",
    dm: true,
    cooldown: 5,
    aliases: ["p"]
}
