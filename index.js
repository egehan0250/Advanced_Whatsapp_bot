const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
global.path = require("path");
global.fs = require("fs");
global.chalk = require("chalk");
global.moment = require("moment");
moment.locale("tr");
global.config = require("./config");
const Loader = require("./src/events/commandHandler");

let sessionData;

const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  session: sessionData,
  authStrategy: new LocalAuth(),
});

client.commands = new Map();

Loader.loadEvents(client);
Loader.loadCommands(client);

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", async (message) => {
  if (
    !config.prefix.some((prefix) => message.body.startsWith(prefix)) ||
    message.from.endsWith("@g.us")
  )
    return;

  const args = message.body.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) {
    client.commands.get(command).execute(message, args);
  }
});

client.on("authenticated", (session) => {
  sessionData = session;
});

client.initialize();
