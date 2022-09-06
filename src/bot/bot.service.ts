import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { getAge, getQI, getRandomNumber } from "../utils/utils";
import { ConfigurationsService } from "../configuration/configurations.service";

@Injectable()
export class BotService implements OnModuleInit {
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

  private readonly _30_MINUTES_IN_MS = 30 * 60 * 1000;

  constructor(
    @Inject("CHAT_CLIENT") private chatClient: ChatClient,
    private readonly configurationService: ConfigurationsService
  ) {}

  async postMessage(msg: string) {
    await this.chatClient.say("#letetryl", msg).catch(err => console.error(err));
  }

  async onModuleInit(): Promise<any> {
    this.chatClient.onMessage(async (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
      if ((msg.userInfo.isMod || msg.userInfo.isBroadcaster) && message.toLowerCase() === "!onoffcmd") {
        if (this.configurationService.botCommandEnabled) {
          this.configurationService.botCommandEnabled = false;
          await this.chatClient.say(
            channel,
            "Pour les biens de la modérations, les commandes sont désactivés temporairement. Merci de votre compréhension letetrComfy"
          );
        } else {
          this.configurationService.botCommandEnabled = true;
          await this.chatClient.say(channel, "Les commandes sont de nouveaux disponibles letetrDanse letetrDanse");
        }
      }

      if ((msg.userInfo.isMod || msg.userInfo.isBroadcaster) && message.toLowerCase() === "!onoffnotif") {
        if (this.configurationService.eventSubEnabled) {
          this.configurationService.eventSubEnabled = false;
          await this.chatClient.say(
            channel,
            "Pour les biens de la modérations, les notifications de type follow/sub/raid sont désactivés temporairement. Merci de votre compréhension letetrComfy"
          );
        } else {
          this.configurationService.eventSubEnabled = true;
          await this.chatClient.say(channel, "Les notifications sont de nouveaux disponibles letetrDanse letetrDanse");
        }
      }

      if (process.env.EN_DEV) {
        return;
      }

      if (msg.userInfo.isMod && message.toLowerCase() === "!revolution") {
        await this.chatClient.enableFollowersOnly(channel, 0);
        await this.chatClient.enableEmoteOnly(channel);
        await this.chatClient.enableSubsOnly(channel);
        await this.chatClient.enableSlow(channel, 1800);
        await this.chatClient.say(
          channel,
          "Dû à une non rémunération de la modération, une révolution est en cours. Veuillez nous excuser de ces désagréments, mais VIVA LA REVOLUCION ! #MoDons"
        );
      }

      if (!msg.userInfo.isMod && message.toLowerCase() === "!revolution") {
        await this.chatClient.say(channel, "Non, toi, tu n'as pas le droit, c'est reservé aux modos !");
      }

      if ((msg.userInfo.isMod || msg.userInfo.isBroadcaster) && message.toLowerCase() === "!dissolution") {
        await this.chatClient.disableFollowersOnly(channel);
        await this.chatClient.disableEmoteOnly(channel);
        await this.chatClient.disableSubsOnly(channel);
        await this.chatClient.disableSlow(channel);
        await this.chatClient.say(channel, "Nous mettons la révolution en pause... mais attention ! #MoDons");
      }

      /************
       * Début commande public
       **********/
      // TODO Découper code public ailleurs
      if (!this.configurationService.botCommandEnabled) {
        return;
      }

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

      if (message.toLowerCase() === "!photo") {
        await this.chatClient.say(channel, "Moins de tourisme et ➕ de massacre STP letetrHollowGun letetrHollowGun");
      }

      if (message.toLowerCase() === "!sandrine") {
        await this.chatClient.say(
          channel,
          "La météo de la semaine vous est présentée par la merveilleuse Sandrine de la compta 🌞"
        );
      }

      if (message.toLowerCase() === "!bot") {
        await this.chatClient.say(
          channel,
          "Je suis un bot en plein apprentissage ! J'apprends beaucoup tous les jours letetrComfy"
        );
      }

      if (message.toLowerCase() === "!boomer") {
        await this.chatClient.say(channel, "On ne peut plus rien dire 😡");
      }

      if (message.toLowerCase() === "!bug") {
        await this.chatClient.say(
          channel,
          "Chères Gluantes et chers Gluants, votre streamer préféré rencontre quelques problèmes techniques (aucunement dû à un manque de skill). Heureusement, ses capacités hors du commun vont tout régler en un rien de temps. Envoyez vos meilleurs emotes pour l'encourager !!"
          // "Votre attention à tous, chers viewers, le jeu a planté mais votre streamer préféré va rattraper le coup !! :c"
        );
        // ⚠⚠Chères Gluantes et chers Gluants, votre streamer préféré rencontre quelques problèmes techniques (aucunement dû à un manque de skill). Heureusement, ses capacités hors du commun vont tout régler en un rien de temps. Envoyez vos meilleurs emotes pour l'encourager !!
      }

      if (message.toLowerCase() === "!sub") {
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

      if (["!sncf", "!tchoutchou"].includes(message.toLowerCase())) {
        await this.chatClient.say(channel, "letetrAAAH TCHOUTCHOUUUU letetrAAAH");
      }

      if (message.toLowerCase() === "!chaussons") {
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

      // if (message.toLowerCase() === "!zireael") {
      //   await this.chatClient.say(channel, "Nik toi Zireael !");
      // }

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
      }
    });

    this.chatClient.onSub(async (channel, user, subInfo, msg) => {
      await this.chatClient.say(channel, `letetrAAAH letetrAAAH Merci ${user} pour le sub letetrAAAH letetrAAAH`);
    });

    this.messageOnInterval();
  }

  messageOnInterval(): void {
    setInterval(async _ => {
      await this.chatClient.say(
        "#letetryl",
        "Pour prolonger l'aventure, rejoignez les réseaux sociaux du stream : ✨ https://linktr.ee/Tetryl ✨"
      );
    }, this._30_MINUTES_IN_MS);
  }
}
