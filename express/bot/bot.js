const tmi = require("tmi.js");
require("dotenv").config();

const client = new tmi.Client({
  connection: {
    reconnect: true,
  },
  identity: {
    username: "GlutoBot",
    password: `oauth:${process.env.BOT_OAUTH_TOKEN}`,
  },
  channels: ["letetryl", "romanus89"],
});

client.on("message", async (channel, context, message) => {
  // console.log('channel', {
  //     channel,
  //     user: context.username,
  //     message
  // });
});

/**
 * Random inclusive
 * @param start
 * @param end
 * @returns {number}
 */
function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

// QI entre -100 et 250
function getQI() {
  return Math.floor(Math.random() * 351 - 100);
}

// AGE entre 0 et 120.
function getAge() {
  const age = Math.floor(Math.random() * 121);
  if (age === 1 || age === 0) {
    return `${age} an.`;
  }
  return `${age} ans.`;
}

const listCmd = [
  "!bot",
  "!cri",
  "!dé",
  "!chaise",
  "!banc",
  "!debile",
  "!romanusdodo",
  "!zireael",
  "!romanus",
  "!nik",
  "!frites",
  "!joue",
  "!digestif",
  "!idiot",
  "!qi",
  "!age",
  "!bisou",
];

client.on("message", async (channel, tags, message, self) => {
  if (["!cmd", "!commande", "!commandes"].includes(message.toLowerCase())) {
    // await client
    //   .whisper("letetryl", "Pour votre plus grands plaisirs, voici la liste des commandes : " + listCmd.join(", "))
    //   .catch(err => console.error(err));

    await client
      .say(channel, "Pour votre plus grands plaisirs, voici la liste des commandes : " + listCmd.join(", "))
      .catch(err => console.error(err));
  }

  if (["!dé", "!dés", "!dé6"].includes(message.toLowerCase())) {
    await client.say(channel, `Je lance un dé et... ${getRandomNumber(1, 6)} !`).catch(err => console.error(err));
  }

  if (message.toLowerCase() === "!test") {
    console.log("tags", tags);
  }

  if (message.toLowerCase() === "!bot") {
    await client.say(channel, "C'est un bot en plein apprentissage !");
  }

  if (message.toLowerCase() === "!cri") {
    await client.say(channel, "Bouh !");
  }

  if (message.toLowerCase() === "!chaise") {
    await client.say(channel, "C'EST UNE CHAISE, BORDEL !");
  }

  if (message.toLowerCase() === "!banc") {
    await client.say(channel, "C'EST UN BANC, BORDEL !");
  }

  if (message.toLowerCase() === "!debile") {
    await client.say(channel, "Tetryl, tyé fada, couillon !");
  }

  if (message.toLowerCase() === "!romanusdodo") {
    await client.say(channel, "J'ai pas assez dormi !");
  }

  if (message.toLowerCase() === "!zireael") {
    await client.say(channel, "Nik toi Zireael !");
  }

  if (message.toLowerCase() === "!romanus") {
    await client.say(channel, "Pas touche à Romanus !");
  }

  if (message.toLowerCase() === "!nik") {
    await client.say(channel, `Nique toi ${tags?.["display-name"]} !`);
  }

  if (message.toLowerCase() === "!frites") {
    await client.say(channel, `C'est l'heure des frites !`);
  }

  if (message.toLowerCase() === "!joue") {
    await client.say(channel, `Tais-toi et joue !`);
  }

  if (message.toLowerCase() === "!digestif") {
    await client.say(channel, `Je vous conseille la Menthe Pastille, c'est fait par un pharmacien !`);
  }

  if (message.toLowerCase() === "!idiot") {
    await client.say(channel, "Tyé fada !");
  }

  if (message.toLowerCase() === "!qi") {
    await client.say(channel, `${tags?.["display-name"]}, tu as un QI de ${getQI()} !`);
  }

  if (message.toLowerCase() === "!age") {
    await client.say(channel, `${tags?.["display-name"]}, tu as ${getAge()}`);
  }

  if (message.toLowerCase() === "!bisou" || message.toLowerCase() === "!bisous") {
    await client.say(channel, "<3 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 ❤️ <3 🧡 💛 💚 💙 💜 🤎 🖤 🤍 <3");
  }
});

module.exports = client;
