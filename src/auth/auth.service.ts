import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  createOrFindUser(twitchId: number, username: string, displayName: string) {
    return this.usersService.findOrCreate(twitchId, username, displayName);
  }
}
