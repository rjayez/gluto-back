import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-twitch-latest";
import { AuthService } from "./auth.service";

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.debug("ALLO");
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: encodeURI("https://gluto-back-staging.herokuapp.com/auth/redirect"),
      // callbackURL: "/auth/redirect",
      scope: "user:read:email",
      passReqToCallback: false,
    });
  }

  /**
   *
   * @param originalRequest
   * @param accessToken
   * @param refreshToken
   * @param profile
   */
  async validate(originalRequest: any, accessToken: string, refreshToken: string, profile: any) {
    console.debug("origin", originalRequest);
    console.debug("origin", accessToken);
    console.debug("origin", refreshToken);
    console.debug("origin", profile);
    return {
      originalRequest,
      accessToken,
      refreshToken,
      profile,
    };
  }
}
