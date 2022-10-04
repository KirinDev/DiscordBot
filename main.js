const { Client , GatewayIntentBits , EmbedBuilder , AttachmentBuilder } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.GuildMessages , GatewayIntentBits.MessageContent] })

require('dotenv').config();

const prefix = '!'

client.on('ready' , () => {
    console.log('Justin_Memer is online! UwU')
});

const peepo_img = new EmbedBuilder()
.setTitle('Heres your peepo, you faggot!')
.setImage('https://external-preview.redd.it/zvvCdqBth2ZbbQb4Pu0nL75Gvyu9Mlw0zyEysOSKp5U.jpg?auto=webp&s=47bec5664d01524007ceaaeed85653332642a6d1')

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const thicc_images = [
  'thicc1.jpg', 'thicc2.jpg', 'thicc3.jpg', 'thicc4.jpg', 'thicc5.jpg', 'thicc6.jpg', 'thicc7.jpg', 'thicc8.jpg', 'thicc9.jpg', 'thicc10.jpg',
  'thicc11.jpg', 'thicc12.jpg', 'thicc13.jpg', 'thicc14.jpg' , 'thicc15.jpg' , 'thicc16.jpg' , 'thicc17.jpg' , 'thicc18.jpg' , 'thicc19.jpg' , 'thicc20.jpg'
];

const ines_file = new AttachmentBuilder('./img_storage/unknown.png');
const img_Ines = new EmbedBuilder()
    .setImage('attachment://unknown.png')
    .setColor(0x0099ff)
    .setTitle('ofc its <@457225264888283137>')


client.on('messageCreate' , (message) => {
    if( !message.content.startsWith(prefix) || message.author.bot ) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if ( command === 'hey <@1026610058995441764>') {
        message.channel.send('sup bitch!')
    }

    if (message.content.includes('most') && message.content.includes('beautiful') ) {
        message.channel.send({ embeds: [img_Ines] , files: [ines_file]})
    }

    if ( command === 'peepo') {
        message.channel.send({ embeds: [peepo_img] })
    }

    if( command === 'thicc') {
        const randomImage = random(thicc_images);
        const file = new AttachmentBuilder(`./thicc_storage/${randomImage}`);
        const thicc_ani = new EmbedBuilder()
        .setTitle('Daily Dose of Thicc')
        .setImage(`attachment://${randomImage}`)

        message.channel.send({ embeds: [thicc_ani] , files: [file] })
    }
})


client.login(process.env.TOKEN)