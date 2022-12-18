import { Controller, Get, Request, Res, UseGuards } from "@nestjs/common";
import { TwitchAuthGuard } from "./twitch-auth.guard";
import { AuthService } from "./auth.service";
import { User } from "../users/schema/user.schema";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(TwitchAuthGuard)
  @Get("/login")
  login(@Request() req) {
    // console.error(process.env.HTTP_PROXY);
    // console.info("ENV HTTPS_PROXY", process.env.HTTPS_PROXY);
    console.debug("/login", req.user);
    return req.user;
  }

  @UseGuards(TwitchAuthGuard)
  @Get("/redirect")
  async redirect(@Request() req) {
    // console.info("redirect", req.user);
    console.debug("login redirect ", req.user.profile.login);

    const { id, login, display_name } = req.user.profile;

    const user = await this.authService.createOrFindUser(id, login, display_name);
    return "Connexion réussi !";
  }

  // TODO Gérer le fail de redirect (https://www.passportjs.org/packages/passport-twitch/)
}
