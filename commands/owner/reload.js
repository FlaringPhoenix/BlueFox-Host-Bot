const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

    if (!client.isOwner(message)) { return; }

    let command = args[0];

    if (!command) {return client.sendErrorEmbed(message.channel, 'Please provide a command to reload')}
    if (!client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()))) {return client.sendErrorEmbed(message.channel, 'That is not a command')}

    try {
        client.modules.forEach(c => {
            fs.readdir(`${process.cwd()}/commands/${c}/`, (err, files) => {
                if (err) throw err;

                files.forEach(f => {
                    let commandName = f.split(".")[0];

                    if (commandName === command) {
                        // delete old
                        delete require.cache[require.resolve(`${process.cwd()}/commands/${c}/${commandName}.js`)];
                        client.commands.delete(commandName);

                        // load new
                        const props = require(`${process.cwd()}/commands/${c}/${commandName}.js`);
                        client.commands.set(commandName, props);

                        props.help.aliases.forEach(a => {
                            client.aliases.set(a, props.help.name)
                        });
                    }
                });

            });
        });
    } catch (e) {
        await client.sendEmbed(message.channel, "Error!", "There was an error reloading that command!");
        console.log(e);
        return;
    }

    return client.sendEmbed(message.channel, `"${command}" command has been reloaded!`);

}

module.exports.help = {
    name: "reload",
    description: "Reloads a command",
    dm: true,
    aliases: ["reloadcmd"]
}
