require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const { DISC_TOKEN } = process.env

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('ready', () => {
    console.log(`Logado como ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!oldState.selfMute && newState.selfMute || (!oldState.channelId && newState.selfMute)) {
        newState.member.voice.disconnect("Você mutou o microfone!");
    }
});

client.login(DISC_TOKEN);