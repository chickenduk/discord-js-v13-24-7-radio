const Discord = require('discord.js')
const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
const play = require('play-dl')
const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildVoiceStates
]});

client.on('ready', async () => {
		function radiostream () {
			let guild = client.guilds.cache.get('XXXXXXXXXXXXXXXXXX');
			const voiceChannel = guild.channels.cache.get('XXXXXXXXXXXXXXXXXX');

			const connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			})

			let stream = await play.stream('https://www.youtube.com/watch?v=XXXXXXXXXXX')

			let resource = createAudioResource(stream.stream, {
				inputType: stream.type
			})

			let player = createAudioPlayer()

			player.play(resource)

			player.on('error', error => {
				radiostream();
			});

			player.on(AudioPlayerStatus.Idle, () => {
				radiostream();
			});

			connection.subscribe(player)

			connection.on('stateChange', (old_state, new_state) => {
				if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
					connection.configureNetworking();
				}
			})
		}

		radiostream();
})

client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
