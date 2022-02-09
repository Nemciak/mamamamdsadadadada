const { Collection, Client } = require('discord.js')
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_PRESENCES',
    'GUILD_MEMBERS',
    'DIRECT_MESSAGES'
  ],
  partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE'],
  allowedMentions: {
    parse: ['roles', 'users', 'everyone'],
    repliedUser: true,
  },
})


const mongoose = require('./database/mongoose')
const path = require('path')
const fs = require('fs')

const config = require('./config.json')
module.exports = client


client.commands = new Collection()
client.prefix = config.prefix
client.aliases = new Collection()
client.userSettings = new Collection()


client.categories = fs.readdirSync(path.resolve('src/commands'))
;['command'].forEach(handler => {
  require(path.resolve(`src/handlers/${handler}`))(client)
})


mongoose.init()
client.login(config.token)
