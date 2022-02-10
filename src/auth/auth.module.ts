import { Module } from "@nestjs/common";
import { ClientCredentialsAuthProvider, StaticAuthProvider } from "@twurple/auth";

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
  imports: [],
  providers: [staticAuthProviderFactory, clientCredentialsAuthProviderFactory],
  exports: ["STATIC_AUTH_PROVIDER", "CLIENT_CREDENTIALS_PROVIDER"],
})
export class AuthModule {}
