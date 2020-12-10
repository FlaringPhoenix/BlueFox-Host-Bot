module.exports = async (client, oldPresence, newPresence) => {

    let guild = newPresence.guild;
    let member = guild.members.cache.get(newPresence.userID);

    console.log(member.roles.cache)

}
