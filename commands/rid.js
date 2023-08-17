module.exports = {
    name: 'rid',
    description: "Gets rid of messages",
    async execute(message, args) {
        if (!args[0]) return message.channel.send('Please specify the number of messages');
        if (isNaN(args[0])) return message.channel.send('That isn\'t a number');
        if (args[0]>100 || args[0]<2) return message.channel.send('Must be between 2 and 100');

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    }
}