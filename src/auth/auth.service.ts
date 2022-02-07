import { Injectable } from "@nestjs/common";
import { StaticAuthProvider } from "@twurple/auth";

@Injectable()
export class AuthService {
  private readonly authProvider;

  constructor() {
    const clientId = process.env.CLIENT_ID;
    const botToken = process.env.BOT_OAUTH_TOKEN;
    this.authProvider = new StaticAuthProvider(clientId, botToken);
  }

  getStaticAuthProvider() {
    return this.authProvider;
  }
}
