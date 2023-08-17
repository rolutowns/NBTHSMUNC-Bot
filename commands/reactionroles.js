module.exports = {
	name: 'reactionroles',
	description: "Sets up reaction role message",
	async execute(message, args, Discord, client) {
		const channel = '802224942338408472';
		const disecRole = message.guild.roles.cache.find(role => role.name === "DISEC");
		const specpolRole = message.guild.roles.cache.find(role => role.name === "SPECPOL");
		const unodcRole = message.guild.roles.cache.find(role => role.name === "CND");

		const disecEmoji = client.emojis.cache.get("802230969003278376");
		const specpolEmoji = client.emojis.cache.get("802230968878497832");
		const unodcEmoji = client.emojis.cache.get("802230968877973584");

		let embed = new Discord.MessageEmbed()
			.setColor('#000080')
			.setTitle('Select the Committee you are participating in')
			.setDescription('Reacting to the emoji with your committee will grant you access to see the specific channels related to that committee!\n\n'
				+ `${disecEmoji} for DISEC\n`
				+ `${specpolEmoji} for SPECPOL\n`
				+ `${unodcEmoji} for CND(UNODC)\n`);

		let messageEmbed = await message.channel.send(embed);
		messageEmbed.react(disecEmoji);
		messageEmbed.react(specpolEmoji);
		messageEmbed.react(unodcEmoji);

		client.on('messageReactionAdd', async (reaction, user) => {
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;
			if (reaction.message.guild.member(user).roles.cache.has(disecRole.id) || reaction.message.guild.member(user).roles.cache.has(specpolRole.id) || reaction.message.guild.member(user).roles.cache.has(unodcRole.id)) return;

			
				if (reaction.emoji === disecEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(disecRole);
				}
				if (reaction.emoji === specpolEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(specpolRole);
				}
				if (reaction.emoji === unodcEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(unodcRole);
				}
				else {
					return;
				}

			
		});
		client.on('messageReactionRemove', async (reaction, user) => {
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;

			
				if (reaction.emoji === disecEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(disecRole);
				}
				if (reaction.emoji === specpolEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(specpolRole);
				}
				if (reaction.emoji === unodcEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(unodcRole);
				}
				else {
					return;
				}

			
		});
	}
}