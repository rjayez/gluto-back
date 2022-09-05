import { Module } from "@nestjs/common";
import { AccessToken, RefreshingAuthProvider, StaticAuthProvider } from "@twurple/auth";
import { ConfigurationModule } from "../configuration/configuration.module";
import { AuthService } from "./auth.service";
import { ConfigurationsService } from "../configuration/configurations.service";

const staticAuthProviderFactory = {
  provide: "STATIC_AUTH_PROVIDER",
  useFactory: () => {
    const clientId = process.env.CLIENT_ID;
    const botToken = process.env.BOT_OAUTH_TOKEN;
    return new StaticAuthProvider(clientId, botToken);
  },
};

const refreshingAuthProviderFactory = {
  provide: "REFRESH_AUTH_PROVIDER",
  useFactory: async (configurationService: ConfigurationsService) => {
    const actuelAccessToken: AccessToken = await configurationService.getTokenFromConfiguration();
    return new RefreshingAuthProvider(
      {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        onRefresh: async (accessToken: AccessToken) => await configurationService.updateToken(accessToken),
      },
      actuelAccessToken
    );
  },
  inject: [ConfigurationsService],
};

@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [AuthService, staticAuthProviderFactory, refreshingAuthProviderFactory],
  exports: [AuthService, "STATIC_AUTH_PROVIDER", "REFRESH_AUTH_PROVIDER"],
})
export class AuthModule {}
