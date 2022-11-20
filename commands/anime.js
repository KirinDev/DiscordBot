const { SlashCommandBuilder , EmbedBuilder , AttachmentBuilder } = require('discord.js');
const { config } = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Provides info about the anime.')
        .addStringOption(option => option.setRequired(true).setName('name').setDescription('name of the anime')),
	async execute(interaction) {
        
        const ani_info = new EmbedBuilder()
        const aniName = interaction.options.getString('name');
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${aniName}`;

        const headers = {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }

        fetch( url ,  { method: 'GET' , headers: headers }).then( (res) => {
            return res.json()
        }).then( (json)  => {
            const ani_info = new EmbedBuilder()
            .setColor('Red')
            .setTitle(json.data[0].attributes.titles.en)
            .setDescription(json.data[0].attributes.synopsis)
            .setImage(json.data[0].attributes.posterImage.large)
            .addFields(
                { name: 'Type' , value: json.data[0].attributes.subtype , inline: true },
                { name: 'Aired' , value: json.data[0].attributes.startDate , inline: true },
                { name: 'Nº Episodes' , value: JSON.stringify(json.data[0].attributes.episodeCount ) , inline: true },
                { name: 'Status' , value: json.data[0].attributes.status , inline: true },
                { name: 'Avg Rating' , value: json.data[0].attributes.averageRating , inline: true },
                { name: 'Rating Rank' , value: JSON.stringify(json.data[0].attributes.ratingRank) , inline: true },
            )

            interaction.reply({ embeds: [ani_info]}); 
        })

        
	},
};