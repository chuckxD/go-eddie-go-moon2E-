function main() {
  try {
    require("dotenv").config();
    const { ChatClient } = require("dank-twitch-irc");

    const {
      CHANNEL,
      TWITCH_OAUTH_USERNAME, // this is your account id NOT display name; see https://github.com/robotty/dank-twitch-irc#usage
      TWITCH_OAUTH_PASSWORD, // check out https://twitchapps.com/tmi/ for oauth key
    } = process.env;

    const SOME_EDDIES =
      "moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E moon2E";
    const ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";
    const SLEEP_MS = 420;

    let client = new ChatClient({
      username: TWITCH_OAUTH_USERNAME,
      password: TWITCH_OAUTH_PASSWORD,
      ignoreUnhandledPromiseRejections: true,
    });
    client.connect();
    client.join(CHANNEL);

    function getRandomChar(str) {
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
      console.info(`running eddie on ${CHANNEL}...`);
      while (true) {
        await sleep();
        client.say(CHANNEL, `${SOME_EDDIES} ${getRandomChar()}`);
      }
    }

    run();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  default: main(),
};
