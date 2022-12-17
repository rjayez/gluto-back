import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, TwitchProfile } from "passport-twitch-latest";

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, "twitch") {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // callbackURL: encodeURI("http://localhost:5000/auth/redirect"),
      callbackURL: encodeURI("https://gluto-back-staging.herokuapp.com/auth/redirect"),
      scope: [],
      passReqToCallback: true,
      proxy: true,
    });
  }

  /**
   *
   * @param originalRequest
   * @param accessToken
   * @param refreshToken
   * @param profile
   * @param done
   */
  async validate(
    originalRequest: any,
    accessToken: string,
    refreshToken: string,
    profile: TwitchProfile,
    done: (err, user) => void
  ) {
    console.debug("origin profile", profile.login);

    try {
      const user = { accessToken, refreshToken, profile };
      // console.debug("USER", profile);
      // console.debug("SUER USER", user);
      done(null, user);
    } catch (err) {
      console.error("err validate", err);
      done(err, false);
    }
  }
}
