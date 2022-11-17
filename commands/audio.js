const { SlashCommandBuilder , ChannelType } = require('discord.js');
const {  createAudioPlayer, createAudioResource , joinVoiceChannel , VoiceConnectionStatus , 
    entersState, VoiceConnection , StreamType , demuxProbe , NoSubscriberBehavior, AudioPlayerStatus, AudioPlayer} = require('@discordjs/voice');
const play = require('play-dl')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays the audio from the link provided.')
        .addStringOption(option => option.setName('input').setDescription('link you wich to play'))
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('choose the channel')
            .addChannelTypes(ChannelType.GuildVoice)),

	async execute(interaction) {
		const link = interaction.options.getString('input');
        const voiceChannel = interaction.options.getChannel('channel');
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        let stream = await play.stream(link)
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        
        let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })

        player.play(resource);

        connection.subscribe(player);

        interaction.reply('A wild Botto has spawn...beware!');

        try {
            await entersState(connection,VoiceConnectionStatus.Ready, 30000);
            console.log("Connected")
            return connection;
        }
        catch(error){
            console.log(connection);
            connection.destroy();
            throw error;
        }
        
	},
};

