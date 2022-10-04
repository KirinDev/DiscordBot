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
  'thicc1.jpg', 'thicc2.jpg', 'thicc3.jpg', 'thicc4.jpg', 'thicc5.jpg', 'thicc6.jpg', 'thicc9.jpg', 'thicc10.jpg',
  'thicc11.jpg', 'thicc12.jpg', 'thicc13.jpg', 'thicc14.jpg' , 'thicc15.jpg' , 'thicc16.jpg' , 'thicc17.jpg' , 'thicc18.jpg' , 'thicc19.jpg' , 'thicc20.jpg'
];

const img_Ines = new EmbedBuilder()
    .setImage('https://img.ifunny.co/images/d40fc844dc12a249c4410f88e1ce782be25f51ac55f50a8a7d8719e271a4f40b_1.jpg')
    .setColor([71,13,76])

const img_law = new EmbedBuilder()
.setImage('https://modworkshop.net/mydownloads/previews/thumbnail_preview_30010_1481180949_078ec8c3e6aeb8017241afbcf6484dc3.jpg')
.setColor([71,13,76])

const gif_jam = new EmbedBuilder()
.setTitle('Jam Cat')
.setImage('https://media3.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif')
.setColor([71,13,76])
    

client.on('messageCreate' , (message) => {
    if( !message.content.startsWith(prefix) || message.author.bot ) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if ( message.content.includes('hey') && message.content.includes('bot')) {
        message.channel.send('sup bitch!')
    }

    if (message.content.includes('most') && message.content.includes('beautiful') ) {
        message.channel.send('ofc its <@457225264888283137>')
        message.channel.send({ embeds: [img_Ines] })
    }

    if(message.content.includes('love') && message.content.includes('furry') && message.content.includes('porn')) {
        message.channel.send('STOP RIGHT THERE YOU CRIMINAL SCUM <@' + message.author.id + '>, YOU VIOLATED THE LAW!!! >_<')
        message.channel.send({ embeds: [img_law] })
    }

    if ( command === 'peepo') {
        message.channel.send({ embeds: [peepo_img] })
    }

    if(command === 'jamcat') {
        for (let i = 0; i < 5; i++) {
            message.channel.send({ embeds: [gif_jam] })
        }
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