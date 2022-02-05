import { Injectable } from "@nestjs/common";
import { config } from "dotenv";
import { StaticAuthProvider } from "@twurple/auth";

@Injectable()
export class AuthService {
  private readonly authProvider;

  constructor() {
    const dotenvConfigOutput = config();
    const clientId = dotenvConfigOutput.parsed["CLIENT_ID"];
    const botToken = dotenvConfigOutput.parsed["BOT_OAUTH_TOKEN"];
    this.authProvider = new StaticAuthProvider(clientId, botToken);
  }

  getStaticAuthProvider() {
    return this.authProvider;
  }
}
