import { AuthService } from "../auth/auth.service";
import { ChatClient } from "@twurple/chat";
import { Module } from "@nestjs/common";

const chatClientFactory = {
  provide: "CHAT_CLIENT",
  useFactory: async (authService: AuthService) => {
    const staticAuthProvider = authService.getStaticAuthProvider();
    const chatClient1 = new ChatClient({ authProvider: staticAuthProvider, channels: ["letetryl", "romanus89"] });
    await chatClient1.connect();
    chatClient1.onConnect(async () => {
      await chatClient1.say("#letetryl", "[TEST] Je me réveille *baille*");
    });
    return chatClient1;
  },
  inject: [AuthService],
};

@Module({
  providers: [AuthService, chatClientFactory],
  exports: ["CHAT_CLIENT"],
})
export class ChatClientModule {}
