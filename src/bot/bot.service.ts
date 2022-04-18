import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { getAge, getQI, getRandomNumber } from "./utils";
import { ConnectionAdapter, EnvPortAdapter, EventSubListener } from "@twurple/eventsub";
import { ApiClient } from "@twurple/api";
import { LE_TETRYL_ID } from "../constants";
import { ClientCredentialsAuthProvider } from "@twurple/auth";

@Injectable()
export class BotService implements OnModuleInit {
  private listener: EventSubListener;
  private readonly listCmd = [
    "!bot",
    "!cri",
    "!dé",
    "!site",
    "!chaise",
    "!banc",
    "!fada",
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

  constructor(
    @Inject("CHAT_CLIENT") private chatClient: ChatClient,
    @Inject("CLIENT_CREDENTIALS_PROVIDER") private clientCredentialsAuthProvider: ClientCredentialsAuthProvider
  ) {
    const apiClient = new ApiClient({ authProvider: this.clientCredentialsAuthProvider });
    const adapter: ConnectionAdapter = new EnvPortAdapter({
      hostName: "localhost:5000",
    });
    this.listener = new EventSubListener({ apiClient, adapter: adapter, secret: process.env.TWITCH_EVENTSUB_SECRET });
  }

  async postMessage(msg: string): Promise<void> {
    await this.chatClient.say("#letetryl", msg).catch(err => console.error(err));
  }

  async onModuleInit(): Promise<void> {
    // pour éviter les doubles messages en live
    return;

    await this.chatClient.say("#letetryl", "Je me réveille zzzZZZ");

    this.listener.subscribeToChannelFollowEvents(LE_TETRYL_ID, event => {
      this.chatClient.say("#letetryl", "C'est le follow ! letetrBienvenue letetrBienvenue ");
    });

    this.chatClient.onSub(async (channel, user) => {
      await this.chatClient.say(channel, "Test sub event");
    });

    this.chatClient.onMessage(async (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
      if (process.env.EN_DEV) {
        return;
      }

      if (["!cmd", "!commande", "!commandes"].includes(message.toLowerCase())) {
        await this.chatClient.whisper("Romanus89", "test!!!!").catch(err => console.error(err));

        await this.chatClient
          .say(channel, "Pour votre plus grands plaisirs, voici la liste des commandes : " + this.listCmd.join(", "))
          .catch(err => console.error(err));
      }

      if (message.toLowerCase() === "!site") {
        await this.chatClient.say(channel, "Le site flamboyant : 🔥 https://tetryl.stream 🔥");
      }

      if (["!dé", "!dés", "!dé6"].includes(message.toLowerCase())) {
        await this.chatClient
          .say(channel, `Je lance un dé et... ${getRandomNumber(1, 6)} !`)
          .catch(err => console.error(err));
      }

      if (message.toLowerCase() === "!test") {
        console.log("tags", user);
      }

      if (message.toLowerCase() === "!bot") {
        await this.chatClient.say(
          channel,
          "Je suis un bot en plein apprentissage ! J'apprends beaucoup tous les jours letetrComfy"
        );
      }

      if (message.toLowerCase() === "!cri") {
        await this.chatClient.say(channel, "Bouh !");
      }

      if (message.toLowerCase() === "!chaise") {
        await this.chatClient.say(channel, "C'EST UNE CHAISE, BORDEL !");
      }

      if (message.toLowerCase() === "!banc") {
        await this.chatClient.say(channel, "C'EST UN BANC, BORDEL !");
      }

      if (message.toLowerCase() === "!fada") {
        await this.chatClient.say(channel, "Tetryl, tyé fada, couillon !");
      }

      if (message.toLowerCase() === "!romanusdodo") {
        await this.chatClient.say(channel, "J'ai pas assez dormi !");
      }

      if (message.toLowerCase() === "!zireael") {
        await this.chatClient.say(channel, "Nik toi Zireael !");
      }

      if (message.toLowerCase() === "!romanus") {
        await this.chatClient.say(channel, "Pas touche à Romanus !");
      }

      if (message.toLowerCase() === "!nik") {
        await this.chatClient.say(channel, `Nique toi ${user} !`);
      }

      if (message.toLowerCase() === "!frites") {
        await this.chatClient.say(channel, `C'est l'heure des frites !`);
      }

      if (message.toLowerCase() === "!kebab") {
        await this.chatClient.say(channel, `C'est l'heure du kebab ! (sauce samouraî)`);
      }

      if (message.toLowerCase() === "!joue") {
        await this.chatClient.say(channel, `Tais-toi et joue !`);
      }

      if (message.toLowerCase() === "!digestif") {
        await this.chatClient.say(channel, `Je vous conseille la Menthe Pastille, c'est fait par un pharmacien !`);
      }

      if (message.toLowerCase() === "!idiot") {
        await this.chatClient.say(channel, "Tyé fada !");
      }

      if (message.toLowerCase() === "!qi") {
        await this.chatClient.say(channel, `${user}, tu as un QI de ${getQI()} !`);
      }

      if (message.toLowerCase() === "!age") {
        await this.chatClient.say(channel, `${user}, tu as ${getAge()}`);
      }

      if (message.toLowerCase() === "!bisou" || message.toLowerCase() === "!bisous") {
        await this.chatClient.say(channel, "<3 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 ❤️ <3 🧡 💛 💚 💙 💜 🤎 🖤 🤍 <3");
      }

      if (message.toLowerCase() === "!site") {
        await this.chatClient.say(channel, "Le site flamboyant : 🔥 https://tetryl.stream 🔥");
      }

      if (message.toLowerCase() === "!planning") {
        await this.chatClient.say(channel, "Retrouvez le ici => https://tetryl.stream/planning ");
      }

      if (["!danse", "!dance"].includes(message.toLowerCase())) {
        await this.chatClient.say(
          channel,
          "letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse"
        );
      }
    });

    this.chatClient.onSub(async (channel, user, subInfo, msg) => {
      await this.chatClient.say(channel, `letetrAAAH letetrAAAH Merci ${user} pour le sub letetrAAAH letetrAAAH`);
    });
  }
}
