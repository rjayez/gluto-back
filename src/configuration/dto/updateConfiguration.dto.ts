import { ObjectId } from "mongoose";

export interface UpdateConfigurationDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  obtainmentTimestamp: number;
}
