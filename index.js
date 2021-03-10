function main() {
  try {
    require("dotenv").config();
    const { ChatClient } = require("dank-twitch-irc");
    let channels = [];

    const {
      CHANNEL,
      CHANNELS,
      TWITCH_OAUTH_USERNAME, // this is your account id NOT display name; see https://github.com/robotty/dank-twitch-irc#usage
      TWITCH_OAUTH_PASSWORD, // check out https://twitchapps.com/tmi/ for oauth key
    } = process.env;

    channels = CHANNELS.split(",");
    // debuggin heroko
    console.log(`ENV: ${process.env}`);

    const SOME_EDDIES =
      "moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E  moon2E";
    const ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";
    const SLEEP_MS = 420;

    let client = new ChatClient({
      username: TWITCH_OAUTH_USERNAME,
      password: TWITCH_OAUTH_PASSWORD,
      ignoreUnhandledPromiseRejections: true,
    });

    function getRandomChar() {
      return ALPHANUMERIC.charAt(
        Math.floor(Math.random() * ALPHANUMERIC.length)
      );
    }

    async function sleep(ms = SLEEP_MS) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
      });
    }

    async function run() {
      console.info(`you are joining ${channels.join(", ")} running`);
      while (true) {
        await sleep();
        await Promise.all(
          channels.map(async (chan) => {
            await client.say(chan, `${SOME_EDDIES} ${getRandomChar()}`);
          })
        ).catch((err) => {
          console.log("UNCAUGHT client.say PROMISE EXCEPTION");

          console.error(err);
        });
      }
    }

    client.connect();
    client.on("ready", async () => {
      await client.joinAll(channels);
      await run();
    });

    client.on("closed", async () => {
      console.log('client closed, reconnecting...');
      await client.connect();
    });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  default: main(),
};
