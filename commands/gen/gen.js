const { MessageEmbed } = require('discord.js')
const User = require("../../database/schemas/User");

module.exports = {
  name: 'gen',
  category: 'info',
  description: 'Returns latency and API ping',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */



  run: async (client, message, args, user) => {
    const fs = require("fs")
    const randomNumber = Math.floor(Math.random() * 1) + 1;

    const limitSchema = require("../../database/schemas/limitday");









    if (user && user.isPremium) {

       let data
       try {
        data = await limitSchema.findOne({ userID: message.author.id })
       if (!data) {
        await limitSchema.insertMany([{ userID: message.author.id }])
        }
        } catch (e) {
      console.log(e)
        }

      const user1 = await limitSchema.findOne({ userID: message.author.id })

        await limitSchema.updateOne({ userID: message.author.id }, {
       limit: user1.limit + 1
       })

        const  limit  = await limitSchema.findOne({ userID: message.author.id });

      if (limit >= 8) return console.log('Limit');






      const acc = args[0]

      if (!acc) return message.reply({
        "content": null,
        "embeds": [
          {
            "title": "Error",
            "description": "**Wybierz jakie konto chcesz wygenerowac!**",
            "color": 16711680
          }
        ]
      })



      const channelemb = new MessageEmbed()
        .setColor("#f21a02")
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .addFields({
          name: "Error!", value: "Generowanie kont jest dostepne tylko na: <#941023998102347807>"
        })




      if (!message.channel.id.includes("941023998102347807")) return message.channel.send({ embeds: [channelemb] });

      let path = `./src/accounts/${args[0] + ".txt"}`












      fs.access(path, fs.F_OK, (err) => {
        if (err) {
          return message.channel.send(args[0] + " is not a valid account check stock")
        } else {

          const lines = fs.readFileSync(path).toString().split("\n");
          const x = lines.splice(lines[Math.floor((Math.random() * lines.length))], 1);
          fs.writeFileSync(path, lines.join("\n"), { encoding: "utf-8" })

          const { readFileSync } = require('fs');

          const data = readFileSync(`./src/accounts/${args[0] + ".txt"}`, 'utf-8').split(/\r?\n/g);

          const random = data[Math.floor(Math.random() * data.length - 1)];

          const splitted = `${x}`.split(':');


          message.reply({
            "content": null,
            "embeds": [
              {
                "title": "Account has been genereted",
                "description": "**Check dm!!**",
                "color": 16711680
              }
            ]
          })
          message.author.send({
            "content": null,
            "embeds": [
              {
                "title": "Accounts has been generated!\nAccount Details",
                "description": "**━━━━━━━━━━━━ \n**",
                "color": 16711680,
                "fields": [
                  {
                    "name": `⮚ Type: ${args[0]}\n⮚ Email: ||${splitted[0]}||\n⮚ Password: ||${splitted[1]}||`,
                    "value": "**━━━━━━━━━━━━\n**"
                  },
                  {
                    "name": `Fast copy\n⮛⮛ \n||${x}||`,
                    "value": `**━━━━━━━━━━━━\n⮚ Stock left: **${String(fs.readFileSync(`./src/accounts/${args[0] + ".txt"}`)).split('\n').length}**\n⮚ Generations left: 3/8\n━━━━━━━━━━━━**`
                  }
                ]
              }
            ]
          })









        }


      })

    } else return message.reply({
      "content": null,
      "embeds": [
        {
          "title": "This is premium command!",
          "color": 16121600,
          "fields": [
            {
              "name": "You dont have premium",
              "value": "**To use this command you need premium!!**"
            }
          ]
        }
      ]
    })





  }

}




















