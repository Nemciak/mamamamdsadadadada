const client = require("../index")

const User = require("../database/schemas/User");

client.on("ready", async () => {
  console.log(`Our cool Bot is now online!`);
  

  const users = await User.find();
  for (let user of users) {
    client.userSettings.set(user.Id, user);
  }


  require("../handlers/premium")(client);
})
