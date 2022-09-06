import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Configurations, ConfigurationsDocument } from "./schema/configuration.schema";
import { UpdateResult } from "mongodb";
import { Model } from "mongoose";
import { UpdateConfigurationDto } from "./dto/updateConfiguration.dto";
import { AccessToken } from "@twurple/auth";

@Injectable()
export class ConfigurationsService {
  get eventSubEnabled(): boolean {
    return this._eventSubEnabled;
  }

  set eventSubEnabled(value: boolean) {
    this._eventSubEnabled = value;
  }
  get botCommandEnabled(): boolean {
    return this._botCommandEnabled;
  }

  set botCommandEnabled(value: boolean) {
    this._botCommandEnabled = value;
  }
  private readonly CONFIGURATION_NAME = "PRINCIPALE";
  // Boolean d'activation pour tous les messages d'evennement du tchat twitch
  private _eventSubEnabled = true;
  private _botCommandEnabled = true;

  constructor(@InjectModel(Configurations.name) private configurationModel: Model<ConfigurationsDocument>) {}

  async getConfiguration(): Promise<Configurations> {
    return this.configurationModel.findOne({ name: this.CONFIGURATION_NAME }).exec();
  }

  async getTokenFromConfiguration(): Promise<AccessToken> {
    return await this.getConfiguration().then(config => this.buildAccessToken(config));
  }

  updateToken(accessToken: AccessToken): Promise<UpdateResult> {
    const updateConfigurationDto = this.buildUpdateConfigurationDto(accessToken);
    // @ts-ignore
    return this.configurationModel.updateOne({ name: this.CONFIGURATION_NAME }, updateConfigurationDto).exec();
  }

  buildUpdateConfigurationDto(accessToken: AccessToken): UpdateConfigurationDto {
    return {
      accessToken: accessToken.accessToken,
      refreshToken: accessToken.refreshToken,
      expiresIn: accessToken.expiresIn,
      obtainmentTimestamp: accessToken.obtainmentTimestamp,
    };
  }

  buildAccessToken(configuration: Configurations): AccessToken {
    return {
      accessToken: configuration.accessToken,
      refreshToken: configuration.refreshToken,
      scope: ["chat:read", "chat:edit", "whispers:read", "whispers:edit", "channel:moderate"],
      expiresIn: configuration.expiresIn,
      obtainmentTimestamp: configuration.obtainmentTimestamp,
    };
  }
}
