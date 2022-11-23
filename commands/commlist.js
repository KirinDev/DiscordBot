const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List of the main bot commands'),

    async execute(interaction) {
        const comm_lst = new EmbedBuilder()
        .setColor('Gold')
        .setAuthor( { name: 'Kirin' , iconURL: 'https://e7.pngegg.com/pngimages/369/831/png-clipart-shinji-ikari-kaworu-nagisa-neon-genesis-evangelion-rei-ayanami-mug-mug-child-black-hair.png'})
        .setTitle('Kirin Commands List')
        .setDescription('Below is provided a full list of my commands')
        .setThumbnail('https://e7.pngegg.com/pngimages/369/831/png-clipart-shinji-ikari-kaworu-nagisa-neon-genesis-evangelion-rei-ayanami-mug-mug-child-black-hair.png')
        .addFields(
            { name: '/play', value: 'plays the audio of any youtube url' },
            { name: '/anime', value: 'provides information about the anime' },
            { name: '/thicc', value: 'spawns a thicc anime girl pic' },
            { name: '/peepo', value: 'spawns a random peepo pic' },
        )

        await interaction.reply( {embeds : [comm_lst]})
    },
}