import { ChatClient } from "@twurple/chat";
import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RefreshingAuthProvider } from "@twurple/auth";

const chatClientFactory = {
  provide: "CHAT_CLIENT",
  useFactory: async (refreshingAuthProvider: RefreshingAuthProvider) => {
    const chatClient = new ChatClient({
      authProvider: refreshingAuthProvider,
      channels: ["letetryl", "romanus89"],
      logger: {
        minLevel: "DEBUG",
      },
      botLevel: "none",
      isAlwaysMod: true,
    });
    await chatClient.connect();
    chatClient.onConnect(async () => {
      await chatClient.say("#romanus89", "[TEST] Je me réveille *baille*");
    });
    return chatClient;
  },
  inject: ["REFRESH_AUTH_PROVIDER"],
};

@Module({
  imports: [AuthModule],
  providers: [chatClientFactory],
  exports: ["CHAT_CLIENT"],
})
export class ChatClientModule {}
