import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthenticateOptions, Strategy, TwitchProfile } from "passport-twitch-latest";
import { AuthService } from "./auth.service";

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, "twitch") {
  constructor() {
    console.debug("ALLO");
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // callbackURL: encodeURI("http://localhost:5000/auth/redirect"),
      callbackURL: encodeURI("https://gluto-back-staging.herokuapp.com/auth/redirect"),
      scope: ["user:read:email"],
      passReqToCallback: true,
      proxy: true,
    });
  }

  authenticate(req: any, options?: AuthenticateOptions) {
    console.debug("authenticate" + req);
    super.authenticate(req, options);
  }

  userProfile(accessToken: string, done: (err?: Error | null, profile?: TwitchProfile) => void) {
    console.debug("userProfile" + accessToken);
    super.userProfile(accessToken, done);
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
    profile: any,
    done: (err, user) => void
  ) {
    console.debug("origin", originalRequest);
    console.debug("origin", accessToken);
    console.debug("origin", refreshToken);
    console.debug("origin", profile);

    try {
      const user = { accessToken };
      console.debug("USER", profile);
      console.debug("SUER USER", user);
      done(null, user);
    } catch (err) {
      console.error("err validate", err);
      done(err, false);
    }

    // return {
    //   originalRequest,
    //   accessToken,
    //   refreshToken,
    //   profile,
    // };
  }
}
