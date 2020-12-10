module.exports = async (client, message) => {

    if (message.author.bot) return;

    if (message.content.indexOf(client.config.dmPrefix) !== 0) return;
    let args = message.content.slice(client.config.dmPrefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (client.config.deleteCommands) await message.delete();
    if (!cmd) return;

    if (!message.guild && !cmd.help.dm) return client.sendEmbed(message.channel, "You may only use that command in servers!");

    if (cmd.help.staff != null) {
        if (!message.member.hasPermission("ADMINISTRATOR") && !client.isOwner(message)) {
            return client.sendErrorEmbed(message.channel, `Missing: ADMINISTRATOR`);
        }
    }

    if (cmd.help.owner != null) {
        if (!client.isOwner(message)) {
            return client.sendErrorEmbed(message.channel, `Missing: OWNER`);
        }
    }

    try {
        cmd.run(client, message, args);
    } catch (e) {
        console.error(e);
        return;
    }

};
