import { Injectable } from "@nestjs/common";
import { ClientCredentialsAuthProvider, StaticAuthProvider } from "@twurple/auth";

@Injectable()
export class AuthService {
  private readonly authProvider;
  private readonly clientAuthProvider;

  constructor() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const botToken = process.env.BOT_OAUTH_TOKEN;
    this.authProvider = new StaticAuthProvider(clientId, botToken);
    this.clientAuthProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
  }

  getStaticAuthProvider() {
    return this.authProvider;
  }

  getClientCredentialsAuthProvider() {
    return this.clientAuthProvider;
  }
}
