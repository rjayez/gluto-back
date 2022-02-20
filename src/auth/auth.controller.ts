import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { TwitchAuthGuard } from "./twitch-auth.guard";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(TwitchAuthGuard)
  @Get("/login")
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(TwitchAuthGuard)
  @Get("/redirect")
  redirect(@Request() req) {
    console.debug("redirect", req.user.profile);
    const { id, login } = req.user.profile;

    return this.authService.createOrFindUser(id, login);
  }
}
