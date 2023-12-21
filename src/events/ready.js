module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(
      chalk.greenBright(`[SYSTEM]`),
      chalk.yellowBright(`[BOT]`),
      chalk.blueBright(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`),
      chalk.whiteBright(`Bot is ready!`)
    );
  },
};
