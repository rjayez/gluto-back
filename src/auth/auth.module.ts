import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { StaticAuthProvider } from "@twurple/auth";

const staticAuthProviderFactory = {
  provide: "STATIC_AUTH_PROVIDER",
  useFactory: () => {
    const clientId = process.env.CLIENT_ID;
    const botToken = process.env.BOT_OAUTH_TOKEN;
    return new StaticAuthProvider(clientId, botToken);
  },
};

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, staticAuthProviderFactory],
  exports: ["STATIC_AUTH_PROVIDER"],
})
export class AuthModule {}
