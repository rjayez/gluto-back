import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";
import { ConfigurationsService } from "../configuration/configurations.service";
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { getAge, getQI, getRandomNumber } from "../utils/utils";

@Injectable()
export class BotCommandPublicService implements OnModuleInit {
  private readonly listCmd = [
    "!bot",
    "!bonapp",
    "!bug",
    "!cri",
    "!dé",
    "!dance",
    "!site",
    "!planning",
    "!chaise",
    "!banc",
    "!fada",
    "!romanusdodo",
    "!tchoutchou",
    "!romanus",
    "!nik",
    "!frites",
    "!joue",
    "!digestif",
    "!idiot",
    "!qi",
    "!age",
    "!bisous",
    "!chaussons",
    "!sandrine",
    "!pelle",
  ];

  constructor(
    @Inject("CHAT_CLIENT") private chatClient: ChatClient,
    private readonly configurationService: ConfigurationsService
  ) {}

  onModuleInit(): any {
    this.chatClient.onMessage(async (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
      /** Commande public **/

      if (process.env.EN_DEV) {
        return;
      }

      if (!this.configurationService.botCommandEnabled) {
        return;
      }

      if (["!cmd", "!commande", "!commandes"].includes(message.toLowerCase())) {
        await this.chatClient
          .say(channel, "Pour votre plus grands plaisirs, voici la liste des commandes : " + this.listCmd.join(", "))
          .catch(err => console.error(err));
      }

      if (["!dé", "!dés", "!dé6"].includes(message.toLowerCase())) {
        await this.chatClient
          .say(channel, `Je lance un dé et... ${getRandomNumber(1, 6)} !`)
          .catch(err => console.error(err));
      }

      if (BotCommandPublicService.checkCommand("!photo", message)) {
        await this.chatClient.say(channel, "Moins de tourisme et ➕ de massacre STP letetrHollowGun letetrHollowGun");
      }

      if (BotCommandPublicService.checkCommand("!sandrine", message)) {
        await this.chatClient.say(
          channel,
          "La météo de la semaine vous est présentée par la merveilleuse Sandrine de la compta 🌞"
        );
      }

      if (BotCommandPublicService.checkCommand("!bot", message)) {
        await this.chatClient.say(
          channel,
          "Je suis un bot en plein apprentissage ! J'apprends beaucoup tous les jours letetrComfy"
        );
      }

      if (BotCommandPublicService.checkCommand("!boomer", message)) {
        await this.chatClient.say(channel, "On ne peut plus rien dire 😡");
      }

      if (BotCommandPublicService.checkCommand("!bug", message)) {
        await this.chatClient.say(
          channel,
          "Chères Gluantes et chers Gluants, votre streamer préféré rencontre quelques problèmes techniques (aucunement dû à un manque de skill). Heureusement, ses capacités hors du commun vont tout régler en un rien de temps. Envoyez vos meilleurs emotes pour l'encourager !!"
          // "Votre attention à tous, chers viewers, le jeu a planté mais votre streamer préféré va rattraper le coup !! :c"
        );
      }

      if (BotCommandPublicService.checkCommand("!sub", message)) {
        await this.chatClient.say(channel, "SwiftRage F'ÎLE LES SUBS SwiftRage");
      }

      if (message.toLowerCase().includes("papa")) {
        const messages = [
          "Il est revenu ??! 😭",
          "Papa ?!! Je peux avoir une clope maintenant ?",
          "Il est parti chercher du lait",
        ];
        await this.chatClient.say(channel, messages[getRandomNumber(0, messages.length - 1)]);
      }

      if (message.toLowerCase().startsWith("!pelle")) {
        const split = message.split("!pelle");
        const messageArg = split[1].trim();
        if (messageArg === "") {
          await this.chatClient.say(channel, "/me Pelle met un coup de pelle dans le tchat.");
        } else {
          await this.chatClient.say(channel, `/me Pelle met un coup de pelle à ${messageArg}.`);
        }
      }

      if (message.toLowerCase().startsWith("!narasoin")) {
        const split = message.split("!narasoin");
        const messageArg = split[1].trim();
        if (messageArg === "") {
          await this.chatClient.say(
            channel,
            `/me Envoie une potion de soin au pif, qui redonne ${getRandomNumber(0, 250)}% de ses PV !`
          );
        } else {
          await this.chatClient.say(
            channel,
            `/me Envoie une potion de soin sur ${messageArg}, qui a repris ${getRandomNumber(0, 250)}% de ses PV !`
          );
        }
      }

      if (["!sncf", "!tchoutchou"].includes(message.toLowerCase())) {
        await this.chatClient.say(channel, "letetrAAAH TCHOUTCHOUUUU letetrAAAH");
      }

      if (BotCommandPublicService.checkCommand("!chaussons", message)) {
        await this.chatClient.say(
          channel,
          `/me apporte ses chaussons à ${user}, et un bon chocolat chaud. Profites bien du spectacle ! letetrComfy`
        );
      }

      if (message.toLowerCase() === "!cri") {
        await this.chatClient.say(channel, "Bouh !");
      }

      if (["!ffz", "!frankerfacez"].includes(message.toLowerCase())) {
        await this.chatClient.say(
          channel,
          `Si vous ne voyez pas cette émote => slimeW <= Alors vous avez besoin de télécharger l'extension https://www.frankerfacez.com`
        );
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

      if (message.toLowerCase() === "!bonapp") {
        await this.chatClient.say(
          channel,
          ["Bon appétit ChefFrank", "Bon appétit, reviens-nous garni Jebasted Jebasted Jebasted"][getRandomNumber(0, 1)]
        );
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

      if (message.toLowerCase().startsWith("!bisous")) {
        const split = message.split("!bisous");
        const messageArg = split[1].trim();
        await this.chatClient.say(
          channel,
          `<3 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 ❤️ <3 🧡 💛 💚 💙 💜 🤎 🖤 🤍 <3 ${messageArg}`
        );
      } else if (message.toLowerCase().startsWith("!bisou")) {
        const split = message.split("!bisou");
        const messageArg = split[1].trim();
        await this.chatClient.say(
          channel,
          `<3 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 ❤️ <3 🧡 💛 💚 💙 💜 🤎 🖤 🤍 <3 ${messageArg}`
        );
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

        // if (message.toLowerCase() === "!zireael") {
        //   await this.chatClient.say(channel, "Nik toi Zireael !");
        // }
      }
    });
  }

  private static checkCommand(commande: string, message: string): boolean {
    return message.toLowerCase() === commande;
  }
}
