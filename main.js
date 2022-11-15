const { Client , GatewayIntentBits , EmbedBuilder , AttachmentBuilder , ActivityType , Collection , Events } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.GuildMessages , GatewayIntentBits.MessageContent , GatewayIntentBits.GuildVoiceStates] })
const {  createAudioPlayer, createAudioResource , joinVoiceChannel , VoiceConnectionStatus , 
    entersState, VoiceConnection , StreamType , demuxProbe , NoSubscriberBehavior, AudioPlayerStatus, AudioPlayer} = require('@discordjs/voice');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const prefix = '/'

client.on('ready' , () => {
    console.log('Justin_Memer is online! UwU');

    client.user.setActivity("Sussy Amongus >_<" , {
        type : ActivityType.Playing 
    });
});

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

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if ( message.content.includes('hey') && message.content.includes('bot')) {
        message.channel.send('sup cutie!')
    }

    if (message.content.includes('most') && message.content.includes('beautiful') ) {
        message.channel.send('ofc its <@457225264888283137>')
        message.channel.send({ embeds: [img_Ines] })
    }

    if(message.content.includes('love') && message.content.includes('furry') && message.content.includes('porn')) {
        message.channel.send('STOP RIGHT THERE YOU CRIMINAL SCUM <@' + message.author.id + '>, YOU VIOLATED THE LAW!!! >_<')
        message.channel.send({ embeds: [img_law] })
    }

    if(command === 'jamcat') {
        for (let i = 0; i < 5; i++) {
            message.channel.send({ embeds: [gif_jam] })
        }
    }
})


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
        await command.execute(interaction);
        
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



client.login(process.env.TOKEN)