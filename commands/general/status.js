const axios = require('axios');
const moment = require('moment');

exports.run = (client, message, args) => {

    axios({
        url: "http://api.bluefoxhost.com:9030/v1/host/panel/status",
        method: 'GET',
        followRedirect: true,
        maxRedirects: 5,
    }).then(response => {
        let data = response.data;
        console.log(data);

        let nodes = data.nodes;
        let locations = Object.keys(nodes);
        let lastUpdated = data.lastUpdated;

        let desc = locations.map(l => (nodes[l].map(n => `\`${n.host}\` -> ${n.online === true ? "✅": "❌"}\n`))).join("");

        client.sendEmbed(message.channel,
            'BlueFox Host Status',
            desc,
            [],
            `Last Updated: ${moment.duration(Date.now() - lastUpdated).format(' D [days], H [hrs], m [mins], s [secs] ago')}`);

    });

}

module.exports.help = {
    name: "ping",
    description: "Pings the Bot",
    dm: true,
    cooldown: 5,
    aliases: ["p"]
}
