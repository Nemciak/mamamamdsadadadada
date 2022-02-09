const { MessageEmbed } = require("discord.js")
const fs = require("fs")

module.exports = {
  name : 'stock',
  category : 'info',
  description : 'Returns latency and API ping',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */




  run: async(client, message, args, user) => {

    const path = `./src/accounts/${args[0]+".txt"}`

    const stock = args[0]

    if (!stock) return message.reply("Napisz jakie konta chcesz sprawdzic!")





      fs.access(path, fs.F_OK, (err) => {
        if (err) {
          const stockemb1 = new MessageEmbed()
          .setColor("f21a02")
          .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
          .addFields({
            name: "Sorry!", value: `**Nie posiadamy "${args[0]}" w magazynie!** `
          })
    
          return message.reply({embeds: [stockemb1]})
        }

        const stockemb2 = new MessageEmbed()
        .setColor("#2ECC71")
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .addFields({
          name: "Na te chwile", posiadamy: `**${String(fs.readFileSync(`./src/accounts/${args[0]+".txt"}`)).split('\n').length}  kont ${args[0]}!**`
        })
  
      
        message.reply({embeds: [stockemb2]})
      })


    

      
      

    





      





{}

















  }
}