const Discord = require('discord.js')
const moment = require('moment')
const schema = require('../../database/schemas/Code')
const User = require('../../database/schemas/User')


module.exports = {
  name: 'redeem',
  category: 'Premium',
  description: 'Wpisz kod premium ktory otrzymales.',

  run: async (client, message, args, user, guild) => {
   
   
    user = await User.findOne({
      Id: message.author.id, 
    })

    let code = args[0]

   
    if (!code)
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('0xff0000')
            .setDescription(`**Podaj kod by uzyskac dostep do Premium!**`),
        ],
      })

  
    if (user && user.isPremium) {
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('0xff0000')
            .setDescription(`**> Juz jestes uzytkownikiem premium!**`),
        ],
      })
    }

    
    const premium = await schema.findOne({
      code: code.toUpperCase(),
    })

    
    if (premium) {
      const expires = moment(premium.expiresAt).format(
        'dddd, MMMM Do YYYY HH:mm:ss',
      )

  
      user.isPremium = true
      user.premium.redeemedBy.push(message.author)
      user.premium.redeemedAt = Date.now()
      user.premium.expiresAt = premium.expiresAt
      user.premium.plan = premium.plan

      user = await user.save({ new: true }).catch(() => {})
      client.userSettings.set(message.author.id, user)
      await premium.deleteOne().catch(() => {})

   
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle('Premium Redeemed')
            .setDescription(
              `**Poprawnie uzyles kodu premium!**\n\n\`Twoje Premium wygasnie za: ${expires}\``,
            )
            .setColor('0x5eff00')
            .setTimestamp(),
        ],
      })

      
    } else {
      return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('0xff0000')
            .setDescription(
              `**Posiadasz niepoprawny kod mozesz go zakupic lub dostac za zaproszenia, boosty!**`,
            ),
        ],
      })
    }
  },
}