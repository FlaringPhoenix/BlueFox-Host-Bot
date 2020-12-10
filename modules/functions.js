const moment = require('moment');
const fs = require("fs");
const Discord = require('discord.js');

module.exports = (client) => {

    client.wait = (ms) => {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
        return;
    }

    client.log = (title, msg) => {
        let time = moment().format(client.config.timeFormat);
        if (!title) title = 'Log';
        console.log(`${time} [${title}] ${msg}`);
    };

    client.checkPerms = (message) => {
        return (message.member.hasPermission('ADMINISTRATOR') || client.isOwner(message));
    }

    client.isOwner = (message) => {
        return (client.config.owners.includes(message.author.id));
    }

}
