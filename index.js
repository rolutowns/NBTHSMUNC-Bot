const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
//Code starts here
const { strict } = require('assert');
const { exec } = require('child_process');
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const prefix = '!';

const fs = require('fs');
const { userInfo } = require('os');
let directiveCount = 0;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('NBTHSMUNC Bot is online!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const text = message.content.slice(prefix.length);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Hello World!');
	}
	else if (command == 'reactionroles') {
		client.commands.get('reactionroles').execute(message, args, Discord, client);
	}
	else if (command === 'play' || command === 'p') {
		client.commands.get('play').execute(message, args);
	}
	else if (command === 'leave') {
		client.commands.get('leave').execute(message, args);
	}
	else if (command === 'rid') {
		client.commands.get('rid').execute(message, args);
	}
	else if (command === 'reset') {
		directiveCount = 0;
	}
	else{
		message.delete();
		message.channel.send(text);
	}
});
client.on('messageReactionAdd', async (messageReaction, user) => {
	if (messageReaction.message.partial) await messageReaction.message.fetch();
	if (messageReaction.partial) await messageReaction.fetch();
	if (user.bot) return;
	if (!messageReaction.message.guild) return;

	const passingEmoji = '✅';
	const channel = '800916875386159110';
	if (messageReaction.message.channel.id == channel) {
		if (messageReaction.emoji.name == passingEmoji && messageReaction.message.guild.member(user).permissions.has("ADMINISTRATOR")) {
			directiveCount++;
			directiveNumber = '**Directive #' + directiveCount.toString() + '**';
			await client.channels.cache.get('800916875386159111').send(directiveNumber + '\n' + messageReaction.message.content);
			messageReaction.message.delete();
		}
	}
	else if (messageReaction.message.channel.id == '800916875386159111') {
		if (messageReaction.emoji.name == passingEmoji && messageReaction.message.guild.member(user).permissions.has("ADMINISTRATOR")) {
			await client.channels.cache.get('800916875386159112').send(messageReaction.message.content)
			messageReaction.message.delete();
		}
		}
});
client.login('ODAzMDU0OTE1NDYyMTAzMDkw.YA4NKw.bmUIG-YZzbT0PBWU19fxNeqnh8c');