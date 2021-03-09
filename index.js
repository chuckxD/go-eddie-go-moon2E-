function main() {
  try {
    require("dotenv").config();

    const throng = require("throng");

    const { ChatClient } = require("dank-twitch-irc");
    let channels = [];

    const {
      CHANNEL,
      CHANNELS,
      TWITCH_OAUTH_USERNAME, // this is your account id NOT display name; see https://github.com/robotty/dank-twitch-irc#usage
      TWITCH_OAUTH_PASSWORD, // check out https://twitchapps.com/tmi/ for oauth key
    } = process.env;

    channels = CHANNELS.split(",");

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
    async function master() {
      client.connect();
      client.on("ready", async () => {
        await client.on("closed", async () => {
          await client.joinAll(channels);
          console.info(`joined ${channels.join(", ")} running eddie`);
        });
      });
    };

    async function worker (id, disconnect) {
      console.log(`channel messenger worker online id: ${id}`);
      while (true) {
        await sleep();
        await Promise.all(
          channels.map(async (chan) => {
            await client.say(chan, `${SOME_EDDIES} ${getRandomChar()}`);
          })
        );
      }

      process.on("SIGTERM", () => {
        console.log(`Worker ${id} exiting (cleanup here)`);
        disconnect();
      });
    };

    throng({ master, worker, count: 8 });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  default: main(),
};
