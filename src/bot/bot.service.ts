import { Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { AuthService } from "../auth/auth.service";
import { getAge, getQI, getRandomNumber } from "./utils";

@Injectable()
export class BotService implements OnModuleInit {
  private chatClient;
  private readonly listCmd = [
    "!bot",
    "!cri",
    "!dé",
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

  constructor(private authService: AuthService) {
    const staticAuthProvider = this.authService.getStaticAuthProvider();
    this.chatClient = new ChatClient({ authProvider: staticAuthProvider, channels: ["letetryl"] });
  }

  async postMessage(msg: string) {
    await this.chatClient.say("#letetryl", msg).catch(err => console.error(err));
  }

  async onModuleInit(): Promise<any> {
    await this.chatClient.connect();
    this.chatClient.onMessage(async (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
      if (["!cmd", "!commande", "!commandes"].includes(message.toLowerCase())) {
        await this.chatClient.whisper("Romanus89", "test!!!!").catch(err => console.error(err));

        await this.chatClient
          .say(channel, "Pour votre plus grands plaisirs, voici la liste des commandes : " + this.listCmd.join(", "))
          .catch(err => console.error(err));
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

      if (["!danse", "!dance"].includes(message.toLowerCase())) {
        await this.chatClient.say(
          channel,
          "letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse letetrDanse"
        );
      }
    });
  }
}
