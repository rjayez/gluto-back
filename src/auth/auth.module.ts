import { Module } from "@nestjs/common";
import { ClientCredentialsAuthProvider, StaticAuthProvider } from "@twurple/auth";
import { AuthController } from "./auth.controller";
import { TwitchStrategy } from "./twitch.strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";

const staticAuthProviderFactory = {
  provide: "STATIC_AUTH_PROVIDER",
  useFactory: () => {
    const clientId = process.env.CLIENT_ID;
    const botToken = process.env.BOT_OAUTH_TOKEN;
    return new StaticAuthProvider(clientId, botToken);
  },
};

const clientCredentialsAuthProviderFactory = {
  provide: "CLIENT_CREDENTIALS_PROVIDER",
  useFactory: () => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    return new ClientCredentialsAuthProvider(clientId, clientSecret);
  },
};

@Module({
  imports: [PassportModule.register({}), UsersModule],
  providers: [TwitchStrategy, staticAuthProviderFactory, clientCredentialsAuthProviderFactory, AuthService],
  exports: ["STATIC_AUTH_PROVIDER", "CLIENT_CREDENTIALS_PROVIDER"],
  controllers: [AuthController],
})
export class AuthModule {}
