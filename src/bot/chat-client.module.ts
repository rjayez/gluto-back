import { ChatClient } from "@twurple/chat";
import { Module } from "@nestjs/common";
import { StaticAuthProvider } from "@twurple/auth";

const chatClientFactory = {
  provide: "CHAT_CLIENT",
  useFactory: async () => {
    const clientId = process.env.CLIENT_ID;
    const botToken = process.env.BOT_OAUTH_TOKEN;
    const staticAuthProvider = new StaticAuthProvider(clientId, botToken);
    const chatClient1 = new ChatClient({ authProvider: staticAuthProvider, channels: ["letetryl", "romanus89"] });
    await chatClient1.connect();
    chatClient1.onConnect(async () => {
      await chatClient1.say("#letetryl", "[TEST] Je me réveille *baille*");
    });
    return chatClient1;
  },
};

@Module({
  imports: [],
  providers: [chatClientFactory],
  exports: ["CHAT_CLIENT"],
})
export class ChatClientModule {}
