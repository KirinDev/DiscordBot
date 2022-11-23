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

            try {
                
                let index;
            for (let i = 0; i < json.data.length; i++) {
             if ( (aniName == json.data[i].attributes.titles.en) || (aniName == json.data[i].attributes.titles.en_jp)
             || (aniName == json.data[i].attributes.canonicalTitle) || (aniName == json.data[i].attributes.titles.en_us)) {
                index = i;
             }  
            }
            console.log(index)
            const ani_info = new EmbedBuilder()
            .setColor('Red')
            .setTitle(json.data[index].attributes.titles.en)
            .setDescription(json.data[index].attributes.synopsis)
            .setImage(json.data[index].attributes.posterImage.large)
            .addFields(
                { name: 'Type' , value: json.data[index].attributes.subtype , inline: true },
                { name: 'Aired' , value: json.data[index].attributes.startDate , inline: true },
                { name: 'Nº Episodes' , value: JSON.stringify(json.data[index].attributes.episodeCount ) , inline: true },
                { name: 'Status' , value: json.data[index].attributes.status , inline: true },
                { name: 'Avg Rating' , value: json.data[index].attributes.averageRating , inline: true },
                { name: 'Rating Rank' , value: JSON.stringify(json.data[index].attributes.ratingRank) , inline: true },
            )

            interaction.reply({ embeds: [ani_info]}); 

            } catch(error) {
                console.error(error);
                interaction.reply('Error 404 : The name provided is not valid :/')
            }
            
        })

        
	},
};