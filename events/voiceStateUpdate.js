module.exports = async (client, oldMember, newMember) => {

    let guild = newMember.guild;
    if (oldMember.channelID == newMember.channelID) return;

    if (newMember.channelID == "786537577599336460") {
        await guild.channels.create(guild.members.cache.get(newMember.id).user.username, {
            type: "voice",
            parent: "786541102647214111",
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [ "CONNECT", "VIEW_CHANNEL" ]
                },
                {
                    id: newMember.id,
                    allow: [ "SPEAK", "STREAM", "CONNECT", "VIEW_CHANNEL" ]
                }]
        });
        await guild.channels.create(guild.members.cache.get(newMember.id).user.username, {
            type: "text",
            parent: "786541102647214111",
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [ "CONNECT", "VIEW_CHANNEL" ]
                },
                {
                    id: newMember.id,
                    allow: [ "VIEW_CHANNEL" ]
                }]
        })
    }
};
