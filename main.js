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