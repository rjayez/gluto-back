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
      callbackURL: "https://gluto-back-staging.herokuapp.com/auth/redirect",
      // callbackURL: encodeURI("http://localhost:5000/auth/redirect"),
      scope: "",
      passReqToCallback: true,
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
