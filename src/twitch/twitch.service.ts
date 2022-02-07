import { Injectable } from "@nestjs/common";
import axios from "axios";
import { DateTime } from "luxon";
import { StreamDto } from "./dto/stream.dto";

@Injectable()
export class TwitchService {
  private readonly OFFSET = 60; // 1 heure pour UTC+1
  private readonly HEADERS = {
    "Client-Id": process.env.CLIENT_ID,
    Authorization: `Bearer ${process.env.TWITCH_API_TOKEN}`,
  };
  private readonly WEEK_FR = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  private gamePictureCache: object = {};
  private readonly TWITCH_BASE_URL = "https://api.twitch.tv/helix";

  getWeekSchedule(id: number): any {
    const nbElement = 7;
    const monday = DateTime.now().startOf("week");

    const nextMonday = monday.plus({ days: 7 });
    let nextDay = monday;
    // Setup le tableau de la semaine avec les dates de chaque jour
    const weekSchedule = this.WEEK_FR.map(day => {
      const dayObject = {
        jour: day,
        date: nextDay.toUTC(60),
        estPassee: nextDay < DateTime.now().startOf("day"),
      };
      nextDay = nextDay.plus({ days: 1 });
      return dayObject;
    });

    const url = `${this.TWITCH_BASE_URL}/schedule?broadcaster_id=${id}&utc_offset=${
      this.OFFSET
    }&first=${nbElement}&start_time=${monday.toUTC()}`;

    return axios.get(url, { headers: this.HEADERS }).then(response => {
      const segments = response.data.data.segments || [];
      const gameIds = [...new Set<string>(segments.map(stream => stream.category.id))];

      // Récupére les images des jeux des streams
      return Promise.all(gameIds.map(id => this.getGamePicture(id)))
        .then(() => {
          return this.mapAndFilterSchedule(segments, nextMonday);
        })
        .then(twitchScedule => {
          return weekSchedule.map(dailySchedule => {
            const streams = twitchScedule.filter(schedule =>
              dailySchedule.date.hasSame(DateTime.fromISO(schedule.debut), "day")
            );
            return {
              ...dailySchedule,
              streams,
            };
          });
        });
    });
  }

  private mapAndFilterSchedule(segments, nextMonday: DateTime) {
    return (
      segments
        .flatMap(segment => this.mapSchedule(segment))
        // Filtre pour garder uniquement les streams de la semaine en cours
        .filter(seg => DateTime.fromISO(seg.debut) < nextMonday)
        // Filtre si jamais un stream est annulé en cours de semaine
        .filter(seg => !seg.estAnnule)
    );
  }

  private getGamePicture(gameId: string) {
    if (this.gamePictureCache[gameId]) {
      return Promise.resolve(this.gamePictureCache[gameId]);
    }

    const url = `${this.TWITCH_BASE_URL}/games?id=${gameId}`;
    return axios.get(url, { headers: this.HEADERS }).then(res => {
      let boxArtUrl = res.data?.data[0]?.box_art_url || "";
      this.gamePictureCache[gameId] = boxArtUrl;
      return boxArtUrl;
    });
  }

  private mapSchedule(stream): StreamDto {
    return {
      debut: stream?.start_time,
      fin: stream?.end_time,
      jeu: stream?.category.name,
      titre: stream?.title,
      estAnnule: stream?.canceled_until !== null,
      imageJeuUrl: this.gamePictureCache[stream?.category?.id],
    };
  }

  getStreamPresent(id: number) {
    const url = `${this.TWITCH_BASE_URL}/streams?user_id=${id}`;
    return axios.get(url, { headers: this.HEADERS }).then(response => {
      return {
        isLive: response.data?.data?.length > 0,
      };
    });
  }
}
