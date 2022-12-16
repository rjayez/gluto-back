import { Controller, Get, Request, Res, UseGuards } from "@nestjs/common";
import { TwitchAuthGuard } from "./twitch-auth.guard";
import { AuthService } from "./auth.service";

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
  redirect(@Request() req, @Res() response) {
    console.info("redirect", req.user);
    console.info("response", response);
    // const { id, login } = req.user;

    // return this.authService.createOrFindUser(id, login);
  }

  // TODO Gérer le fail de redirect (https://www.passportjs.org/packages/passport-twitch/)
}
