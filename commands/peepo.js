const { SlashCommandBuilder , EmbedBuilder , AttachmentBuilder } = require('discord.js');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const peepo_images = [
    'peepo1.jpg' , 'peepo2.jfif' , 'peepo3.jpeg' , 'peepo4.jpeg' , 'peepo5.jpg' , 'peepo6.jpg' , 'peepo7.jpg' , 'peepo8.png' , 'peepo9.png' ,
    'peepo10.png' , 'peepo11.jpg' , 'peepo12.png' , 'peepo13.png' , 'peepo14.png' , 'peepo15.png' , 'peepo16.png' , 'peepo17.jpg' , 'peepo18.png' , 'peepo19.jpg' , 'peepo20.jpg' ,
]

module.exports = {
	data: new SlashCommandBuilder()
    .setName('peepo')
    .setDescription('Provides a rare peepo pic.'),
	async execute(interaction) {
		const randomImage = random(peepo_images);
        const file = new AttachmentBuilder(`./img_storage/${randomImage}`);
        const peepo_img = new EmbedBuilder()
        .setTitle('Daily Dose of Peepo')
        .setImage(`attachment://${randomImage}`)
        await interaction.reply({ embeds: [peepo_img] , files: [file] })
	},
};