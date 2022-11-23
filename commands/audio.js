const { SlashCommandBuilder , ChannelType, EmbedBuilder } = require('discord.js');
const {  createAudioPlayer, createAudioResource , joinVoiceChannel , VoiceConnectionStatus , 
    entersState, VoiceConnection , StreamType , demuxProbe , NoSubscriberBehavior, AudioPlayerStatus, AudioPlayer} = require('@discordjs/voice');
const play = require('play-dl');
const { video_basic_info, stream } = require('play-dl');

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

        let yt_info = await play.video_info(link)

        const info_music =  new EmbedBuilder()
        .setColor('Blue')
        .setAuthor(
            { name: 'DJ Kirin' , iconURL: 'https://i.pinimg.com/474x/b6/26/35/b62635fceec24a26c1d0aa6806c6467e.jpg'})
        .setTitle('NOW PLAYING:')
        .setImage(yt_info.video_details.thumbnails.at(yt_info.video_details.thumbnails.length - 1).url)
        .addFields(
            { name: 'Title' , value: yt_info.video_details.title },
            { name: 'Channel' , value: yt_info.video_details.channel.name },
            { name: 'Duration', value: yt_info.video_details.durationRaw },
            );

        await interaction.reply({ embeds : [info_music]});    

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

