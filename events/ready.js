const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');

module.exports = async (client) => {

    // Starting status
    await client.user.setActivity(`starting...`, { type: "PLAYING" });

    // Log stats
    console.log(`\x1b[32m==================================`);
    console.log(`\x1b[33m   Servers: ${client.guilds.cache.size}`);
    console.log(`\x1b[33m   Channels: ${client.channels.cache.size}`);
    console.log(`\x1b[33m   Users: ${client.users.cache.size}`);
    console.log(`\x1b[32m==================================`);
    console.log(`\x1b[37m`);

    // Random Status
    setInterval(async () => {

        let statusList = [
            `bh!help for help`,
            `[bh!]`
        ];

        let index = Math.floor(Math.random() * (statusList.length - 1) + 1);

        await client.user.setActivity(statusList[index], { type: 'WATCHING' });

    }, 10000); // every 10 seconds

    // End Time
    let endDate = new Date();

    // Started Status
    await client.user.setActivity(`started! Took ${endDate-client.startDate}ms`, { type: "PLAYING" });

};
