const { SlashCommandBuilder , EmbedBuilder , AttachmentBuilder } = require('discord.js');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const thicc_images = [
  'thicc1.jpg', 'thicc2.jpg', 'thicc3.jpg', 'thicc4.jpg', 'thicc5.jpg', 'thicc6.jpg', 'thicc9.jpg', 'thicc10.jpg',
  'thicc11.jpg', 'thicc12.jpg', 'thicc13.jpg', 'thicc14.jpg' , 'thicc15.jpg' , 'thicc16.jpg' , 'thicc17.jpg' , 'thicc18.jpg' , 'thicc19.jpg' , 'thicc20.jpg'
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thicc')
		.setDescription('Provides thicc anime girl.'),
    
	async execute(interaction) {
		const randomImage = random(thicc_images);
        const file = new AttachmentBuilder(`./thicc_storage/${randomImage}`);
        const thicc_ani = new EmbedBuilder()
        .setTitle('Daily Dose of Thicc')
        .setImage(`attachment://${randomImage}`)
        await interaction.reply({ embeds: [thicc_ani] , files: [file] })
	},
};

