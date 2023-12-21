const fs = require("fs");
const path = require("path");

module.exports = {
  loadEvents: (client) => {
    const eventFiles = fs
      .readdirSync(path.join(__dirname))
      .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(path.join(__dirname, file));
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  },

  loadCommands: (client) => {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "../commands"))
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const cmd = require(path.join(__dirname, "../commands", file));
      client.commands.set(cmd.name, cmd);
    }
  },
};
