const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const {
	NoSubscriberBehavior,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	entersState,
	AudioPlayerStatus,
	VoiceConnectionStatus,
	joinVoiceChannel,
} = require('@discordjs/voice');

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.GuildVoiceStates
]});

client.on('ready', async () => {
	console.log('Discord.js client is ready!');
	
	let guild = client.guilds.cache.get('XXXXXXXXXXXXXXXXXX');
	const voiceChannel = guild.channels.cache.get('XXXXXXXXXXXXXXXXXX');
	
	function play (voiceChannel) {
		connectToChannel(voiceChannel).then(connection => {			
			const player = createAudioPlayer();
			const resource = createAudioResource( ytdl('https://www.youtube.com/watch?v=PRvOb70lfGs', {quality: "highestaudio", highWaterMark: 1 << 25 }), { inlineVolume: true } );

			player.play(resource);
			connection.subscribe(player);
			
			player.on('error', error => {
				play(voiceChannel);
			});
			
			player.on(AudioPlayerStatus.Idle, () => {
				play(voiceChannel);
			});
		}).catch(err => play(voiceChannel)); 
	}

	play(voiceChannel);
});

void client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
